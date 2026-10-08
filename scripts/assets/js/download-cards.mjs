import fs from 'fs';
import path from 'path';

const TARGETS = [
    { jsonFile: 'cards_mew.json', folder: './assets/cards/mew' },
    { jsonFile: 'cards_mewtwo.json', folder: './assets/cards/mewtwo' }
];

async function downloadImage(url, destPath) {
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MewthologyArchive/1.0'
        }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
}

async function run() {
    for (const target of TARGETS) {
        if (!fs.existsSync(target.jsonFile)) continue;

        if (!fs.existsSync(target.folder)) {
            fs.mkdirSync(target.folder, { recursive: true });
        }

        const cards = JSON.parse(fs.readFileSync(target.jsonFile, 'utf-8'));
        console.log(`\n--- Téléchargement : ${target.folder} (${cards.length} cartes) ---`);

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            if (!card.imageFr) continue;

            const ext = path.extname(new URL(card.imageFr).pathname) || '.png';
            const fileName = `${card.id}${ext}`;
            const destPath = path.join(target.folder, fileName);

            // Ne retélécharge pas si déjà présent
            if (fs.existsSync(destPath)) {
                card.localPath = `${target.folder}/${fileName}`;
                continue;
            }

            try {
                process.stdout.write(`[${i + 1}/${cards.length}] ${card.nom} (${card.numero})... `);
                await downloadImage(card.imageFr, destPath);
                card.localPath = `${target.folder}/${fileName}`;
                console.log('OK');
            } catch (err) {
                console.log(`ÉCHEC (${err.message})`);
            }

            // Pause de 150ms pour respecter le serveur
            await new Promise(r => setTimeout(r, 150));
        }

        // Met à jour le JSON avec les chemins locaux
        fs.writeFileSync(target.jsonFile, JSON.stringify(cards, null, 2), 'utf-8');
    }

    console.log('\nTéléchargement terminé avec succès.');
}

run();