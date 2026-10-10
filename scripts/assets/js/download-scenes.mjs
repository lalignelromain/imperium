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

// 1. GRAND NETTOYAGE : Suppression de l'ancien dossier pour repartir à zéro
if (fs.existsSync(DEST_DIR)) {
  console.log('🧹 Nettoyage du dossier : suppression des anciennes images...');
  fs.rmSync(DEST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DEST_DIR, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Referer': 'https://www.pokepedia.fr/'
};

// Recherche du scan parfait sur Poképédia via API MediaWiki
async function findPokepediaUrl(card) {
  const cleanNom = card.nom.replace(/[^a-zA-Z0-9àâäéèêëîïôöùûüç\s-]/gi, '').split(' ')[0];
  const prefix = `Carte ${cleanNom}`;
  const url = `https://www.pokepedia.fr/api.php?action=query&list=allimages&aiprefix=${encodeURIComponent(prefix)}&ailimit=100&aiprop=url&format=json`;

  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    const images = data?.query?.allimages || [];
    
    // Nettoyage du numéro pour le matching (ex: "GG26", "160", "RC5")
    const rawNum = String(card.num).replace(/^#/, '').toLowerCase().trim();
    const unpaddedNum = rawNum.replace(/^0+/, '');
    
    const hit = images.find((img) => {
      const imgName = img.name.toLowerCase();
      // Poképédia nomme souvent ses fichiers "(Extension 123).png" ou "Nom 123.png"
      return imgName.includes(` ${rawNum})`) || 
             imgName.includes(` ${unpaddedNum})`) ||
             imgName.includes(`_${rawNum}.`) ||
             imgName.includes(` ${rawNum}.`);
    });
    
    return hit ? hit.url : null;
  } catch {
    return null;
  }
}

// Fallback sur les API officielles (TCGdex / PokemonTCG)
function getFallbackUrls(card) {
  const set = card.set;
  const num = String(card.num).trim();
  const unpadded = num.replace(/^0+/, '');
  const padded3 = num.padStart(3, '0');

  const urls = [];

  // Corrections manuelles pour les cas complexes (Radiant Collection)
  if (card.file === 'gruikui-rc5.png') urls.push('https://images.pokemontcg.io/rc/5_hires.png');
  if (card.file === 'grotichon-rc6.png') urls.push('https://images.pokemontcg.io/rc/6_hires.png');
  if (card.file === 'roitiflam-rc7.png') urls.push('https://images.pokemontcg.io/rc/7_hires.png');
  if (card.file === 'brocelome-xy9-55.png') urls.push('https://assets.tcgdex.net/fr/xy/xy9/55/high.webp');
  if (card.file === 'grelacon-swsh6-042.png') urls.push('https://assets.tcgdex.net/fr/swsh/swsh6/042/high.webp');

  // Génération automatique des URLs cibles
  urls.push(`https://assets.tcgdex.net/fr/${set}/${num}/high.webp`);
  if (unpadded !== num) urls.push(`https://assets.tcgdex.net/fr/${set}/${unpadded}/high.webp`);
  if (padded3 !== num) urls.push(`https://assets.tcgdex.net/fr/${set}/${padded3}/high.webp`);

  urls.push(`https://images.pokemontcg.io/${set}/${num}_hires.png`);
  if (unpadded !== num) urls.push(`https://images.pokemontcg.io/${set}/${unpadded}_hires.png`);
  if (padded3 !== num) urls.push(`https://images.pokemontcg.io/${set}/${padded3}_hires.png`);

  if (set.endsWith('gg')) {
    const parentSet = set.replace('gg', '');
    urls.push(`https://assets.tcgdex.net/fr/${parentSet}/${num}/high.webp`);
    urls.push(`https://images.pokemontcg.io/${parentSet}/${num}_hires.png`);
  }

  return [...new Set(urls)];
}

// Fonction de téléchargement binaire avec vérification d'intégrité
async function tryDownloadUrl(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html')) return null; // Ignore les fausses pages 404
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 5000) return null; // Ignore les fichiers corrompus (< 5Ko)
    return buffer;
  } catch {
    return null;
  }
}

async function processCard(card) {
  const destPath = path.join(DEST_DIR, card.file);
  let downloadedBuffer = null;
  let sourceName = '';

  // TENTATIVE 1 : Poképédia
  const pokeUrl = await findPokepediaUrl(card);
  if (pokeUrl) {
    downloadedBuffer = await tryDownloadUrl(pokeUrl);
    if (downloadedBuffer) sourceName = 'Poképédia';
  }

  // TENTATIVE 2 : API de secours
  if (!downloadedBuffer) {
    const fallbackUrls = getFallbackUrls(card);
    for (const url of fallbackUrls) {
      downloadedBuffer = await tryDownloadUrl(url);
      if (downloadedBuffer) {
        sourceName = url.includes('tcgdex') ? 'TCGdex' : 'PokemonTCG.io';
        break;
      }
      await sleep(50);
    }
  }

  // ÉCRITURE
  if (downloadedBuffer) {
    fs.writeFileSync(destPath, downloadedBuffer);
    // Affichage coloré dans la console pour repérer les sources
    const prefix = sourceName === 'Poképédia' ? '🟢' : '🟡';
    console.log(`${prefix} [OK] ${card.file} téléchargé via ${sourceName}`);
  } else {
    console.error(`🔴 [ERR] Échec complet pour : ${card.nom} (${card.set} #${card.num})`);
  }

  await sleep(150);
}

async function run() {
  console.log('=== DÉMARRAGE DU TÉLÉCHARGEMENT HYBRIDE ===\n');

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

  console.log(`Traitement de ${allCards.length} cartes uniques...\n`);

  for (const card of allCards) {
    await processCard(card);
  }

  console.log('\n=== TERMINÉ : Dossier assets/cards/chroniques/ mis à jour ! ===');
}

run();
