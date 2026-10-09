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

// Vérifie la présence du numéro sans faux positifs
function filenameMatchesNumber(filename, rawNum) {
  const cleanNum = String(rawNum).trim();
  const variations = [cleanNum];

  const unpadded = cleanNum.replace(/^0+/, '');
  if (unpadded && unpadded !== cleanNum) variations.push(unpadded);

  const padded3 = cleanNum.padStart(3, '0');
  if (padded3 !== cleanNum) variations.push(padded3);

  return variations.some(v => {
    const escaped = v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
    return regex.test(filename);
  });
}

// 1. Recherche par catalogue préfixé (allimages)
async function findImageViaAllImages(baseName, rawNum) {
  const prefix = `Carte ${baseName}`;
  const url = `https://www.pokepedia.fr/api.php?action=query&list=allimages&aiprefix=${encodeURIComponent(prefix)}&ailimit=100&aiprop=url&format=json`;

  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    const images = data?.query?.allimages || [];

    const hit = images.find(img => filenameMatchesNumber(img.name, rawNum));
    return hit ? hit.url : null;
  } catch {
    return null;
  }
}

// 2. Recherche de secours : article encyclopédique de la carte
async function findImageViaArticle(nom, rawNum) {
  const searchUrl = `https://www.pokepedia.fr/api.php?action=query&list=search&srsearch=${encodeURIComponent(nom + ' ' + rawNum)}&srlimit=3&format=json`;
  try {
    const res = await fetch(searchUrl, { headers: HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    const hits = data?.query?.search || [];
    if (hits.length === 0) return null;

    const pageTitle = hits[0].title;
    const imgUrl = `https://www.pokepedia.fr/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=images&format=json`;
    const resImg = await fetch(imgUrl, { headers: HEADERS });
    if (!resImg.ok) return null;
    const dataImg = await resImg.json();
    const pages = dataImg?.query?.pages || {};
    const firstPage = Object.values(pages)[0];
    const imageList = firstPage?.images || [];

    const matchedFile = imageList.find(img => img.title.startsWith('Fichier:Carte') && filenameMatchesNumber(img.title, rawNum));
    if (!matchedFile) return null;

    const infoUrl = `https://www.pokepedia.fr/api.php?action=query&titles=${encodeURIComponent(matchedFile.title)}&prop=imageinfo&iiprop=url&format=json`;
    const resInfo = await fetch(infoUrl, { headers: HEADERS });
    if (!resInfo.ok) return null;
    const dataInfo = await resInfo.json();
    const infoPages = dataInfo?.query?.pages || {};
    const filePage = Object.values(infoPages)[0];
    return filePage?.imageinfo?.[0]?.url || null;
  } catch {
    return null;
  }
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function processCard(card) {
  const destPath = path.join(DEST_DIR, card.file);

  if (fs.existsSync(destPath)) {
    console.log(`[SKIP] Déjà présent : ${card.file} (${card.nom} #${card.num})`);
    return;
  }

  // Premier mot pour capturer le préfixe propre (ex: "Palkia" pour "Palkia Originel")
  const baseName = card.nom.split(/[\s-]/)[0];

  let directUrl = await findImageViaAllImages(baseName, card.num);

  if (!directUrl && card.nom !== baseName) {
    directUrl = await findImageViaAllImages(card.nom, card.num);
  }

  if (!directUrl) {
    directUrl = await findImageViaArticle(card.nom, card.num);
  }

  if (!directUrl) {
    console.error(`[ERR] Scan introuvable sur Poképédia : ${card.nom} #${card.num} (${card.file})`);
    return;
  }

  try {
    await downloadFile(directUrl, destPath);
    console.log(`[OK] Poképédia -> ${card.file} (${card.nom} #${card.num})`);
  } catch (err) {
    console.error(`[ERR] Téléchargement binaire échoué (${card.file}) : ${err.message}`);
  }

  await sleep(180);
}

async function run() {
  console.log('=== DÉMARRAGE DU TÉLÉCHARGEMENT DIRECT POKÉPÉDIA ===\n');

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

  console.log(`Cartes uniques à récupérer : ${allCards.length}\n`);

  for (const card of allCards) {
    await processCard(card);
  }

  console.log('\n=== TÉLÉCHARGEMENT COMPLET TERMINÉ DANS assets/cards/chroniques/ ===');
}

run();
