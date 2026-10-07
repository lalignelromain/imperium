const CHRONIQUES_SECTIONS = [
    {
        id: "fresques-continues",
        titre: "1. Les Fresques Continues",
        scenes: [
            {
                id: "cheniti-trio",
                titre: "La Branche des Cheniti",
                extension: "Diamant & Perle : Merveilles Secrètes (2007)",
                type: "trio",
                description: "Les trois cartes communes, placées côte à côte, forment une seule et même branche d'arbre en panorama.",
                cartes: [
                    { nom: "Cheniti Cape Plante", numero: "45/132", image: "./scripts/assets/img/chroniques/cheniti-45.png" },
                    { nom: "Cheniti Cape Sable", numero: "46/132", image: "./scripts/assets/img/chroniques/cheniti-46.png" },
                    { nom: "Cheniti Cape Déchet", numero: "47/132", image: "./scripts/assets/img/chroniques/cheniti-47.png" }
                ]
            },
            {
                id: "posipi-negapi-xy",
                titre: "Le Courant Électrique",
                extension: "XY : Poings Furieux (2014)",
                type: "duo",
                description: "Les éclairs projetés par les deux Pokémon se rejoignent parfaitement au centre lorsque les cartes sont réunies.",
                cartes: [
                    { nom: "Posipi", numero: "31/111", image: "./scripts/assets/img/chroniques/posipi-31.png" },
                    { nom: "Négapi", numero: "32/111", image: "./scripts/assets/img/chroniques/negapi-32.png" }
                ]
            },
            {
                id: "seviper-mangriff",
                titre: "Le Face-à-Face",
                extension: "EX : Tempête de Sable (2003)",
                type: "duo",
                description: "Les deux ennemis naturels se font face dans le même désert. L'arrière-plan des deux cartes s'accorde en symétrie.",
                cartes: [
                    { nom: "Séviper", numero: "73/100", image: "./scripts/assets/img/chroniques/seviper-73.png" },
                    { nom: "Mangriff", numero: "84/100", image: "./scripts/assets/img/chroniques/mangriff-84.png" }
                ]
            },
            {
                id: "seleroc-solaroc-ex",
                titre: "L'Aura Cosmique",
                extension: "EX : Gardiens de Cristal (2006)",
                type: "duo",
                description: "L'aura d'énergie lunaire et solaire entourant les deux Pokémon se complète une fois les cartes juxtaposées.",
                cartes: [
                    { nom: "Séléroc", numero: "37/100", image: "./scripts/assets/img/chroniques/seleroc-37.png" },
                    { nom: "Solaroc", numero: "41/100", image: "./scripts/assets/img/chroniques/solaroc-41.png" }
                ]
            }
        ]
    },
    {
        id: "scenes-partagees",
        titre: "2. Les Scènes Partagées & Angles Opposés",
        scenes: [
            {
                id: "vol-de-baie",
                titre: "Le Vol de la Baie",
                extension: "XY : Ciel Rugissant (2015)",
                type: "duo",
                description: "Miaouss poursuit avec colère Sepiatop qui vient de lui dérober sa baie. La carte Sepiatop montre la même course-poursuite vue de face.",
                cartes: [
                    { nom: "Miaouss", numero: "67/108", image: "./scripts/assets/img/chroniques/miaouss-67.png" },
                    { nom: "Sepiatop", numero: "45/108", image: "./scripts/assets/img/chroniques/sepiatop-45.png" }
                ]
            },
            {
                id: "amitie-ruelle",
                titre: "L'Amitié dans la Ruelle",
                extension: "XY : Rupture Turbo (2016)",
                type: "duo",
                description: "Sur la première carte, Miamiasme est poursuivi. Sur la seconde, on découvre qu'ils sont en réalité en train de jouer ensemble dans la ruelle sombre.",
                cartes: [
                    { nom: "Miamiasme", numero: "65/122", image: "./scripts/assets/img/chroniques/miamiasme-65.png" },
                    { nom: "Brocélôme", numero: "55/122", image: "./scripts/assets/img/chroniques/brocelome-55.png" }
                ]
            },
            {
                id: "bagarre-rue",
                titre: "La Bagarre de Rue",
                extension: "Épée & Bouclier : Clash des Rebelles (2020)",
                type: "duo",
                description: "Caninos aboie agressivement dans la ruelle, tandis que Miamiasme fuit terrifié par ces mêmes aboiements.",
                cartes: [
                    { nom: "Caninos", numero: "027/192", image: "./scripts/assets/img/chroniques/caninos-027.png" },
                    { nom: "Miamiasme", numero: "117/192", image: "./scripts/assets/img/chroniques/miamiasme-117.png" }
                ]
            },
            {
                id: "balade-nocturne",
                titre: "La Balade Nocturne",
                extension: "XY : Forces Fantômes (2014)",
                type: "duo",
                description: "Les deux Pokémon errent dans la même allée lugubre et apparaissent mutuellement en arrière-plan de leurs illustrations respectives.",
                cartes: [
                    { nom: "Statitik", numero: "26/119", image: "./scripts/assets/img/chroniques/statitik-26.png" },
                    { nom: "Pitrouille", numero: "44/119", image: "./scripts/assets/img/chroniques/pitrouille-44.png" }
                ]
            },
            {
                id: "abri-grotte",
                titre: "L'Abri dans la Grotte",
                extension: "Soleil & Lune : Destinées Occultes (2019)",
                type: "duo",
                description: "Les compères de la Team Rocket sont réunis dans la même caverne, la réverbération des torches attestant de leur face-à-face.",
                cartes: [
                    { nom: "Abo", numero: "25/68", image: "./scripts/assets/img/chroniques/abo-25.png" },
                    { nom: "Smogo", numero: "28/68", image: "./scripts/assets/img/chroniques/smogo-28.png" }
                ]
            },
            {
                id: "rencontre-aquatique",
                titre: "Rencontre Aquatique",
                extension: "XY : Offensive Vapeur (2016)",
                type: "duo",
                description: "Perspective sous-marine contre vue aérienne : Moustillon observe la surface pendant qu'Arakdo patine sur l'onde au même endroit.",
                cartes: [
                    { nom: "Moustillon", numero: "30/114", image: "./scripts/assets/img/chroniques/moustillon-30.png" },
                    { nom: "Arakdo", numero: "13/114", image: "./scripts/assets/img/chroniques/arakdo-13.png" }
                ]
            },
            {
                id: "blizzard",
                titre: "Le Blizzard",
                extension: "Épée & Bouclier : Règne de Glace (2021)",
                type: "duo",
                description: "Dans une violente tempête de neige, Polagriffe veille sur le jeune Grelaçon, immortalisé sous deux angles de caméra complémentaires.",
                cartes: [
                    { nom: "Polagriffe", numero: "043/198", image: "./scripts/assets/img/chroniques/polagriffe-043.png" },
                    { nom: "Grelaçon", numero: "042/198", image: "./scripts/assets/img/chroniques/grelacon-042.png" }
                ]
            }
        ]
    },
    {
        id: "actions-continues",
        titre: "3. L'Action Continue & Chronologie",
        scenes: [
            {
                id: "chute-baies",
                titre: "La Chute des Baies",
                extension: "Épée & Bouclier : Set de Base (2020)",
                type: "duo",
                description: "Rongourmand accumule des baies dans sa réserve. Sur l'illustration de son évolution, la branche rompt sous son excès de poids.",
                cartes: [
                    { nom: "Rongourmand", numero: "153/202", image: "./scripts/assets/img/chroniques/rongourmand-153.png" },
                    { nom: "Rongrigou", numero: "154/202", image: "./scripts/assets/img/chroniques/rongrigou-154.png" }
                ]
            },
            {
                id: "voyage-dos",
                titre: "Le Voyage sur le Dos",
                extension: "XY : Ciel Rugissant (2015)",
                type: "duo",
                description: "Frison galope à travers les plaines. Sur la carte de Natu, on découvre que le petit oiseau fait tout le périple installé entre ses cornes.",
                cartes: [
                    { nom: "Natu", numero: "28/108", image: "./scripts/assets/img/chroniques/natu-28.png" },
                    { nom: "Frison", numero: "68/108", image: "./scripts/assets/img/chroniques/frison-68.png" }
                ]
            },
            {
                id: "ascension-cotovol",
                titre: "L'Ascension Végétale",
                extension: "Épée & Bouclier : Évolution Céleste (2021)",
                type: "trio",
                description: "L'angle de vue s'élève d'une carte à l'autre : Granivol au ras du sol fleuri, Floravol s'élevant dans la brise, et Cotovol naviguant au sommet des nuages.",
                cartes: [
                    { nom: "Granivol", numero: "002/203", image: "./scripts/assets/img/chroniques/granivol-002.png" },
                    { nom: "Floravol", numero: "003/203", image: "./scripts/assets/img/chroniques/floravol-003.png" },
                    { nom: "Cotovol", numero: "004/203", image: "./scripts/assets/img/chroniques/cotovol-004.png" }
                ]
            }
        ]
    }
];
