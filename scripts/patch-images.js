const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

// Table de correspondance directe pour les cartes récalcitrantes
const urlsDirectes = {
    "dp5-9": "https://images.pokemontcg.io/dp5/9_hires.png",
    "basep-9": "https://images.pokemontcg.io/basep/9_hires.png",
    "dp6-11": "https://images.pokemontcg.io/dp6/11_hires.png",
    "sm115-31": "https://images.pokemontcg.io/hif/31_hires.png",
    "sm115-32": "https://images.pokemontcg.io/hif/32_hires.png",
    "sm3.5-39": "https://images.pokemontcg.io/sm35/39_hires.png",
    "sm11-71": "https://images.pokemontcg.io/sm11/71_hires.png",
    "sm3.5-72": "https://images.pokemontcg.io/sm35/72_hires.png",
    "sm10-76": "https://images.pokemontcg.io/sm10/76_hires.png",
    "sm3.5-78": "https://images.pokemontcg.io/sm35/78_hires.png",
    "cel25cc-CC013": "https://images.pokemontcg.io/cel25c/classic-13_hires.png",
    "cel25cc-CC022": "https://images.pokemontcg.io/cel25c/classic-22_hires.png",
    "swsh12.5gg-GG10": "https://images.pokemontcg.io/swsh12pt5gg/GG10_hires.png",
    "smp-SM191": "https://images.pokemontcg.io/smp/SM191_hires.png",
    "smp-SM77": "https://images.pokemontcg.io/smp/SM77_hires.png",
    "sma-SV59": "https://images.pokemontcg.io/sma/SV59_hires.png"
};

async function patcherImages() {
    console.log("🚀 Application du patch direct d'images...");

    const contenu = fs.readFileSync(cheminData, 'utf8');
    const debut = contenu.indexOf('[');
    const fin = contenu.lastIndexOf(']');
    const cartes = JSON.parse(contenu.substring(debut, fin + 1));

    let reussites = 0;

    for (const [id, url] of Object.entries(urlsDirectes)) {
        process.stdout.write(`⏳ Téléchargement pour ${id}...\r`);
        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.log(`\n❌ Échec HTTP ${res.status} pour ${id}`);
                continue;
            }

            const buffer = Buffer.from(await res.arrayBuffer());
            const nomFichier = `${id}.png`;
            const cheminFichier = path.join(dossierImages, nomFichier);

            fs.writeFileSync(cheminFichier, buffer);

            const carte = cartes.find(c => c.id === id);
            if (carte) {
                carte.image = `assets/img/${nomFichier}`;
            }

            reussites++;
            console.log(`\n✅ Récupéré : ${id}`);
        } catch (err) {
            console.log(`\n❌ Erreur pour ${id} : ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 200));
    }

    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');

    console.log(`\n✨ Terminé : ${reussites}/${Object.keys(urlsDirectes).length} cartes patchées dans cartes-data.js.`);
}

patcherImages();
