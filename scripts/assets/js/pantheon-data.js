/* ====================================================================
   MEWTHOLOGY - BASE DE DONNÉES DU PANTHÉON
   Fichier : scripts/assets/js/pantheon-data.js
   Description : Items scellés (avec balise de tri #XX#) & Cartes gradées 3D
==================================================================== */

const pantheonDatabase = {
    // ----------------------------------------------------------------
    // 1. ITEMS SCELLÉS (Le tag #XX# définit l'ordre d'apparition)
    // ----------------------------------------------------------------
    scelles: [
        {
            id: "scelle-etb-paldea",
            nom: "#01# Coffret Dresseur D'Élite (ETB)",
            extension: "Destinées de Paldéa (EV 4.5)",
            annee: 2024,
            langue: "fr",
            image: "./scripts/assets/img/etb-pal.png"
        },
        {
            id: "scelle-artset-blister",
            nom: "#02# Blister (Art-set)",
            extension: "Étincelles Déferlantes (EV 8)",
            annee: 2024,
            langue: "fr",
            image: "./scripts/assets/img/artset-blister.png"
        },
        {
            id: "scelle-etb-ave",
            nom: "#03# Coffret Dresseur D'Élite (ETB)",
            extension: "Aventures Ensemble (EV 9)",
            annee: 2025,
            langue: "fr",
            image: "./scripts/assets/img/etb-ave.png"
        },
        {
            id: "scelle-coffret-jour",
            nom: "#05# Coffret Journée Pokémon 2026",
            extension: "Collection Anniversaire 30 ans",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/coffret-jour.png"
        },
        {
            id: "scelle-etb-30",
            nom: "#06# Coffret Dresseur D'Élite (ETB)",
            extension: "Collection Anniversaire 30 ans",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/etb-30.png"
        },
        {
            id: "scelle-coffret-cla",
            nom: "#10# Coffret Classeur",
            extension: "Collection Anniversaire 30 ans",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/coffret-cla.png"
        },
        {
            id: "scelle-tin-mew",
            nom: "#08# Mini-Tin<br>Illustration Mew Jour",
            extension: "Collection Anniversaire 30 ans",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/tin-mew.png"
        },
        {
            id: "scelle-tin-mewtwo",
            nom: "#09# Mini-Tin<br>Illustration Mewtwo Nuit",
            extension: "Collection Anniversaire 30 ans",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/tin-mewtwo.png"
        },
        {
            id: "scelle-bundle-30",
            nom: "#07# Coffret Bundle",
            extension: "Collection Anniversaire 30 ans",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/bundle-30.jpg"
        },
        {
            id: "scelle-etb-rivalites",
            nom: "#04# Coffret Dresseur D'Élite (ETB)",
            extension: "Rivalités Destinées",
            annee: 2025,
            langue: "fr",
            image: "./scripts/assets/img/etb-riv.png"
        },
        {
            id: "scelle-coffret-mew-ex",
            nom: "#11# Coffret Mew ex",
            extension: "À PRÉCISER",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/coffret-mew.png" 
        },
        {
            id: "scelle-coffret-metamorphe",
            nom: "#12# Coffret Métamorphe",
            extension: "À PRÉCISER",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/coffret-met.png" 
        },
        {
            id: "scelle-etb-regne-delta",
            nom: "#13# Coffret Dresseur D'Élite (ETB)",
            extension: "Règne delta (ME 06)",
            annee: 2026,
            langue: "fr",
            image: "./scripts/assets/img/etb-reg.png"
        }
    ],

    // ----------------------------------------------------------------
    // 2. CARTES GRADÉES (Double face & retournement tactile / survol)
    // ----------------------------------------------------------------
    gradees: [
        {
            id: "gradee-mew-babanuki",
            nom: "Mew",
            extension: "Babanuki Old Maid",
            numero: "Sans numéro",
            annee: 2019,
            langue: "ja",
            societe: "CollectAura",
            note: "10 Gem Mint",
            imageFront: "./scripts/assets/img/mew-baba-01.png",
            imageBack: "./scripts/assets/img/mew-baba-02.png"
        },
        {
            id: "gradee-pika-vmax",
            nom: "Surfing Pikachu VMAX",
            extension: "25th Anniversary Collection",
            numero: "022/028",
            annee: 2021,
            langue: "ja",
            societe: "CollectAura",
            note: "9.5 Mint+",
            imageFront: "./scripts/assets/img/pika-vmax-01.png",
            imageBack: "./scripts/assets/img/pika-vmax-02.png"
        },
        {
            id: "gradee-mewtwo-vstar",
            nom: "Mewtwo VSTAR",
            extension: "VSTAR Universe",
            numero: "051/172",
            annee: 2022,
            langue: "ja",
            societe: "CollectAura",
            note: "9.5 Mint+",
            imageFront: "./scripts/assets/img/mewtwo-vstar-01.png",
            imageBack: "./scripts/assets/img/mewtwo-vstar-02.png"
        },
        {
            id: "gradee-gastly-ar",
            nom: "Gastly (AR)",
            extension: "Wild Force",
            numero: "080/071",
            annee: 2024,
            langue: "ja",
            societe: "AFG",
            note: "9.5 Mint",
            imageFront: "./scripts/assets/img/gastly-01.png",
            imageBack: "./scripts/assets/img/gastly-02.png"
        }
    ]
};
