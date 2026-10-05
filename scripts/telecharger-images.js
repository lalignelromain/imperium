const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

if (!fs.existsSync(dossierImages)) {
    fs.mkdirSync(dossierImages, { recursive: true });
}

async function fetchAvecDelai(url, delai = 300) {
    await new Promise(resolve => setTimeout(resolve, delai));
    const reponse = await fetch(url);
    if (!reponse.ok) throw new Error(`Erreur HTTP: ${reponse.status}`);
    return reponse;
}

// Stratégies alternatives pour retrouver l'image d'une carte sans image TCGdex
async function trouverUrlImageSecours(carte) {
    // Stratégie A : TCGdex structure souvent ses assets officiels GitHub par ID direct en minuscules
    // Exemple de structure open-source brute de TCGdex (assets hébergés sur le dépôt de cartes)
    const idClean = carte.id.toLowerCase();
    
    // Essor de plusieurs structures d'URL potentielles basées sur les conventions de nommage des assets TCG
    const urlsTestees = [
        `https://raw.githubusercontent.com/tcgdex/cards-database/master/assets/${carte.langue}/${carte.extension.toLowerCase().replace(/[^a-z0-9]/g, '')}/${carte.numero}/high.webp`,
        `https://assets.tcgdex.net/${carte.langue}/cartedex/${idClean}/high.webp`
    ];

    // On peut aussi tenter de chercher via le dépôt global des images TCGdex si l'ID correspond
    for (const url of urlsTestees) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.ok) return url;
        } catch (e) {
            // Ignore et passe à la suivante
        }
    }

    return null;
}

async function lancerScrapingSecours() {
    console.log("🔍 Analyse de cartes-data.js pour le scraping de secours...");
    
    const contenuFichier = fs.readFileSync(cheminData, 'utf8');
    const debutTableau = contenuFichier.indexOf('[');
    const finTableau = contenuFichier.lastIndexOf(']');
    
    if (debutTableau === -1 || finTableau === -1) {
        console.error("❌ Impossible de trouver le tableau de données.");
        return;
    }

    const cartes = JSON.parse(contenuFichier.substring(debutTableau, finTableau + 1));
    const cartesSansImage = cartes.filter(c => !c.image || c.image.startsWith('assets/img/') === false && c.image === null);
    
    console.log(`📊 Total des cartes dans la base : ${cartes.length}`);
    console.log(`⚠️ Cartes sans image à aller chercher par scraping : ${cartesSansImage.length}\n`);

    let recuperees = 0;
    let echecs = 0;

    for (let i = 0; i < cartesSansImage.length; i++) {
        const carte = cartesSansImage[i];
        process.stdout.write(`⏳ [${i + 1}/${cartesSansImage.length}] Recherche de secours pour ${carte.id} (${carte.nom})...\r`);

        try {
            let urlTrouvee = await trouverUrlImageSecours(carte);

            if (urlTrouvee) {
                const resImg = await fetchAvecDelai(urlTrouvee);
                const buffer = Buffer.from(await resImg.arrayBuffer());
                const nomFichierLocal = `${carte.id.replace(/[/\\?%*:|"<>]/g, '_')}.webp`;
                const cheminLocalComplet = path.join(dossierImages, nomFichierLocal);
                
                fs.writeFileSync(cheminLocalComplet, buffer);
                carte.image = `assets/img/${nomFichierLocal}`;
                recuperees++;
            } else {
                echecs++;
            }
        } catch (erreur) {
            echecs++;
        }
    }

    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');

    console.log("\n\n✨ Session de scraping terminée !");
    console.log(`✅ Images récupérées et stockées localement : ${recuperees}`);
    console.log(`❌ Restant introuvables automatiquement : ${echecs}`);
    console.log(`💾 Le fichier cartes-data.js a été mis à jour.`);
}

lancerScrapingSecours();
