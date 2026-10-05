const fs = require('fs');
const path = require('path');

// Chemin vers ton fichier de données
const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

// S'assure que le dossier de destination existe
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
    
    // On lit le contenu brut du fichier pour extraire le tableau JavaScript
    const contenuFichier = fs.readFileSync(cheminData, 'utf8');
    
    // Petite astuce pour transformer la constante JS en tableau exploitable par Node
    const matchTableau = contenuFichier.match(/const cartesDatabase = \([\s\S]*\);|const cartesDatabase = \[\s\S*\];/);
    if (!matchTableau) {
        // Fallback si le format est un simple tableau assigné
        console.error("❌ Format de cartes-data.js non reconnu pour l'analyse automatique.");
        return;
    }

    // Extraction propre des données JSON contenues dans le fichier JS
    // On extrait la partie entre les crochets [ ... ]
    const debutTableau = contenuFichier.indexOf('[');
    const finTableau = contenuFichier.lastIndexOf(']');
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
            // Interrogation de l'API TCGdex pour cette carte spécifique
            const details = await fetchAvecDelai(`https://api.tcgdex.net/v2/${carte.langue}/cards/${carte.id}`);
            
            if (details && details.image) {
                const urlImage = `${details.image}/high.webp`;
                
                // Téléchargement de l'image
                const resImg = await fetch(urlImage);
                if (!resImg.ok) throw new Error(`Impossible de télécharger l'image (${resImg.status})`);
                
                const buffer = Buffer.from(await resImg.arrayBuffer());
                const nomFichierLocal = `${carte.id.replace(/[/\\?%*:|"<>]/g, '_')}.webp`;
                const cheminLocalComplet = path.join(dossierImages, nomFichierLocal);
                
                // Sauvegarde sur le disque
                fs.writeFileSync(cheminLocalComplet, buffer);
                
                // Mise à jour de la référence dans l'objet carte
                carte.image = `assets/img/${nomFichierLocal}`;
                telechargees++;
            } else {
                console.warn(`\n⚠️ Aucune image trouvée sur l'API pour l'ID : ${carte.id}`);
                echecs++;
            }
        } catch (erreur) {
            console.warn(`\n❌ Erreur pour ${carte.id}: ${erreur.message}`);
            echecs++;
        }
    }

    // Réécriture propre du fichier cartes-data.js avec les nouveaux chemins locaux
    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');

    console.log("\n\n✨ Opération terminée !");
    console.log(`✅ Images téléchargées et enregistrées localement : ${telechargees}`);
    console.log(`❌ Échecs / Toujours introuvables : ${echecs}`);
    console.log(`💾 Le fichier cartes-data.js a été mis à jour avec les chemins locaux dans 'assets/img/'.`);
}

lancerRecuperation();
