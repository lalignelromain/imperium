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
    return reponse.json();
}

async function lancerRecuperation() {
    console.log("🔍 Lecture de cartes-data.js...");
    
    const contenuFichier = fs.readFileSync(cheminData, 'utf8');
    
    // Extraction directe du tableau JSON peu importe la déclaration de variable
    const debutTableau = contenuFichier.indexOf('[');
    const finTableau = contenuFichier.lastIndexOf(']');
    
    if (debutTableau === -1 || finTableau === -1) {
        console.error("❌ Impossible de trouver le tableau de données dans cartes-data.js.");
        return;
    }

    const jsonString = contenuFichier.substring(debutTableau, finTableau + 1);
    
    let cartes;
    try {
        cartes = JSON.parse(jsonString);
    } catch (e) {
        console.error("❌ Erreur lors de l'analyse JSON des cartes :", e.message);
        return;
    }

    console.log(`📊 Total des cartes dans la base : ${cartes.length}`);
    const cartesSansImage = cartes.filter(c => !c.image);
    console.log(`⚠️ Cartes sans image à récupérer : ${cartesSansImage.length}\n`);

    let telechargees = 0;
    let echecs = 0;

    for (let i = 0; i < cartesSansImage.length; i++) {
        const carte = cartesSansImage[i];
        process.stdout.write(`⏳ [${i + 1}/${cartesSansImage.length}] Traitement de ${carte.id} (${carte.nom})...\r`);

        try {
            const details = await fetchAvecDelai(`https://api.tcgdex.net/v2/${carte.langue}/cards/${carte.id}`);
            
            if (details && details.image) {
                const urlImage = `${details.image}/high.webp`;
                
                const resImg = await fetch(urlImage);
                if (!resImg.ok) throw new Error(`Impossible de télécharger l'image (${resImg.status})`);
                
                const buffer = Buffer.from(await resImg.arrayBuffer());
                const nomFichierLocal = `${carte.id.replace(/[/\\?%*:|"<>]/g, '_')}.webp`;
                const cheminLocalComplet = path.join(dossierImages, nomFichierLocal);
                
                fs.writeFileSync(cheminLocalComplet, buffer);
                
                carte.image = `assets/img/${nomFichierLocal}`;
                telechargees++;
            } else {
                echecs++;
            }
        } catch (erreur) {
            echecs++;
        }
    }

    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');

    console.log("\n\n✨ Opération terminée !");
    console.log(`✅ Images téléchargées et enregistrées localement : ${telechargees}`);
    console.log(`❌ Échecs / Toujours introuvables : ${echecs}`);
    console.log(`💾 Le fichier cartes-data.js a été mis à jour avec les chemins locaux.`);
}

lancerRecuperation();
