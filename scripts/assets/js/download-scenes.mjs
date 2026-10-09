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

// Titres exacts des fichiers sur Poképédia pour les cartes complexes et les faux positifs
const EXACT_POKEPEDIA_TITLES = {
  // 1. Zénith Suprême (Fresque)
  'zenith-tylton.png': 'Fichier:Carte Tylton (Zénith Suprême GG48).png',
  'zenith-amagara.png': 'Fichier:Carte Amagara (Zénith Suprême GG49).png',
  'zenith-tortipouss.png': 'Fichier:Carte Tortipouss (Zénith Suprême GG51).png',
  'zenith-laporeille.png': 'Fichier:Carte Laporeille (Zénith Suprême GG52).png',
  'zenith-manglouton.png': 'Fichier:Carte Manglouton (Zénith Suprême GG53).png',
  'zenith-keunotor.png': 'Fichier:Carte Keunotor (Zénith Suprême GG54).png',

  // 2. Cheniti & Raretés DP / EX
  'cheniti-plante-45.png': 'Fichier:Carte Cheniti Cape Plante (Diamant & Perle Merveilles Secrètes 45).png',
  'cheniti-sable-46.png': 'Fichier:Carte Cheniti Cape Sable (Diamant & Perle Merveilles Secrètes 46).png',
  'cheniti-dechet-47.png': 'Fichier:Carte Cheniti Cape Déchet (Diamant & Perle Merveilles Secrètes 47).png',
  'mangriff-ex2-84.png': 'Fichier:Carte Mangriff (EX Tempête de sable 84).png',
  'seviper-ex2-73.png': 'Fichier:Carte Séviper (EX Tempête de sable 73).png',
  'seleroc-ex14-37.png': 'Fichier:Carte Séléroc (EX Gardiens de Cristal 37).png',
  'solaroc-ex14-41.png': 'Fichier:Carte Solaroc (EX Gardiens de Cristal 41).png',
  'kyogre-dc1-14.png': 'Fichier:Carte Kyogre de la Team Aqua (Double Danger 14).png',
  'groudon-dc1-15.png': 'Fichier:Carte Groudon de la Team Magma (Double Danger 15).png',

  // 3. Cartes LÉGENDE HGSS
  'hooh-legend-haut.png': 'Fichier:Carte Ho-Oh LÉGENDE (HeartGold SoulSilver 111).png',
  'hooh-legend-bas.png': 'Fichier:Carte Ho-Oh LÉGENDE (HeartGold SoulSilver 112).png',
  'lugia-legend-haut.png': 'Fichier:Carte Lugia LÉGENDE (HeartGold SoulSilver 113).png',
  'lugia-legend-bas.png': 'Fichier:Carte Lugia LÉGENDE (HeartGold SoulSilver 114).png',
  'entei-raikou-haut.png': 'Fichier:Carte Entei et Raikou LÉGENDE (HS Déchaînement 90).png',
  'entei-raikou-bas.png': 'Fichier:Carte Entei et Raikou LÉGENDE (HS Déchaînement 91).png',
  'raikou-suicune-haut.png': 'Fichier:Carte Raikou et Suicune LÉGENDE (HS Déchaînement 92).png',
  'raikou-suicune-bas.png': 'Fichier:Carte Raikou et Suicune LÉGENDE (HS Déchaînement 93).png',
  'suicune-entei-haut.png': 'Fichier:Carte Suicune et Entei LÉGENDE (HS Déchaînement 94).png',
  'suicune-entei-bas.png': 'Fichier:Carte Suicune et Entei LÉGENDE (HS Déchaînement 95).png',
  'kyogre-groudon-haut.png': 'Fichier:Carte Kyogre et Groudon LÉGENDE (HS Indomptable 87).png',
  'kyogre-groudon-bas.png': 'Fichier:Carte Kyogre et Groudon LÉGENDE (HS Indomptable 88).png',
  'rayquaza-deoxys-haut.png': 'Fichier:Carte Rayquaza et Deoxys LÉGENDE (HS Indomptable 89).png',
  'rayquaza-deoxys-bas.png': 'Fichier:Carte Rayquaza et Deoxys LÉGENDE (HS Indomptable 90).png',
  'darkrai-cresselia-haut.png': 'Fichier:Carte Darkrai et Cresselia LÉGENDE (HS Triomphe 99).png',
  'darkrai-cresselia-bas.png': 'Fichier:Carte Darkrai et Cresselia LÉGENDE (HS Triomphe 100).png',
  'dialga-palkia-haut.png': 'Fichier:Carte Dialga et Palkia LÉGENDE (HS Triomphe 101).png',
  'dialga-palkia-bas.png': 'Fichier:Carte Dialga et Palkia LÉGENDE (HS Triomphe 102).png',

  // 4. Chroniques & Lignées
  'gruikui-rc5.png': 'Fichier:Carte Gruikui (Noir & Blanc Coffret des Dragons RC5).png',
  'grotichon-rc6.png': 'Fichier:Carte Grotichon (Noir & Blanc Coffret des Dragons RC6).png',
  'roitiflam-rc7.png': 'Fichier:Carte Roitiflam (Noir & Blanc Coffret des Dragons RC7).png',
  'brocelome-xy9-55.png': 'Fichier:Carte Brocélôme (XY Rupture TURBO 55).png',
  'grelacon-swsh6-042.png': 'Fichier:Carte Grelaçon (Épée et Bouclier Règne de Glace 042).png'
};

