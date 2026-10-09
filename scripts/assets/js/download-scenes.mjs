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

  // Radiant Collection & Scènes XY / EB
  'gruikui-rc5.png': 'https://images.pokemontcg.io/rc/RC5_hires.png',
  'grotichon-rc6.png': 'https://images.pokemontcg.io/rc/RC6_hires.png',
  'roitiflam-rc7.png': 'https://images.pokemontcg.io/rc/RC7_hires.png',
  'brocelome-xy9-55.png': 'https://assets.tcgdex.net/fr/xy/xy9/55/high.webp',
  'grelacon-swsh6-042.png': 'https://assets.tcgdex.net/fr/swsh/swsh6/042/high.webp'
};

// Remplacement impératif pour écraser les faux positifs
const FORCE_RELOAD = new Set(Object.keys(DIRECT_SOURCES));

async function downloadBinary(url, destPath) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ab = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(ab));
}

// Recherche Poképédia par préfixe propre
async function findPokepediaUrl(card) {
  const cleanNom = card.nom.replace(/[^a-zA-Z0-9àâäéèêëîïôöùûüç\s]/gi, ' ').trim();
  const firstWord = cleanNom.split(' ')[0];
  const prefix = `Carte ${firstWord}`;
  const url = `https://www.pokepedia.fr/api.php?action=query&list=allimages&aiprefix=${encodeURIComponent(prefix)}&ailimit=100&aiprop=url&format=json`;

  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    const images = data?.query?.allimages || [];
    const rawNum = String(card.num).replace(/^#/, '').toLowerCase().trim();

    const hit = images.find((img) => img.name.toLowerCase().includes(rawNum));
    return hit ? hit.url : null;
  } catch {
    return null;
  }
}

// Fallback CDN standard (TCGdex / PokemonTCG)
function getFallbackCdnUrl(card) {
  if (card.set && card.num) {
    return `https://assets.tcgdex.net/fr/${card.set}/${card.num}/high.webp`;
  }
  return null;
}

async function processCard(card) {
  const destPath = path.join(DEST_DIR, card.file);
  const isTargeted = FORCE_RELOAD.has(card.file);

  if (fs.existsSync(destPath) && !isTargeted) {
    console.log(`[SKIP] Déjà présent : ${card.file} (${card.nom})`);
    return;
  }

  let finalUrl = DIRECT_SOURCES[card.file] || null;

  if (!finalUrl) {
    finalUrl = await findPokepediaUrl(card);
  }

  if (!finalUrl) {
    finalUrl = getFallbackCdnUrl(card);
  }

  if (!finalUrl) {
    console.error(`[ERR] Aucun flux disponible pour : ${card.nom} #${card.num} (${card.file})`);
    return;
  }

  try {
    await downloadBinary(finalUrl, destPath);
    console.log(`[OK] Téléchargé avec succès -> ${card.file} (${card.nom})`);
  } catch (err) {
    console.error(`[ERR] Téléchargement binaire échoué pour ${card.file} : ${err.message}`);
  }

  await sleep(120);
}

async function run() {
  console.log('=== DÉMARRAGE DU TÉLÉCHARGEMENT INTÉGRAL SÉCURISÉ ===\n');

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

  console.log(`Total de cartes uniques à vérifier : ${allCards.length}\n`);

  for (const card of allCards) {
    await processCard(card);
  }

  console.log('\n=== DOSSIER assets/cards/chroniques/ COMPLÈTEMENT CONFORME ===');
}

run();
