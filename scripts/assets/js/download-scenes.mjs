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
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
};

function getCandidateUrls(card) {
  const set = card.set;
  const num = String(card.num).trim();
  const unpadded = num.replace(/^0+/, '');
  const padded3 = num.padStart(3, '0');

  const urls = [];

  // 1. TCGdex officiel (FR)
  urls.push(`https://assets.tcgdex.net/fr/${set}/${num}/high.webp`);
  if (unpadded !== num) urls.push(`https://assets.tcgdex.net/fr/${set}/${unpadded}/high.webp`);
  if (padded3 !== num) urls.push(`https://assets.tcgdex.net/fr/${set}/${padded3}/high.webp`);

  // 2. pokemontcg.io (CDN HD officiel mondial)
  urls.push(`https://images.pokemontcg.io/${set}/${num}_hires.png`);
  if (unpadded !== num) urls.push(`https://images.pokemontcg.io/${set}/${unpadded}_hires.png`);
  if (padded3 !== num) urls.push(`https://images.pokemontcg.io/${set}/${padded3}_hires.png`);

  // 3. Cas spécifiques : formats d'extensions alternatifs (ex: sv1 <-> sv01)
  if (set.startsWith('sv') && !set.includes('pt') && set.length === 3) {
    const paddedSet = set.replace(/sv(\d)/, 'sv0$1');
    urls.push(`https://assets.tcgdex.net/fr/${paddedSet}/${num}/high.webp`);
    urls.push(`https://images.pokemontcg.io/${paddedSet}/${num}_hires.png`);
  }
  if (set.startsWith('swsh') && !set.includes('pt') && set.length === 5) {
    const paddedSet = set.replace(/swsh(\d)/, 'swsh0$1');
    urls.push(`https://assets.tcgdex.net/fr/${paddedSet}/${num}/high.webp`);
    urls.push(`https://images.pokemontcg.io/${paddedSet}/${num}_hires.png`);
  }

  // 4. TCGdex alternatif sans sous-série (ex: swsh12pt5gg -> swsh12pt5)
  if (set.endsWith('gg')) {
    const parentSet = set.replace('gg', '');
    urls.push(`https://assets.tcgdex.net/fr/${parentSet}/${num}/high.webp`);
    urls.push(`https://images.pokemontcg.io/${parentSet}/${num}_hires.png`);
  }

  return [...new Set(urls)];
}

async function tryDownloadUrl(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html')) return null; // Rejet des fausses réponses 404 HTML
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 5000) return null; // Rejet des fichiers incomplets
    return buffer;
  } catch {
    return null;
  }
}

async function processCard(card) {
  const destPath = path.join(DEST_DIR, card.file);

  // Si le fichier existe déjà et fait une taille normale (> 10 Ko), on passe
  if (fs.existsSync(destPath)) {
    const stat = fs.statSync(destPath);
    if (stat.size > 10000) {
      console.log(`[SKIP] Déjà présent et valide : ${card.file} (${card.nom})`);
      return;
    }
  }

  const urls = getCandidateUrls(card);
  let downloadedBuffer = null;
  let sourceUrl = '';

  for (const url of urls) {
    downloadedBuffer = await tryDownloadUrl(url);
    if (downloadedBuffer) {
      sourceUrl = url;
      break;
    }
    await sleep(40);
  }

  if (downloadedBuffer) {
    fs.writeFileSync(destPath, downloadedBuffer);
    console.log(`[OK] ${card.file} téléchargé via : ${sourceUrl}`);
  } else {
    console.error(`[ERR] Échec complet pour : ${card.nom} (${card.set} #${card.num})`);
  }

  await sleep(100);
}

async function run() {
  console.log('=== DÉMARRAGE DU TÉLÉCHARGEMENT DIRECT VIA API CDN ===\n');

  const allCards = [];
  const registered = new Set();

  [...odysseeDatabase, ...chroniquesDatabase].forEach((scene) => {
    scene.cartes.forEach((c) => {
      if (!registered.has(c.file)) {
        registered.add(c.file);
        allCards.push(c);
      }
    });
  });

  console.log(`Vérification de ${allCards.length} cartes...\n`);

  for (const card of allCards) {
    await processCard(card);
  }

  console.log('\n=== TÉLÉCHARGEMENT TERMINÉ DANS assets/cards/chroniques/ ===');
}

run();
