import fs from 'fs';
import path from 'path';

const CONFIG = {
    mew: {
        category: "Catégorie:Carte_Pokémon_représentant_Mew",
        outputJson: "cards_mew.json",
        imgDir: "./assets/cards/mew"
    },
    mewtwo: {
        category: "Catégorie:Carte_Pokémon_représentant_Mewtwo",
        outputJson: "cards_mewtwo.json",
        imgDir: "./assets/cards/mewtwo"
    }
};

// Expressions régulières pour filtrer les exclusivités JP et les cartes Pocket
const JAPANESE_CHARACTERS = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/;
const EXCLUDED_SETS = ["Puissance Génétique", "L'Île Fabuleuse", "Booster de Luxe ex"];

async function fetchCategoryMembers(categoryTitle) {
    const url = `https://www.pokepedia.fr/api.php?action=query&list=categorymembers&cmtitle=${encodeURIComponent(categoryTitle)}&cmlimit=500&cmtype=page&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    return data.query?.categorymembers || [];
}

async function fetchCardDetails(pageTitle) {
    // Récupération de l'image principale de la page via MediaWiki
    const url = `https://www.pokepedia.fr/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages|images&piprop=original&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query?.pages || {};
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    return {
        imageUrl: page?.original?.source || null
    };
}

function parseCardTitle(title) {
    // Format Poképédia standard : "Nom (Extension Numéro)"
    // Ex: "Mew-ex (Écarlate et Violet 151 151)" ou "Mew (Expedition 19)"
    const match = title.match(/^(.*?)\s*\((.*?)\)$/);
    if (!match) return { nom: title, extension: "Inconnue", numero: "" };

    const nom = match[1].trim();
    const info = match[2].trim();
    
    // Découpage du bloc parenthèses en Extension et Numéro
    const parts = info.split(' ');
    const numero = parts.pop(); // Dernier élément : souvent le numéro (ex: 151, GG10, Promo)
    const extension = parts.join(' ');

    return { nom, extension, numero };
}

async function runExtraction(targetKey) {
    const target = CONFIG[targetKey];
    console.log(`\n--- Début extraction : ${targetKey.toUpperCase()} ---`);
    
    if (!fs.existsSync(target.imgDir)) {
        fs.mkdirSync(target.imgDir, { recursive: true });
    }

    const members = await fetchCategoryMembers(target.category);
    console.log(`${members.length} pages trouvées dans la catégorie.`);

    const cleanedCards = [];

    for (const member of members) {
        const title = member.title;

        // 1. Filtre les exclusivités japonaises
        if (JAPANESE_CHARACTERS.test(title)) {
            console.log(`[IGNORÉ - JP] ${title}`);
            continue;
        }

        // 2. Filtre le jeu mobile Pocket
        if (EXCLUDED_SETS.some(set => title.includes(set))) {
            console.log(`[IGNORÉ - Pocket] ${title}`);
            continue;
        }

        const { nom, extension, numero } = parseCardTitle(title);
        const { imageUrl } = await fetchCardDetails(title);

        const cardEntry = {
            id: `${targetKey}-${extension.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${numero.replace(/[^a-z0-9]/g, '-')}`,
            nom: nom,
            extension: extension || "Série Spéciale",
            numero: numero || "Promo", // Garanti sans '#'
            imageFr: imageUrl || "",
            imageJp: "", // Réservé pour la bascule JP
            owned: false,
            langue: "fr"
        };

        cleanedCards.push(cardEntry);
        console.log(`[AJOUTÉ] ${nom} | ${extension} | ${numero}`);

        // Temporisation de politesse pour l'API (100ms)
        await new Promise(r => setTimeout(r, 100));
    }

    fs.writeFileSync(target.outputJson, JSON.stringify(cleanedCards, null, 2), 'utf-8');
    console.log(`\nSuccès : ${cleanedCards.length} cartes exportées dans ${target.outputJson}`);
}

// Lancement pour Mew puis Mewtwo
async function main() {
    await runExtraction('mew');
    await runExtraction('mewtwo');
}

main();
