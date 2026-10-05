const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

// Les 4 cartes restantes avec leurs critères précis sur pokemontcg.io
const cibles = [
    { id: "cel25cc-CC013", query: 'name:"Mew ex" set.id:"cel25c"' },
    { id: "cel25cc-CC022", query: 'name:"Mewtwo-EX" set.id:"cel25c"' },
    { id: "swsh12.5gg-GG10", query: 'name:"Mew" number:"GG10"' },
    { id: "sma-SV59", query: 'name:"Mewtwo-GX" number:"SV59"' }
];

async function recupererQuatreCartes() {
    console.log("🔍 Récupération ciblée des 4 cartes...");

    const contenu = fs.readFileSync(cheminData, 'utf8');
    const debut = contenu.indexOf('[');
    const fin = contenu.lastIndexOf(']');
    const cartes = JSON.parse(contenu.substring(debut, fin + 1));

    for (const item of cibles) {
        process.stdout.write(`⏳ Recherche API pour ${item.id}...\r`);
        try {
            const urlApi = `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(item.query)}`;
            const res = await fetch(urlApi);
            if (!res.ok) {
                console.log(`\n❌ Échec API ${res.status} pour ${item.id}`);
                continue;
            }

            const data = await res.json();
            if (data.data && data.data.length > 0) {
                const imgUrl = data.data[0].images.large || data.data[0].images.small;
                const imgRes = await fetch(imgUrl);
                const buffer = Buffer.from(await imgRes.arrayBuffer());

                const nomFichier = `${item.id}.png`;
                fs.writeFileSync(path.join(dossierImages, nomFichier), buffer);

                const c = cartes.find(x => x.id === item.id);
                if (c) c.image = `assets/img/${nomFichier}`;

                console.log(`\n✅ Récupéré et associé : ${item.id}`);
            } else {
                console.log(`\n⚠️ Aucun résultat pour ${item.id}`);
            }
        } catch (e) {
            console.log(`\n❌ Erreur pour ${item.id} : ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 600));
    }

    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');
    console.log("\n💾 cartes-data.js synchronisé.");
}

recupererQuatreCartes();
