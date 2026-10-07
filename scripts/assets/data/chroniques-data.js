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
                    { 
                        nom: "Cheniti Cape Plante", 
                        numero: "45/132", 
                        image: "https://assets.tcgdex.net/fr/dp/dp3/45/high.webp",
                        fallback: "https://images.pokemontcg.io/dp3/45_hires.png"
                    },
                    { 
                        nom: "Cheniti Cape Sable", 
                        numero: "46/132", 
                        image: "https://assets.tcgdex.net/fr/dp/dp3/46/high.webp",
                        fallback: "https://images.pokemontcg.io/dp3/46_hires.png"
                    },
                    { 
                        nom: "Cheniti Cape Déchet", 
                        numero: "47/132", 
                        image: "https://assets.tcgdex.net/fr/dp/dp3/47/high.webp",
                        fallback: "https://images.pokemontcg.io/dp3/47_hires.png"
                    }
                ]
            },
            {
                id: "posipi-negapi-xy",
                titre: "Le Courant Électrique",
                extension: "XY : Poings Furieux (2014)",
                type: "duo",
                description: "Les éclairs projetés par les deux Pokémon se rejoignent parfaitement au centre lorsque les cartes sont réunies.",
                cartes: [
                    { 
                        nom: "Posipi", 
                        numero: "31/111", 
                        image: "https://assets.tcgdex.net/fr/xy/xy3/31/high.webp",
                        fallback: "https://images.pokemontcg.io/xy3/31_hires.png"
                    },
                    { 
                        nom: "Négapi", 
                        numero: "32/111", 
                        image: "https://assets.tcgdex.net/fr/xy/xy3/32/high.webp",
                        fallback: "https://images.pokemontcg.io/xy3/32_hires.png"
                    }
                ]
            },
            {
                id: "seviper-mangriff",
                titre: "Le Face-à-Face",
                extension: "EX : Tempête de Sable (2003)",
                type: "duo",
                description: "Les deux ennemis naturels se font face dans le même désert. L'arrière-plan des deux cartes s'accorde en symétrie.",
                cartes: [
                    { 
                        nom: "Séviper", 
                        numero: "73/100", 
                        image: "https://assets.tcgdex.net/fr/ex/ex2/73/high.webp",
                        fallback: "https://images.pokemontcg.io/ex2/73_hires.png"
                    },
                    { 
                        nom: "Mangriff", 
                        numero: "84/100", 
                        image: "https://assets.tcgdex.net/fr/ex/ex2/84/high.webp",
                        fallback: "https://images.pokemontcg.io/ex2/84_hires.png"
                    }
                ]
            },
            {
                id: "seleroc-solaroc-ex",
                titre: "L'Aura Cosmique",
                extension: "EX : Gardiens de Cristal (2006)",
                type: "duo",
                description: "L'aura d'énergie lunaire et solaire entourant les deux Pokémon se complète une fois les cartes juxtaposées.",
                cartes: [
                    { 
                        nom: "Séléroc", 
                        numero: "37/100", 
                        image: "https://assets.tcgdex.net/fr/ex/ex14/37/high.webp",
                        fallback: "https://images.pokemontcg.io/ex14/37_hires.png"
                    },
                    { 
                        nom: "Solaroc", 
                        numero: "41/100", 
                        image: "https://assets.tcgdex.net/fr/ex/ex14/41/high.webp",
                        fallback: "https://images.pokemontcg.io/ex14/41_hires.png"
                    }
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
                    { 
                        nom: "Miaouss", 
                        numero: "67/108", 
                        image: "https://assets.tcgdex.net/fr/xy/xy6/67/high.webp",
                        fallback: "https://images.pokemontcg.io/xy6/67_hires.png"
                    },
                    { 
                        nom: "Sepiatop", 
                        numero: "45/108", 
                        image: "https://assets.tcgdex.net/fr/xy/xy6/45/high.webp",
                        fallback: "https://images.pokemontcg.io/xy6/45_hires.png"
                    }
                ]
            },
            {
                id: "amitie-ruelle",
                titre: "L'Amitié dans la Ruelle",
                extension: "XY : Rupture Turbo (2016)",
                type: "duo",
                description: "Sur la première carte, Miamiasme est poursuivi. Sur la seconde, on découvre qu'ils sont en réalité en train de jouer ensemble dans la ruelle sombre.",
                cartes: [
                    { 
                        nom: "Miamiasme", 
                        numero: "65/122", 
                        image: "https://assets.tcgdex.net/fr/xy/xy9/65/high.webp",
                        fallback: "https://images.pokemontcg.io/xy9/65_hires.png"
                    },
                    { 
                        nom: "Brocélôme", 
                        numero: "55/122", 
                        image: "https://assets.tcgdex.net/fr/xy/xy9/55/high.webp",
                        fallback: "https://images.pokemontcg.io/xy9/55_hires.png"
                    }
                ]
            },
            {
                id: "bagarre-rue",
                titre: "La Bagarre de Rue",
                extension: "Épée & Bouclier : Clash des Rebelles (2020)",
                type: "duo",
                description: "Caninos aboie agressivement dans la ruelle, tandis que Miamiasme fuit terrifié par ces mêmes aboiements.",
                cartes: [
                    { 
                        nom: "Caninos", 
                        numero: "027/192", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh2/027/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh2/27_hires.png"
                    },
                    { 
                        nom: "Miamiasme", 
                        numero: "117/192", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh2/117/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh2/117_hires.png"
                    }
                ]
            },
            {
                id: "balade-nocturne",
                titre: "La Balade Nocturne",
                extension: "XY : Forces Fantômes (2014)",
                type: "duo",
                description: "Les deux Pokémon errent dans la même allée lugubre et apparaissent mutuellement en arrière-plan de leurs illustrations respectives.",
                cartes: [
                    { 
                        nom: "Statitik", 
                        numero: "26/119", 
                        image: "https://assets.tcgdex.net/fr/xy/xy4/26/high.webp",
                        fallback: "https://images.pokemontcg.io/xy4/26_hires.png"
                    },
                    { 
                        nom: "Pitrouille", 
                        numero: "44/119", 
                        image: "https://assets.tcgdex.net/fr/xy/xy4/44/high.webp",
                        fallback: "https://images.pokemontcg.io/xy4/44_hires.png"
                    }
                ]
            },
            {
                id: "abri-grotte",
                titre: "L'Abri dans la Grotte",
                extension: "Soleil & Lune : Destinées Occultes (2019)",
                type: "duo",
                description: "Les compères de la Team Rocket sont réunis dans la même caverne, la réverbération des torches attestant de leur face-à-face.",
                cartes: [
                    { 
                        nom: "Abo", 
                        numero: "25/68", 
                        image: "https://assets.tcgdex.net/fr/sm/sm115/25/high.webp",
                        fallback: "https://images.pokemontcg.io/sm115/25_hires.png"
                    },
                    { 
                        nom: "Smogo", 
                        numero: "28/68", 
                        image: "https://assets.tcgdex.net/fr/sm/sm115/28/high.webp",
                        fallback: "https://images.pokemontcg.io/sm115/28_hires.png"
                    }
                ]
            },
            {
                id: "rencontre-aquatique",
                titre: "Rencontre Aquatique",
                extension: "XY : Offensive Vapeur (2016)",
                type: "duo",
                description: "Perspective sous-marine contre vue aérienne : Moustillon observe la surface pendant qu'Arakdo patine sur l'onde au même endroit.",
                cartes: [
                    { 
                        nom: "Moustillon", 
                        numero: "30/114", 
                        image: "https://assets.tcgdex.net/fr/xy/xy11/30/high.webp",
                        fallback: "https://images.pokemontcg.io/xy11/30_hires.png"
                    },
                    { 
                        nom: "Arakdo", 
                        numero: "13/114", 
                        image: "https://assets.tcgdex.net/fr/xy/xy11/13/high.webp",
                        fallback: "https://images.pokemontcg.io/xy11/13_hires.png"
                    }
                ]
            },
            {
                id: "blizzard",
                titre: "Le Blizzard",
                extension: "Épée & Bouclier : Règne de Glace (2021)",
                type: "duo",
                description: "Dans une violente tempête de neige, Polagriffe veille sur le jeune Grelaçon, immortalisé sous deux angles de caméra complémentaires.",
                cartes: [
                    { 
                        nom: "Polagriffe", 
                        numero: "043/198", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh6/043/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh6/43_hires.png"
                    },
                    { 
                        nom: "Grelaçon", 
                        numero: "042/198", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh6/042/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh6/42_hires.png"
                    }
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
                    { 
                        nom: "Rongourmand", 
                        numero: "153/202", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh1/153/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh1/153_hires.png"
                    },
                    { 
                        nom: "Rongrigou", 
                        numero: "154/202", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh1/154/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh1/154_hires.png"
                    }
                ]
            },
            {
                id: "voyage-dos",
                titre: "Le Voyage sur le Dos",
                extension: "XY : Ciel Rugissant (2015)",
                type: "duo",
                description: "Frison galope à travers les plaines. Sur la carte de Natu, on découvre que le petit oiseau fait tout le périple installé entre ses cornes.",
                cartes: [
                    { 
                        nom: "Natu", 
                        numero: "28/108", 
                        image: "https://assets.tcgdex.net/fr/xy/xy6/28/high.webp",
                        fallback: "https://images.pokemontcg.io/xy6/28_hires.png"
                    },
                    { 
                        nom: "Frison", 
                        numero: "68/108", 
                        image: "https://assets.tcgdex.net/fr/xy/xy6/68/high.webp",
                        fallback: "https://images.pokemontcg.io/xy6/68_hires.png"
                    }
                ]
            },
            {
                id: "ascension-cotovol",
                titre: "L'Ascension Végétale",
                extension: "Épée & Bouclier : Évolution Céleste (2021)",
                type: "trio",
                description: "L'angle de vue s'élève d'une carte à l'autre : Granivol au ras du sol fleuri, Floravol s'élevant dans la brise, et Cotovol naviguant au sommet des nuages.",
                cartes: [
                    { 
                        nom: "Granivol", 
                        numero: "002/203", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh7/002/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh7/2_hires.png"
                    },
                    { 
                        nom: "Floravol", 
                        numero: "003/203", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh7/003/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh7/3_hires.png"
                    },
                    { 
                        nom: "Cotovol", 
                        numero: "004/203", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh7/004/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh7/4_hires.png"
                    }
                ]
            }
        ]
    }
];
