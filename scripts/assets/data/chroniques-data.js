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
                description: "Les trois cartes communes, placées côte à côte, forment une seule et même branche d'arbre en panorama continu.",
                cartes: [
                    { 
                        nom: "Cheniti Cape Plante", 
                        numero: "78/132", 
                        image: "https://assets.tcgdex.net/fr/dp/dp3/78/high.webp",
                        fallback: "https://images.pokemontcg.io/dp3/78_hires.png"
                    },
                    { 
                        nom: "Cheniti Cape Sable", 
                        numero: "79/132", 
                        image: "https://assets.tcgdex.net/fr/dp/dp3/79/high.webp",
                        fallback: "https://images.pokemontcg.io/dp3/79_hires.png"
                    },
                    { 
                        nom: "Cheniti Cape Déchet", 
                        numero: "80/132", 
                        image: "https://assets.tcgdex.net/fr/dp/dp3/80/high.webp",
                        fallback: "https://images.pokemontcg.io/dp3/80_hires.png"
                    }
                ]
            },
            {
                id: "posipi-negapi-xy",
                titre: "Le Courant Électrique",
                extension: "XY : Poings Furieux (2014)",
                type: "duo",
                description: "Les arcs électriques projetés par Posipi (vers la droite) et Négapi (vers la gauche) se connectent parfaitement au centre.",
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
                description: "Les deux ennemis jurés se toisent dans le même canyon désertique. Leurs postures et le décor rocheux se répondent en miroir.",
                cartes: [
                    { 
                        nom: "Séviper", 
                        numero: "73/100", 
                        image: "https://assets.tcgdex.net/fr/ex/ex2/73/high.webp",
                        fallback: "https://images.pokemontcg.io/ex2/73_hires.png"
                    },
                    { 
                        nom: "Mangriff", 
                        numero: "27/100", 
                        image: "https://assets.tcgdex.net/fr/ex/ex2/27/high.webp",
                        fallback: "https://images.pokemontcg.io/ex2/27_hires.png"
                    }
                ]
            },
            {
                id: "seleroc-solaroc",
                titre: "L'Aura Cosmique",
                extension: "Soleil & Lune : Éclipse Cosmique (2019)",
                type: "duo",
                description: "L'aura d'énergie lunaire et solaire entourant les deux Pokémon s'assemble pour former un cercle complet une fois les cartes réunies.",
                cartes: [
                    { 
                        nom: "Séléroc", 
                        numero: "104/236", 
                        image: "https://assets.tcgdex.net/fr/sm/sm12/104/high.webp",
                        fallback: "https://images.pokemontcg.io/sm12/104_hires.png"
                    },
                    { 
                        nom: "Solaroc", 
                        numero: "105/236", 
                        image: "https://assets.tcgdex.net/fr/sm/sm12/105/high.webp",
                        fallback: "https://images.pokemontcg.io/sm12/105_hires.png"
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
                description: "Champ / Contrechamp : Miaouss poursuit en hurlant Sepiatop qui s'enfuit avec sa baie. Sepiatop montre la fuite vue de face.",
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
                description: "Même ruelle sombre : sur la première carte, Miamiasme semble pourchassé. Sur la seconde, on découvre qu'ils jouent en fait ensemble.",
                cartes: [
                    { 
                        nom: "Brocélôme", 
                        numero: "55/122", 
                        image: "https://assets.tcgdex.net/fr/xy/xy9/55/high.webp",
                        fallback: "https://images.pokemontcg.io/xy9/55_hires.png"
                    },
                    { 
                        nom: "Miamiasme", 
                        numero: "56/122", 
                        image: "https://assets.tcgdex.net/fr/xy/xy9/56/high.webp",
                        fallback: "https://images.pokemontcg.io/xy9/56_hires.png"
                    }
                ]
            },
            {
                id: "bagarre-rue",
                titre: "La Bagarre de Rue",
                extension: "Épée & Bouclier : Clash des Rebelles (2020)",
                type: "duo",
                description: "Dans la même rue pavée, Caninos aboie violemment vers la droite, tandis que Miamiasme fuit terrorisé vers la gauche.",
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
                description: "Dans le même sous-bois violet, les deux spectres apparaissent mutuellement au second plan de leurs illustrations respectives.",
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
                description: "Les deux fidèles de la Team Rocket réfugiés dans la même caverne, éclairés par la même torche vacillante.",
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
                description: "Double perspective : Moustillon nage sous l'eau et observe la surface, où Arakdo glisse sur l'onde au même moment.",
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
                description: "Dans une tempête de glace polaire, Polagriffe veille sur le jeune Grelaçon, visible sous deux angles de vue opposés.",
                cartes: [
                    { 
                        nom: "Polagriffe", 
                        numero: "043/198", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh6/043/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh6/43_hires.png"
                    },
                    { 
                        nom: "Grelaçon", 
                        numero: "044/198", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh6/044/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh6/44_hires.png"
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
                description: "Séquence narrative : Rongourmand stocke ses baies dans l'arbre. Sur Rongrigou, la branche a cédé sous son poids et il s'écrase par terre.",
                cartes: [
                    { 
                        nom: "Rongourmand", 
                        numero: "151/202", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh1/151/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh1/151_hires.png"
                    },
                    { 
                        nom: "Rongrigou", 
                        numero: "152/202", 
                        image: "https://assets.tcgdex.net/fr/swsh/swsh1/152/high.webp",
                        fallback: "https://images.pokemontcg.io/swsh1/152_hires.png"
                    }
                ]
            },
            {
                id: "voyage-dos",
                titre: "Le Voyage sur le Dos",
                extension: "XY : Ciel Rugissant (2015)",
                type: "duo",
                description: "Frison galope à travers les steppes. Sur la carte de Natu, on découvre que l'oisillon voyage perché entre ses cornes.",
                cartes: [
                    { 
                        nom: "Natu", 
                        numero: "28/108", 
                        image: "https://assets.tcgdex.net/fr/xy/xy6/28/high.webp",
                        fallback: "https://images.pokemontcg.io/xy6/28_hires.png"
                    },
                    { 
                        nom: "Frison", 
                        numero: "83/108", 
                        image: "https://assets.tcgdex.net/fr/xy/xy6/83/high.webp",
                        fallback: "https://images.pokemontcg.io/xy6/83_hires.png"
                    }
                ]
            },
            {
                id: "ascension-cotovol",
                titre: "L'Ascension Végétale",
                extension: "Épée & Bouclier : Évolution Céleste (2021)",
                type: "trio",
                description: "Élévation progressive de la caméra : Granivol est au ras de la prairie, Floravol s'élève au-dessus des collines, et Cotovol plane au milieu des nuages.",
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
