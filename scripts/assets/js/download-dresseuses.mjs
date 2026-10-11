import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const { dresseusesDatabase } = require('./dresseuses-data.js');

const ROOT_DIR = path.resolve(__dirname, '../../../');
const DEST_DIR = path.join(ROOT_DIR, 'assets', 'cards', 'dresseuses');
const ALT_DIR = path.join(DEST_DIR, 'alt');

// Création des dossiers s'ils n'existent pas
if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });
if (!fs.existsSync(ALT_DIR)) fs.mkdirSync(ALT_DIR, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
};

// Génération de toutes les URL possibles (Français prioritaire, Anglais en secours)
function getUrlsToTry(card) {
  const set = card.set;
  const num = String(card.num).trim();
  const unpadded = num.replace(/^0+/, '');
  const padded3 = num.padStart(3, '0');

  const urls = [];

  // 1. TCGdex (Priorité : scans HD en Français WebP)
  urls.push(`https://assets.tcgdex.net/fr/${set}/${num}/high.webp`);
  if (unpadded !== num) urls.push(`https://assets.tcgdex.net/fr/${set}/${unpadded}/high.webp`);
  if (padded3 !== num) urls.push(`https://assets.tcgdex.net/fr/${set}/${padded3}/high.webp`);

  // 2. PokemonTCG.io (Plan B : scans HD en Anglais PNG)
  urls.push(`https://images.pokemontcg.io/${set}/${num}_hires.png`);
  if (unpadded !== num) urls.push(`https://images.pokemontcg.io/${set}/${unpadded}_hires.png`);
  if (padded3 !== num) urls.push(`https://images.pokemontcg.io/${set}/${padded3}_hires.png`);

  // 3. Gestion spécifique des sets secondaires (Trainer Gallery, Galarian Gallery, Shiny Vault)
  if (set.endsWith('gg') || set.endsWith('tg') || num.startsWith('GG') || num.startsWith('TG') || num.startsWith('SV')) {
    const cleanSet = set.replace(/(gg|tg)$/, '');
    urls.push(`https://assets.tcgdex.net/fr/${cleanSet}/${num}/high.webp`);
    urls.push(`https://images.pokemontcg.io/${cleanSet}/${num}_hires.png`);
  }

  // 4. Cas spécifiques (Promos Japonaises comme Selene)
  if (set === 'smp') {
     urls.push(`https://images.pokemontcg.io/smp/${num}_hires.png`);
  }

  return [...new Set(urls)];
}

// Téléchargement sécurisé
async function tryDownloadUrl(url) {
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('text/html')) return null; // Ignore les fausses pages 404
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 5000) return null; // Ignore les fichiers corrompus
    return buffer;
  } catch {
    return null;
  }
}

async function run() {
  console.log('=== TÉLÉCHARGEMENT DES DRESSEUSES (VIA API OFFICIELLES) ===\n');

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;

  for (const section of dresseusesDatabase) {
      for (const card of section.cartes) {
          
          // Sécurité anti-crash pour les cartes sans références complètes
          if (!card.set || !card.num) {
              console.log(`🟡 [ATTENTE] Données incomplètes pour ${card.nom}, téléchargement ignoré.`);
              skipCount++;
              continue;
          }

          const destPath = path.join(DEST_DIR, card.file);
          
          if (fs.existsSync(destPath)) {
              console.log(`⚪ [SKIP] ${card.file} existe déjà.`);
              continue;
          }

          let downloadedBuffer = null;
          const urls = getUrlsToTry(card);

          for (const url of urls) {
              downloadedBuffer = await tryDownloadUrl(url);
              if (downloadedBuffer) {
                  break; // Stoppe dès qu'une URL a fonctionné
              }
              await sleep(50);
          }

          if (downloadedBuffer) {
              fs.writeFileSync(destPath, downloadedBuffer);
              console.log(`🟢 [OK] ${card.nom} (#${card.num}) téléchargé.`);
              successCount++;
          } else {
              console.error(`🔴 [ERR] Introuvable : ${card.nom} (${card.set} #${card.num})`);
              failCount++;
          }
          await sleep(150);
      }
  }
  
  console.log(`\n=== TERMINÉ ! Succès: ${successCount} | Échecs: ${failCount} | Ignorés: ${skipCount} ===`);
  console.log('Placez vos images alternatives manuellement dans le dossier "assets/cards/dresseuses/alt/".');
}

run();
