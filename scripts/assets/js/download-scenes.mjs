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
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Referer': 'https://www.pokepedia.fr/'
};

// Nettoyage des chaînes pour la recherche MediaWiki
function cleanSearchTerm(str) {
  return str.replace(/-/g, ' ').replace(/[’']/g, ' ').trim();
}

// Recherche dans l'espace de noms Fichier (Namespace 6)
async function searchPokepediaFile(card) {
  const cleanNom = cleanSearchTerm(card.nom);
  const firstWord = cleanNom.split(' ')[0];
  const rawNum = String(card.num).replace(/^#/, '').trim();
  const unpaddedNum = rawNum.replace(/^0+/, '');
  const paddedNum = rawNum.padStart(3, '0');

  // Variantes de requêtes ordonnées par précision
  const queries = [
    `"Carte" "${cleanNom}" ${rawNum}`,
    `"Carte" "${firstWord}" ${rawNum}`,
    `"${cleanNom}" ${rawNum}`,
    `"${firstWord}" ${rawNum}`
  ];

  if (unpaddedNum !== rawNum) {
    queries.push(`"${firstWord}" ${unpaddedNum}`);
    queries.push(`"Carte" "${firstWord}" ${unpaddedNum}`);
  }
  if (paddedNum !== rawNum) {
    queries.push(`"${firstWord}" ${paddedNum}`);
    queries.push(`"Carte" "${firstWord}" ${paddedNum}`);
  }

  // Dernier recours : recherche sur le numéro strict
  queries.push(`"Carte" ${rawNum}`);

  const uniqueQueries = [...new Set(queries)];

  for (const q of uniqueQueries) {
    const url = `https://www.pokepedia.fr/api.php?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(q)}&srlimit=8&format=json`;
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) continue;
      const data = await res.json();
      const hits = data?.query?.search || [];

      if (hits.length > 0) {
        // Sélectionne en priorité un fichier commençant par "Carte"
        const cardHit = hits.find(h => h.title.toLowerCase().includes('carte')) || hits[0];
        return cardHit.title;
      }
    } catch {
      // Poursuite vers la requête suivante
    }
    await sleep(60);
  }

  return null;
}

// Récupération de l'URL directe du fichier
async function getFileDirectUrl(fileTitle) {
  const url = `https://www.pokepedia.fr/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages || {};
    const firstPage = Object.values(pages)[0];
    return firstPage?.imageinfo?.[0]?.url || null;
  } catch {
    return null;
  }
}

async function downloadBinary(url, destPath) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ab = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(ab));
}

async function processCard(card) {
  const destPath = path.join(DEST_DIR, card.file);

  if (fs.existsSync(destPath)) {
    console.log(`[SKIP] Déjà présent : ${card.file} (${card.nom} #${card.num})`);
    return;
  }

  const fileTitle = await searchPokepediaFile(card);

  if (!fileTitle) {
    console.error(`[ERR] Introuvable : ${card.nom} #${card.num} (${card.file})`);
    return;
  }

  const directUrl = await getFileDirectUrl(fileTitle);

  if (!directUrl) {
    console.error(`[ERR] URL introuvable pour : ${fileTitle}`);
    return;
  }

  try {
    await downloadBinary(directUrl, destPath);
    console.log(`[OK] ${card.file} <- ${fileTitle}`);
  } catch (err) {
    console.error(`[ERR] Téléchargement échoué (${card.file}) : ${err.message}`);
  }

  await sleep(150);
}

async function run() {
  console.log('=== DÉMARRAGE DU TÉLÉCHARGEMENT OPTIMISÉ POKÉPÉDIA ===\n');

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

  console.log(`Total de cartes à traiter : ${allCards.length}\n`);

  for (const card of allCards) {
    await processCard(card);
  }

  console.log('\n=== TÉLÉCHARGEMENT TERMINÉ DANS assets/cards/chroniques/ ===');
}

run();
