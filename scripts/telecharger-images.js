const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

if (!fs.existsSync(dossierImages)) {
    fs.mkdirSync(dossierImages, { recursive: true });
}

async function fetchAvecDelai(url, delai = 200) {
    await new Promise(resolve => setTimeout(resolve, delai));
    const reponse = await fetch(url);
    if (!reponse.ok) throw new Error(`Erreur HTTP: ${reponse.status}`);
    return reponse;
}

async function lancerRecuperationCDN() {
    console.log("🔍 Lecture de cartes-data.js pour recherche via le CDN Open Source...");
    
    const contenuFichier = fs.readFileSync(cheminData, 'utf8');
    const debutTableau = contenuFichier.indexOf('[');
    const finTableau = contenuFichier.lastIndexOf(']');
    
    if (debutTableau === -1 || finTableau === -1) {
        console.error("❌ Impossible de trouver le tableau de données.");
        return;
    }

    const cartes = JSON.parse(contenuFichier.substring(debutTableau, finTableau + 1));
    const cartesSansImage = cartes.filter(c => !c.image);
    
    console.log(`📊 Total des cartes dans la base : ${cartes.length}`);
    console.log(`⚠️ Cartes sans image à interroger via le CDN : ${cartesSansImage.length}\n`);

    let telechargees = 0;
    let echecs = 0;

    for (let i = 0; i < cartesSansImage.length; i++) {
        const carte = cartesSansImage[i];
        process.stdout.write(`⏳ [${i + 1}/${cartesSansImage.length}] Interrogation CDN pour ${carte.id}...\r`);

        try {
            // Utilisation du CDN jsDelivr pointant vers les assets officiels de la base TCGdex open-source
            const urlCdn = `https://cdn.jsdelivr.net/gh/tcgdex/cards-database@master/assets/${carte.langue}/${carte.extension.toLowerCase().replace(/[^a-z0-9]/g, '')}/${carte.numero}/high.webp`;
            
            const resImg = await fetchAvecDelai(urlCdn);
            const buffer = Buffer.from(await resImg.arrayBuffer());
            const nomFichierLocal = `${carte.id.replace(/[/\\?%*:|"<>]/g, '_')}.webp`;
            const cheminLocalComplet = path.join(dossierImages, nomFichierLocal);
            
            fs.writeFileSync(cheminLocalComplet, buffer);
            carte.image = `assets/img/${nomFichierLocal}`;
            telechargees++;
        } catch (erreur) {
            echecs++;
        }
    }

    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');

    console.log("\n\n✨ Session CDN terminée !");
    console.log(`✅ Images récupérées et stockées localement : ${telechargees}`);
    console.log(`❌ Restant introuvables : ${echecs}`);
    console.log(`💾 Le fichier cartes-data.js a été mis à jour.`);
}

lancerRecuperationCDN();
