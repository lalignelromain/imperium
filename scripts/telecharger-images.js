const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

if (!fs.existsSync(dossierImages)) {
    fs.mkdirSync(dossierImages, { recursive: true });
}

async function fetchAvecDelai(url, options = {}, delai = 150) {
    await new Promise(resolve => setTimeout(resolve, delai));
    const reponse = await fetch(url, options);
    if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
    return reponse;
}

// Teste une liste d'URL potentielles et retourne la première qui répond un statut 200 (avec option de récupérer le buffer directement)
async function testerEtTelechargerUrl(url, cheminDestination) {
    try {
        const res = await fetchAvecDelai(url, { method: 'GET' });
        if (res.ok) {
            const buffer = Buffer.from(await res.arrayBuffer());
            // Vérifie que ce n'est pas une page HTML d'erreur 404 (doit faire une taille minimale de fichier image)
            if (buffer.length > 1000) {
                fs.writeFileSync(cheminDestination, buffer);
                return true;
            }
        }
    } catch (e) {
        // Ignore l'erreur et essaie la suite
    }
    return false;
}

async function trouverEtSauvegarderImage(carte, cheminDestination) {
    const id = carte.id.toLowerCase();
    const numeroClean = carte.numero.toLowerCase();
    const extensionSlug = carte.extension.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Liste exhaustive de toutes les stratégies de chemins/API à tester en cascade
    const strategies = [
        // 1. Stratégie TCGdex Officiel (Variantes d'endpoints)
        `https://assets.tcgdex.net/${carte.langue}/cards/${id}/high.webp`,
        `https://assets.tcgdex.net/${carte.langue}/cartedex/${id}/high.webp`,
        `https://assets.tcgdex.net/v2/${carte.langue}/cards/${id}`, // Endpoint JSON pour chercher une autre propriété d'image si l'URL de base a changé

        // 2. Stratégie Dépôts GitHub / CDN Open-Source TCGdex (Multi-variantes de dossiers)
        `https://raw.githubusercontent.com/tcgdex/cards-database/master/assets/${carte.langue}/${extensionSlug}/${numeroClean}/high.webp`,
        `https://cdn.jsdelivr.net/gh/tcgdex/cards-database@master/assets/${carte.langue}/${extensionSlug}/${numeroClean}/high.webp`,
        `https://raw.githubusercontent.com/tcgdex/cards-database/master/assets/${carte.langue}/cards/${id}/high.webp`,
        `https://cdn.jsdelivr.net/gh/tcgdex/cards-database@master/assets/${carte.langue}/cards/${id}/high.webp`,

        // 3. Stratégie alternative basée sur les extensions standardisées
        `https://assets.tcgdex.net/en/${carte.langue === 'fr' ? 'fr' : 'ja'}/cards/${id}/high.webp`
    ];

    for (const strat of strategies) {
        // Si c'est un endpoint JSON TCGdex (stratégie 1 bis)
        if (strat.includes('/v2/') && !strat.endsWith('.webp')) {
            try {
                const resJson = await fetchAvecDelai(strat);
                const data = await resJson.json();
                if (data && data.image) {
                    const imageUrl = `${data.image}/high.webp`;
                    if (await testerEtTelechargerUrl(imageUrl, cheminDestination)) return true;
                }
            } catch (e) {}
            continue;
        }

        // Si c'est une URL d'image directe
        if (await testerEtTelechargerUrl(strat, cheminDestination)) {
            return true;
        }
    }

    return false;
}

async function lancerChasseUniverselle() {
    console.log("🚀 Lancement du script de récupération multicouche (Multi-sources & Dépôts)...");
    
    const contenuFichier = fs.readFileSync(cheminData, 'utf8');
    const debutTableau = contenuFichier.indexOf('[');
    const finTableau = contenuFichier.lastIndexOf(']');
    
    if (debutTableau === -1 || finTableau === -1) {
        console.error("❌ Impossible de lire le tableau dans cartes-data.js.");
        return;
    }

    const cartes = JSON.parse(contenuFichier.substring(debutTableau, finTableau + 1));
    const cartesSansImage = cartes.filter(c => !c.image || c.image === null);
    
    console.log(`📊 Total des cartes dans la base : ${cartes.length}`);
    console.log(`🎯 Cartes ciblées par la recherche multicouche : ${cartesSansImage.length}\n`);

    let trouvees = 0;
    let introuvables = 0;

    for (let i = 0; i < cartesSansImage.length; i++) {
        const carte = cartesSansImage[i];
        process.stdout.write(`⏳ [${i + 1}/${cartesSansImage.length}] Test multi-sources pour ${carte.id} (${carte.nom})...\r`);

        const nomFichierLocal = `${carte.id.replace(/[/\\?%*:|"<>]/g, '_')}.webp`;
        const cheminLocalComplet = path.join(dossierImages, nomFichierLocal);

        const succes = await trouverEtSauvegarderImage(carte, cheminLocalComplet);

        if (succes) {
            carte.image = `assets/img/${nomFichierLocal}`;
            trouvees++;
        } else {
            introuvables++;
        }
    }

    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');

    console.log("\n\n✨ Bilan de la chasse multicouche :");
    console.log(`✅ Images récupérées avec succès et stockées localement : ${trouvees}`);
    console.log(`❌ Cartes n'ayant répondu sur aucune source : ${introuvables}`);
    console.log(`💾 Le fichier cartes-data.js a été mis à jour.`);
}

lancerChasseUniverselle();
