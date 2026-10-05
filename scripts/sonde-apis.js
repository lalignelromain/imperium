const fs = require('fs');
const path = require('path');

const cheminData = path.join(__dirname, '../cartes-data.js');
const cheminSortie = path.join(__dirname, '../backlog-audit-apis.json');

async function fetchAvecTimeout(url, delai = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), delai);
    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) return { statut: res.status, ok: false };
        const data = await res.json();
        return { statut: res.status, ok: true, data };
    } catch (err) {
        clearTimeout(timeoutId);
        return { ok: false, erreur: err.message };
    }
}

async function sonderAPIs() {
    console.log("🔍 Extraction des cartes sans image pour échantillonnage...");
    const contenuFichier = fs.readFileSync(cheminData, 'utf8');
    const debut = contenuFichier.indexOf('[');
    const fin = contenuFichier.lastIndexOf(']');
    const cartes = JSON.parse(contenuFichier.substring(debut, fin + 1));

    const cartesCibles = cartes.filter(c => !c.image).slice(0, 5);
    console.log(`🎯 ${cartesCibles.length} cartes sélectionnées pour le benchmark.`);

    const backlog = {
        dateAudit: new Date().toISOString(),
        echantillonsTestes: []
    };

    for (const carte of cartesCibles) {
        console.log(`\n📡 Test de la carte : [${carte.id}] ${carte.nom} (#${carte.numero})`);
        
        const resultatCarte = {
            carteOriginale: carte,
            tests: {}
        };

        // Source 1 : TCGdex (Endpoint V2 détaillé)
        const urlTcgdex = `https://api.tcgdex.net/v2/${carte.langue}/cards/${carte.id}`;
        resultatCarte.tests['tcgdex_id'] = await fetchAvecTimeout(urlTcgdex);

        // Source 2 : PokemonTCG.io v2 (Recherche par Nom + Numéro)
        const nomPokemon = carte.nom.split(' ')[0]; // ex: Mew ou Mewtwo
        const queryPtcg = encodeURIComponent(`name:"${nomPokemon}" number:"${carte.numero}"`);
        const urlPtcg = `https://api.pokemontcg.io/v2/cards?q=${queryPtcg}`;
        resultatCarte.tests['pokemontcg_io_nom_numero'] = await fetchAvecTimeout(urlPtcg);

        // Source 3 : TCGdex GitHub Raw (Vérification existence fichier)
        const extClean = carte.extension.toLowerCase().replace(/[^a-z0-9]/g, '');
        const urlRaw = `https://raw.githubusercontent.com/tcgdex/cards-database/master/assets/${carte.langue}/${extClean}/${carte.numero}/high.webp`;
        try {
            const resRaw = await fetch(urlRaw, { method: 'HEAD' });
            resultatCarte.tests['tcgdex_raw_github'] = { statut: resRaw.status, ok: resRaw.ok, url: urlRaw };
        } catch (e) {
            resultatCarte.tests['tcgdex_raw_github'] = { ok: false, erreur: e.message };
        }

        backlog.echantillonsTestes.push(resultatCarte);
    }

    fs.writeFileSync(cheminSortie, JSON.stringify(backlog, null, 2), 'utf8');
    console.log(`\n💾 Audit terminé ! Fichier généré : backlog-audit-apis.json`);
}

sonderAPIs();
