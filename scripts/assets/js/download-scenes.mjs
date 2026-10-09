import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Importation compatible CommonJS depuis tableaux-data.js
const { odysseeDatabase, chroniquesDatabase } = require('./tableaux-data.js');

// Destination locale : assets/cards/chroniques à la racine du projet
const ROOT_DIR = path.resolve(__dirname, '../../../');
const DEST_DIR = path.join(ROOT_DIR, 'assets', 'cards', 'chroniques');

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
  console.log(`[INIT] Dossier créé : ${DEST_DIR}`);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchImageBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

function getRemoteUrl(card) {
  return `https://assets.tcgdex.net/fr/${card.set}/${card.num}/high.webp`;
}

function getFallbackUrl(card) {
  return `https://images.pokemontcg.io/${card.set}/${card.num}_hires.png`;
}

async function downloadCard(card) {
  const localFilePath = path.join(DEST_DIR, card.file);

  if (fs.existsSync(localFilePath)) {
    console.log(`[SKIP] Déjà présent : ${card.file} (${card.nom})`);
    return;
  }

  const primaryUrl = getRemoteUrl(card);
  try {
    const buffer = await fetchImageBuffer(primaryUrl);
    fs.writeFileSync(localFilePath, buffer);
    console.log(`[OK] Téléchargé (TCGdex) : ${card.file} (${card.nom})`);
  } catch {
    const fallbackUrl = getFallbackUrl(card);
    try {
      const buffer = await fetchImageBuffer(fallbackUrl);
      fs.writeFileSync(localFilePath, buffer);
      console.log(`[OK] Téléchargé (Fallback) : ${card.file} (${card.nom})`);
    } catch (err2) {
      console.error(`[ERR] Échec pour ${card.file} (${card.nom}) : ${err2.message}`);
    }
  }

  await sleep(150);
}

async function run() {
  console.log('=== DÉMARRAGE DU TÉLÉCHARGEMENT (CHRONIQUES & ODYSSÉE) ===');

  const allCards = [];
  const registeredFiles = new Set();

  [...odysseeDatabase, ...chroniquesDatabase].forEach((scene) => {
    scene.cartes.forEach((c) => {
      if (!registeredFiles.has(c.file)) {
        registeredFiles.add(c.file);
        allCards.push(c);
      }
    });
  });

  console.log(`Total d'images uniques à vérifier : ${allCards.length}`);

  for (const card of allCards) {
    await downloadCard(card);
  }

  console.log('=== TÉLÉCHARGEMENT TERMINÉ DANS assets/cards/chroniques/ ===');
}

run();
