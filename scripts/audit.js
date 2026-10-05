const fs = require('fs');

const LANGUES = ['fr', 'ja'];
const MOTS_CLES = ['mew', 'mewtwo'];
// Filtres stricts pour exclure les formats non désirés
const SETS_A_EXCLURE = ['wc', 'trainer kit', 'battle academy', 'championnat du monde'];

// Temporisation pour ne pas surcharger l'API
async function fetchAvecDelai(url, delai = 150) {
    await new Promise(resolve => setTimeout(resolve, delai));
    const reponse = await fetch(url);
    if (!reponse.ok) throw new Error(`Erreur HTTP: ${reponse.status}`);
    return reponse.json();
}

async function lancerAudit() {
    console.log("🚀 Démarrage de l'audit TCGdex...");
    let resultats = [];
    let anomalies = [];

    for (const langue of LANGUES) {
        console.log(`\n📥 Récupération du catalogue global [${langue.toUpperCase()}]...`);
        const listeGlobale = await fetchAvecDelai(`https://api.tcgdex.net/v2/${langue}/cards`);
        
        // Ciblage de Mew et Mewtwo
        const cartesCibles = listeGlobale.filter(c => 
            MOTS_CLES.some(mot => c.name.toLowerCase().includes(mot))
        );
        
        console.log(`🔍 ${cartesCibles.length} cartes trouvées pour ${langue.toUpperCase()}. Analyse détaillée...`);

        // Analyse individuelle pour récupérer l'année, l'extension et filtrer
        for (let i = 0; i < cartesCibles.length; i++) {
            const carteBrief = cartesCibles[i];
            process.stdout.write(`⏳ Analyse ${i + 1}/${cartesCibles.length} : ${carteBrief.id}...\r`);
            
            try {
                const details = await fetchAvecDelai(`https://api.tcgdex.net/v2/${langue}/cards/${carteBrief.id}`);
                
                const nomMinuscule = details.name.toLowerCase();
                const pokemonType = nomMinuscule.includes('mewtwo') ? 'mewtwo' : 'mew';
                
                const nomSet = details.set.name.toLowerCase();
                const idSet = details.set.id.toLowerCase();
                
                let estExclu = false;
                let raisonExclusion = "";

                if (SETS_A_EXCLURE.some(mot => nomSet.includes(mot) || idSet.includes(mot))) {
                    estExclu = true;
                    raisonExclusion = "Set non autorisé (World Championship / Initiation)";
                }
                
                if (nomMinuscule.includes('jumbo') || nomMinuscule.includes('oversized') || nomSet.includes('jumbo')) {
                    estExclu = true;
                    raisonExclusion = "Format Jumbo";
                }

                const anneeSortie = details.set.releaseDate ? details.set.releaseDate.substring(0, 4) : "Inconnue";

                const donneeCarte = {
                    id: details.id,
                    pokemon: pokemonType,
                    langue: langue,
                    nom: details.name,
                    numero: details.localId,
                    extension: details.set.name,
                    annee: anneeSortie,
                    image: details.image ? `${details.image}/high.webp` : null
                };

                if (estExclu) {
                    anomalies.push({ ...donneeCarte, raison: raisonExclusion });
                } else {
                    resultats.push(donneeCarte);
                }

            } catch (erreur) {
                anomalies.push({ id: carteBrief.id, erreur: erreur.message });
            }
        }
    }

    // Tri chronologique
    resultats.sort((a, b) => {
        const dateA = a.annee === "Inconnue" ? "9999" : a.annee;
        const dateB = b.annee === "Inconnue" ? "9999" : b.annee;
        return dateA.localeCompare(dateB);
    });

    console.log("\n\n✅ Analyse terminée !");
    console.log(`📊 Cartes valides retenues : ${resultats.length}`);
    console.log(`⚠️ Cartes exclues ou problématiques : ${anomalies.length}`);

    fs.writeFileSync('audit-resultats.json', JSON.stringify(resultats, null, 4));
    fs.writeFileSync('audit-anomalies.json', JSON.stringify(anomalies, null, 4));

    console.log("💾 'audit-resultats.json' et 'audit-anomalies.json' ont été générés à la racine.");
}

lancerAudit();