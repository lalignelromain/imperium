const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

const ciblesDirectes = {
    "cel25cc-CC013": "https://images.pokemontcg.io/cel25c/88_hires.png",
    "cel25cc-CC022": "https://images.pokemontcg.io/cel25c/54_hires.png",
    "swsh12.5gg-GG10": "https://images.pokemontcg.io/swsh12pt5gg/GG10_hires.png",
    "sma-SV59": "https://images.pokemontcg.io/sma/SV59_hires.png"
};

async function telechargerDirect() {
    const contenu = fs.readFileSync(cheminData, 'utf8');
    const debut = contenu.indexOf('[');
    const fin = contenu.lastIndexOf(']');
    const cartes = JSON.parse(contenu.substring(debut, fin + 1));

    for (const [id, url] of Object.entries(ciblesDirectes)) {
        process.stdout.write(`⏳ Téléchargement de ${id}...\r`);
        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.log(`\n❌ Erreur HTTP ${res.status} pour ${id}`);
                continue;
            }
            const buffer = Buffer.from(await res.arrayBuffer());
            const nomFichier = `${id}.png`;
            fs.writeFileSync(path.join(dossierImages, nomFichier), buffer);

            const carte = cartes.find(c => c.id === id);
            if (carte) carte.image = `assets/img/${nomFichier}`;

            console.log(`\n✅ Enregistré : ${id}`);
        } catch (e) {
            console.log(`\n❌ Erreur réseau pour ${id} : ${e.message}`);
        }
    }

    fs.writeFileSync(cheminData, `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`, 'utf8');
    console.log("\n💾 cartes-data.js mis à jour.");
}

telechargerDirect();
