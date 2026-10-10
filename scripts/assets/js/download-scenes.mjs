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

// URL directes certifiées pour les cartes récalcitrantes et les faux positifs
const DIRECT_SOURCES = {
  // Fresque 9 cartes Zénith Suprême
  'zenith-riolu.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG26/high.webp',
  'zenith-tylton.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG27/high.webp',
  'zenith-wattouat.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG34/high.webp',
  'zenith-pikachu.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5/160/high.webp',
  'zenith-tortipouss.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG31/high.webp',
  'zenith-paras.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG32/high.webp',
  'zenith-medhyena.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG33/high.webp',
  'zenith-keunotor.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG29/high.webp',
  'zenith-diancie.png': 'https://assets.tcgdex.net/fr/swsh/swsh12pt5gg/GG13/high.webp',

  // Cheniti & Raretés
  'cheniti-plante-45.png': 'https://images.pokemontcg.io/dp3/45_hires.png',
  'cheniti-sable-46.png': 'https://images.pokemontcg.io/dp3/46_hires.png',
  'cheniti-dechet-47.png': 'https://images.pokemontcg.io/dp3/47_hires.png',
  'mangriff-ex2-84.png': 'https://images.pokemontcg.io/ex2/84_hires.png',
  'seviper-ex2-73.png': 'https://images.pokemontcg.io/ex2/73_hires.png',
  'seleroc-ex14-37.png': 'https://images.pokemontcg.io/ex14/37_hires.png',
  'solaroc-ex14-41.png': 'https://images.pokemontcg.io/ex14/41_hires.png',
  'kyogre-dc1-14.png': 'https://images.pokemontcg.io/dc1/14_hires.png',
  'groudon-dc1-15.png': 'https://images.pokemontcg.io/dc1/15_hires.png',

  // Cartes LÉGENDE HGSS
  'hooh-legend-haut.png': 'https://images.pokemontcg.io/hgss1/111_hires.png',
  'hooh-legend-bas.png': 'https://images.pokemontcg.io/hgss1/112_hires.png',
  'lugia-legend-haut.png': 'https://images.pokemontcg.io/hgss1/113_hires.png',
  'lugia-legend-bas.png': 'https://images.pokemontcg.io/hgss1/114_hires.png',
  'entei-raikou-haut.png': 'https://images.pokemontcg.io/hgss2/90_hires.png',
  'entei-raikou-bas.png': 'https://images.pokemontcg.io/hgss2/91_hires.png',
  'raikou-suicune-haut.png': 'https://images.pokemontcg.io/hgss2/92_hires.png',
  'raikou-suicune-bas.png': 'https://images.pokemontcg.io/hgss2/93_hires.png',
  'suicune-entei-haut.png': 'https://images.pokemontcg.io/hgss2/94_hires.png',
  'suicune-entei-bas.png': 'https://images.pokemontcg.io/hgss2/95_hires.png',
  'kyogre-groudon-haut.png': 'https://images.pokemontcg.io/hgss3/87_hires.png',
  'kyogre-groudon-bas.png': 'https://images.pokemontcg.io/hgss3/88_hires.png',
  'rayquaza-deoxys-haut.png': 'https://images.pokemontcg.io/hgss3/89_hires.png',
  'rayquaza-deoxys-bas.png': 'https://images.pokemontcg.io/hgss3/90_hires.png',
  'darkrai-cresselia-haut.png': 'https://images.pokemontcg.io/hgss4/99_hires.png',
  'darkrai-cresselia-bas.png': 'https://images.pokemontcg.io/hgss4/100_hires.png',
  'dialga-palkia-haut.png': 'https://images.pokemontcg.io/hgss4/101_hires.png',
  'dialga-palkia-bas.png': 'https://images.pokemontcg.io/hgss4/102_hires.png',

  // Radiant Collection & Scènes XY / EB (Corrections Absolues)
  'gruikui-rc5.png': 'https://images.pokemontcg.io/rc/5_hires.png',
  'grotichon-rc6.png': 'https://images.pokemontcg.io/rc/6_hires.png',
  'roitiflam-rc7.png': 'https://images.pokemontcg.io/rc/7_hires.png',
  'brocelome-xy9-55.png': 'https://assets.tcgdex.net/fr/xy/xy9/55/high.webp',
  'grelacon-swsh6-042.png': 'https://assets.tcgdex.net/fr/swsh/swsh6/042/high.webp'
};

// Remplacement impératif pour écraser les faux positifs
const FORCE_RELOAD = new Set(Object.keys(DIRECT_SOURCES));

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
  const isTargeted = FORCE_RELOAD.has(card.file);

  // Vérification de la taille pour s'assurer que ce n'est pas une page d'erreur (404) mise en cache
  if (fs.existsSync(destPath) && !isTargeted) {
    const stat = fs.statSync(destPath);
    if (stat.size > 10000) {
      console.log(`[SKIP] Déjà présent et valide : ${card.file} (${card.nom})`);
      return;
    }
  }

  let downloadedBuffer = null;
  let sourceUrl = '';

  // Force l'URL directe d'abord si elle est présente
  if (DIRECT_SOURCES[card.file]) {
    downloadedBuffer = await tryDownloadUrl(DIRECT_SOURCES[card.file]);
    if (downloadedBuffer) sourceUrl = DIRECT_SOURCES[card.file];
  }

  if (!downloadedBuffer) {
    const urls = getCandidateUrls(card);
    for (const url of urls) {
      downloadedBuffer = await tryDownloadUrl(url);
      if (downloadedBuffer) {
        sourceUrl = url;
        break;
      }
      await sleep(40);
    }
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
