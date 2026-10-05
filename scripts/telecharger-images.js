const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const dossierImages = path.join(__dirname, '../assets/img');

if (!fs.existsSync(dossierImages)) {
    fs.mkdirSync(dossierImages, { recursive: true });
}

// Requête fetch sécurisée avec timeout et tentatives de reprise
async function fetchAvecTimeout(url, options = {}, timeoutMs = 15000, retries = 2) {
    for (let tentative = 0; tentative <= retries; tentative++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const reponse = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timer);

            if (reponse.status === 502 || reponse.status === 504 || reponse.status === 503) {
                if (tentative < retries) {
                    await new Promise(res => setTimeout(res, 2000));
                    continue;
                }
            }
            return reponse;
        } catch (err) {
            clearTimeout(timer);
            if (tentative < retries) {
                await new Promise(res => setTimeout(res, 2000));
                continue;
            }
            throw err;
        }
    }
}

// 1. Tente TCGdex
async function recupererUrlTcgdex(carte) {
    try {
        const res = await fetchAvecTimeout(`https://api.tcgdex.net/v2/${carte.langue}/cards/${carte.id}`, {}, 8000, 1);
        if (!res.ok) return null;
        const data = await res.json();
        if (data && data.image) {
            return `${data.image}/high.webp`;
        }
    } catch {
        // En cas d'erreur ou d'absence, passe au secours
    }
    return null;
}

// 2. Tente pokemontcg.io en secours (recherche internationale par nom anglais + numéro)
async function recupererUrlPokemonTcgIo(carte) {
    try {
        const nomPokemon = carte.nom.toLowerCase().includes('mewtwo') ? 'Mewtwo' : 'Mew';
        const numero = carte.numero.replace(/^0+/, ''); // enlève les zéros en tête si besoin

        const query = encodeURIComponent(`name:"${nomPokemon}" number:"${numero}"`);
        const url = `https://api.pokemontcg.io/v2/cards?q=${query}`;

        const res = await fetchAvecTimeout(url, {}, 15000, 2);
        if (!res.ok) return null;

        const data = await res.json();
        if (data && data.data && data.data.length > 0) {
            // Prend le premier résultat correspondant
            const match = data.data[0];
            return match.images.large || match.images.small;
        }
    } catch {
        // Échec réseau ou carte introuvable (japonaise)
    }
    return null;
}

async function executerAspiration() {
    console.log("🔍 Lecture de cartes-data.js...");

    const contenu = fs.readFileSync(cheminData, 'utf8');
    const debut = contenu.indexOf('[');
    const fin = contenu.lastIndexOf(']');

    if (debut === -1 || fin === -1) {
        console.error("❌ Impossible de trouver le tableau dans cartes-data.js.");
        return;
    }

    const cartes = JSON.parse(contenu.substring(debut, fin + 1));
    const cartesManquantes = cartes.filter(c => !c.image || c.image === null);

    console.log(`📊 Total : ${cartes.length} cartes`);
    console.log(`🎯 Cartes sans visuel à traiter : ${cartesManquantes.length}\n`);

    let recuperees = 0;
    const echecs = [];

    for (let i = 0; i < cartesManquantes.length; i++) {
        const carte = cartesManquantes[i];
        process.stdout.write(`⏳ [${i + 1}/${cartesManquantes.length}] Traitement de ${carte.id} (${carte.nom} #${carte.numero})...\r`);

        let urlImage = await recupererUrlTcgdex(carte);
        let sourceUtilisee = 'TCGdex';

        if (!urlImage) {
            urlImage = await recupererUrlPokemonTcgIo(carte);
            sourceUtilisee = 'pokemontcg.io';
        }

        if (urlImage) {
            try {
                const resImg = await fetchAvecTimeout(urlImage, {}, 15000, 2);
                if (resImg.ok) {
                    const extension = urlImage.endsWith('.png') ? 'png' : 'webp';
                    const nomFichier = `${carte.id.replace(/[/\\?%*:|"<>]/g, '_')}.${extension}`;
                    const cheminFichier = path.join(dossierImages, nomFichier);

                    const buffer = Buffer.from(await resImg.arrayBuffer());
                    fs.writeFileSync(cheminFichier, buffer);

                    carte.image = `assets/img/${nomFichier}`;
                    recuperees++;
                    console.log(`\n✅ Récupérée via ${sourceUtilisee} : ${carte.id}`);
                } else {
                    echecs.push(carte);
                }
            } catch {
                echecs.push(carte);
            }
        } else {
            echecs.push(carte);
        }

        // Petite temporisation pour respecter les quotas
        await new Promise(r => setTimeout(r, 600));
    }

    // Réécriture du fichier de données
    const nouveauContenu = `const cartesDatabase = ${JSON.stringify(cartes, null, 4)};\n`;
    fs.writeFileSync(cheminData, nouveauContenu, 'utf8');

    console.log("\n\n🏁 Bilan de l'opération :");
    console.log(`✅ Images enregistrées dans assets/img/ : ${recuperees}`);
    console.log(`⚠️ Restant à compléter manuellement : ${echecs.length}`);

    if (echecs.length > 0) {
        console.log("\n📋 Liste des cartes restantes :");
        echecs.forEach(c => console.log(` - [${c.id}] ${c.nom} (#${c.numero}) - Set: ${c.extension} (${c.langue})`));
    }
}

executerAspiration();
