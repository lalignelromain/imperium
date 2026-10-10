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
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Referer': 'https://www.pokepedia.fr/'
};

async function downloadFromPokepedia(card) {
  const cleanNom = card.nom.replace(/\s*\(.*?\)\s*/g, '').replace(/[^a-zA-Z0-9àâäéèêëîïôöùûüç\s-]/gi, '').split(' ')[0];
  const prefix = `Carte ${cleanNom}`;
  const url = `https://www.pokepedia.fr/api.php?action=query&list=allimages&aiprefix=${encodeURIComponent(prefix)}&ailimit=100&aiprop=url&format=json`;

  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return false;
    const data = await res.json();
    const images = data?.query?.allimages || [];
    
    const rawNum = String(card.num).replace(/^#/, '').toLowerCase().trim();
    const unpaddedNum = rawNum.replace(/^0+/, '');
    
    const hit = images.find((img) => {
      const imgName = img.name.toLowerCase();
      return imgName.includes(` ${rawNum})`) || 
             imgName.includes(` ${unpaddedNum})`) ||
             imgName.includes(`_${rawNum}.`) ||
             imgName.includes(` ${rawNum}.`);
    });
    
    if (hit) {
        const imgRes = await fetch(hit.url, { headers: HEADERS });
        if (!imgRes.ok) return false;
        const arrayBuffer = await imgRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        fs.writeFileSync(path.join(DEST_DIR, card.file), buffer);
        console.log(`🟢 [OK] ${card.file} téléchargé depuis Poképédia.`);
        return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

async function run() {
  console.log('=== TÉLÉCHARGEMENT DES DRESSEUSES (POKÉPÉDIA) ===\n');

  for (const section of dresseusesDatabase) {
      for (const card of section.cartes) {
          const exists = fs.existsSync(path.join(DEST_DIR, card.file));
          if (!exists) {
              const success = await downloadFromPokepedia(card);
              if (!success) {
                  console.log(`🟡 [INFO] Introuvable sur Poképédia : ${card.nom} #${card.num} (Téléchargement manuel requis)`);
              }
              await sleep(200);
          }
      }
  }
  console.log('\n=== TERMINÉ ! N\'oubliez pas de placer vos images alternatives manuellement dans le dossier "alt/". ===');
}

run();
