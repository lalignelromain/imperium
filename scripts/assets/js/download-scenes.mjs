import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const { odysseeDatabase, chroniquesDatabase } = require('./tableaux-data.js');

const ROOT_DIR = path.resolve(__dirname, '../../../');
const DEST_DIR = path.join(ROOT_DIR, 'assets', 'cards', 'chroniques');

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HEADERS = {
  'User-Agent': 'MewthologyCollector/1.0 (Mozilla/5.0 Windows NT 10.0; Win64; x64)'
};

async function searchPokepediaFile(query) {
  const url = `https://www.pokepedia.fr/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  const hits = data?.query?.search;
  if (!hits || hits.length === 0) return null;

  const valid = hits.find(h => /\.(png|jpe?g|webp)$/i.test(h.title));
  return valid ? valid.title : hits[0].title;
}

async function getPokepediaImageUrl(fileTitle) {
  const url = `https://www.pokepedia.fr/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;
  const firstId = Object.keys(pages)[0];
  return pages[firstId]?.imageinfo?.[0]?.url || null;
}

async function downloadBinary(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function resolveAndDownloadCard(card) {
  const localFilePath = path.join(DEST_DIR, card.file);

  const queries = [
    `Carte ${card.nom} ${card.extension} ${card.num}`,
    `Carte ${card.nom} ${card.extension}`,
    `Carte ${card.nom} ${card.num}`,
    `Carte ${card.nom}`,
    `${card.nom} ${card.num}`
  ];

  let fileTitle = null;
  for (const q of queries) {
    fileTitle = await searchPokepediaFile(q);
    if (fileTitle) break;
    await sleep(80);
  }

  if (!fileTitle) {
    console.error(`[ERR] Introuvable sur Poképédia : ${card.nom} (${card.extension} #${card.num})`);
    return;
  }

  const directUrl = await getPokepediaImageUrl(fileTitle);
  if (!directUrl) {
    console.error(`[ERR] URL introuvable pour le fichier : ${fileTitle}`);
    return;
  }

  try {
    const buffer = await downloadBinary(directUrl);
    fs.writeFileSync(localFilePath, buffer);
    console.log(`[OK] Poképédia -> ${card.file} (${card.nom})`);
  } catch (err) {
    console.error(`[ERR] Téléchargement échoué pour ${card.file} : ${err.message}`);
  }

  await sleep(250);
}

async function run() {
  console.log('=== DÉMARRAGE DU TÉLÉCHARGEMENT INTÉGRAL DEPUIS POKÉPÉDIA ===');

  const allCards = [];
  const registered = new Set();

  [...odysseeDatabase, ...chroniquesDatabase].forEach(scene => {
    scene.cartes.forEach(c => {
      if (!registered.has(c.file)) {
        registered.add(c.file);
        allCards.push(c);
      }
    });
  });

  console.log(`Total de cartes à rapatrier : ${allCards.length}\n`);

  for (const card of allCards) {
    await resolveAndDownloadCard(card);
  }

  console.log('\n=== IMPORT POKÉPÉDIA TERMINÉ AVEC SUCCÈS DANS assets/cards/chroniques/ ===');
}

run();