// Liste des fichiers à re-télécharger impérativement (échecs + faux positifs)
const FORCE_RELOAD = new Set(Object.keys(EXACT_POKEPEDIA_TITLES));

async function getUrlFromTitle(fileTitle) {
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

// Recherche large par préfixe sur Poképédia
async function searchByPrefix(card) {
  const prefix = `Carte ${card.nom.split(' ')[0]}`;
  const url = `https://www.pokepedia.fr/api.php?action=query&list=allimages&aiprefix=${encodeURIComponent(prefix)}&ailimit=80&aiprop=url&format=json`;

  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const data = await res.json();
    const images = data?.query?.allimages || [];
    const cleanNum = String(card.num).replace(/^#/, '').trim().toLowerCase();

    const hit = images.find(img => img.name.toLowerCase().includes(cleanNum));
    return hit ? hit.url : null;
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
  const isTargeted = FORCE_RELOAD.has(card.file);

  if (fs.existsSync(destPath) && !isTargeted) {
    console.log(`[SKIP] Déjà validé : ${card.file} (${card.nom})`);
    return;
  }

  let directUrl = null;

  // 1. Priorité au titre exact vérifié
  if (EXACT_POKEPEDIA_TITLES[card.file]) {
    directUrl = await getUrlFromTitle(EXACT_POKEPEDIA_TITLES[card.file]);
  }

  // 2. Recherche automatique par préfixe si non listé
  if (!directUrl) {
    directUrl = await searchByPrefix(card);
  }

  if (!directUrl) {
    console.error(`[ERR] Toujours introuvable : ${card.nom} #${card.num} (${card.file})`);
    return;
  }

  try {
    await downloadBinary(directUrl, destPath);
    console.log(`[OK] Scan Poképédia certifié -> ${card.file} (${card.nom})`);
  } catch (err) {
    console.error(`[ERR] Téléchargement binaire échoué (${card.file}) : ${err.message}`);
  }

  await sleep(150);
}

async function run() {
  console.log('=== DÉMARRAGE DE LA SYNCHRONISATION CERTIFIÉE POKÉPÉDIA ===\n');

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

  console.log(`Vérification de ${allCards.length} cartes...\n`);

  for (const card of allCards) {
    await processCard(card);
  }

  console.log('\n=== DOSSIER assets/cards/chroniques/ COMPLÈTEMENT À JOUR ===');
}

run();
