const ODYSSEE_SECTIONS = [
    {
        id: "puzzles-fresques",
        titre: "1. Les Puzzles & Fresques Majeures",
        scenes: [
            {
                id: "nature-galar-9",
                titre: "La Nature de Galar (Fresque 9 cases)",
                extension: "Zénith Suprême (2023)",
                type: "nine",
                description: "Le chef-d'œuvre de Zénith Suprême illustré par Kouki Saitou : 9 cartes Galerie de Galar assemblées pour composer le grand panorama d'une forêt de Galar.",
                cartes: [
                    // Rangée du haut (1 à 3)
                    { nom: "Riolu", numero: "GG26/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG26/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG26_hires.png" },
                    { nom: "Tylton", numero: "GG27/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG27/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG27_hires.png" },
                    { nom: "Skelénox", numero: "GG28/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG28/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG28_hires.png" },
                    // Rangée du milieu (4 à 6)
                    { nom: "Keunotor", numero: "GG29/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG29/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG29_hires.png" },
                    { nom: "Pikachu", numero: "GG30/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG30/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG30_hires.png" },
                    { nom: "Tortipouss", numero: "GG31/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG31/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG31_hires.png" },
                    // Rangée du bas (7 à 9)
                    { nom: "Paras", numero: "GG32/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG32/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG32_hires.png" },
                    { nom: "Medhyèna", numero: "GG33/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG33/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG33_hires.png" },
                    { nom: "Wattouat", numero: "GG34/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG34/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG34_hires.png" }
                ]
            },
            {
                id: "dieux-createurs-gold",
                titre: "Les Dieux Créateurs (Carré 2×2 Gold)",
                extension: "Zénith Suprême (2023)",
                type: "quad",
                description: "Fresque divine d'Akira Egawa : la lumière d'Arceus rayonne depuis le sommet sur Dialga, Palkia et Giratina aux confins de la création.",
                cartes: [
                    { nom: "Arceus VSTAR", numero: "GG70/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG70/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG70_hires.png" },
                    { nom: "Dialga Originel VSTAR", numero: "GG68/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG68/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG68_hires.png" },
                    { nom: "Palkia Originel VSTAR", numero: "GG67/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG67/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG67_hires.png" },
                    { nom: "Giratina VSTAR", numero: "GG69/GG70", image: "https://assets.tcgdex.net/fr/swsh/swsh12.5/GG69/high.webp", fallback: "https://images.pokemontcg.io/swsh12pt5/GG69_hires.png" }
                ]
            },
            {
                id: "mewtwo-vunion",
                titre: "Mewtwo V-UNION (Carré 2×2)",
                extension: "Promos Épée & Bouclier (2021)",
                type: "quad",
                description: "Format V-UNION : 4 cartes s'associent pour révéler l'illustration géante de Mewtwo déchaînant ses pouvoirs télékinétiques.",
                cartes: [
                    { nom: "Mewtwo V-UNION (Haut Gauche)", numero: "SWSH159", image: "https://assets.tcgdex.net/fr/swsh/swshp/SWSH159/high.webp", fallback: "https://images.pokemontcg.io/swshp/SWSH159_hires.png" },
                    { nom: "Mewtwo V-UNION (Haut Droite)", numero: "SWSH160", image: "https://assets.tcgdex.net/fr/swsh/swshp/SWSH160/high.webp", fallback: "https://images.pokemontcg.io/swshp/SWSH160_hires.png" },
                    { nom: "Mewtwo V-UNION (Bas Gauche)", numero: "SWSH161", image: "https://assets.tcgdex.net/fr/swsh/swshp/SWSH161/high.webp", fallback: "https://images.pokemontcg.io/swshp/SWSH161_hires.png" },
                    { nom: "Mewtwo V-UNION (Bas Droite)", numero: "SWSH162", image: "https://assets.tcgdex.net/fr/swsh/swshp/SWSH162/high.webp", fallback: "https://images.pokemontcg.io/swshp/SWSH162_hires.png" }
                ]
            },
            {
                id: "oiseaux-legendaires-promo",
                titre: "Le Trio des Oiseaux Légendaires",
                extension: "Promos Wizards (2000)",
                type: "trio",
                description: "Les trois oiseaux mythiques de Kanto réunis dans un ciel panoramique continu.",
                cartes: [
                    { nom: "Artikodin", numero: "Promo 22", image: "https://assets.tcgdex.net/fr/base/basep/22/high.webp", fallback: "https://images.pokemontcg.io/basep/22_hires.png" },
                    { nom: "Électhor", numero: "Promo 23", image: "https://assets.tcgdex.net/fr/base/basep/23/high.webp", fallback: "https://images.pokemontcg.io/basep/23_hires.png" },
                    { nom: "Sulfura", numero: "Promo 21", image: "https://assets.tcgdex.net/fr/base/basep/21/high.webp", fallback: "https://images.pokemontcg.io/basep/21_hires.png" }
                ]
            }
        ]
    },
    {
        id: "recits-graphiques",
        titre: "2. Les Récits Graphiques (Lignées AR / SAR)",
        scenes: [
            {
                id: "famille-tarsal",
                titre: "Une Vie de Famille",
                extension: "Écarlate & Violet (2023)",
                type: "trio",
                description: "Le récit narratif d'EV01 : Tarsal dans la nouvelle maison avec un jeune couple, Kirlia au fil des naissances, et Gardevoir accompagnant la grand-mère au crépuscule.",
                cartes: [
                    { nom: "Tarsal AR", numero: "211/198", image: "https://assets.tcgdex.net/fr/sv/sv01/211/high.webp", fallback: "https://images.pokemontcg.io/sv1/211_hires.png" },
                    { nom: "Kirlia AR", numero: "212/198", image: "https://assets.tcgdex.net/fr/sv/sv01/212/high.webp", fallback: "https://images.pokemontcg.io/sv1/212_hires.png" },
                    { nom: "Gardevoir ex SAR", numero: "245/198", image: "https://assets.tcgdex.net/fr/sv/sv01/245/high.webp", fallback: "https://images.pokemontcg.io/sv1/245_hires.png" }
                ]
            },
            {
                id: "ascension-salameche-151",
                titre: "L'Ascension du Ciel (Salamèche 151)",
                extension: "Écarlate & Violet : 151 (2023)",
                type: "trio",
                description: "Salamèche contemple le sommet du canyon depuis le sol, Reptincel gravit les parois rocheuses, et Dracaufeu s'envole en maître au-dessus du volcan.",
                cartes: [
                    { nom: "Salamèche AR", numero: "168/165", image: "https://assets.tcgdex.net/fr/sv/sv03.5/168/high.webp", fallback: "https://images.pokemontcg.io/sv3pt5/168_hires.png" },
                    { nom: "Reptincel AR", numero: "169/165", image: "https://assets.tcgdex.net/fr/sv/sv03.5/169/high.webp", fallback: "https://images.pokemontcg.io/sv3pt5/169_hires.png" },
                    { nom: "Dracaufeu ex SAR", numero: "199/165", image: "https://assets.tcgdex.net/fr/sv/sv03.5/199/high.webp", fallback: "https://images.pokemontcg.io/sv3pt5/199_hires.png" }
                ]
            },
            {
                id: "developpeur-porygon",
                titre: "Le Développeur",
                extension: "Faille Paradoxe (2023)",
                type: "trio",
                description: "L'évolution du poste de travail et du code dans la chambre d'un développeur au fil des versions logicielles de Porygon.",
                cartes: [
                    { nom: "Porygon", numero: "142/182", image: "https://assets.tcgdex.net/fr/sv/sv04/142/high.webp", fallback: "https://images.pokemontcg.io/sv4/142_hires.png" },
                    { nom: "Porygon2", numero: "143/182", image: "https://assets.tcgdex.net/fr/sv/sv04/143/high.webp", fallback: "https://images.pokemontcg.io/sv4/143_hires.png" },
                    { nom: "Porygon-Z", numero: "144/182", image: "https://assets.tcgdex.net/fr/sv/sv04/144/high.webp", fallback: "https://images.pokemontcg.io/sv4/144_hires.png" }
                ]
            },
            {
                id: "parcours-vie-gruikui",
                titre: "Le Parcours de Vie",
                extension: "Noir & Blanc : Trésors Légendaires (2013)",
                type: "trio",
                description: "L'enfant rencontre Gruikui, grandit à ses côtés avec Grotichon, et fonde une famille veillée par Roitiflam.",
                cartes: [
                    { nom: "Gruikui", numero: "RC3/RC25", image: "https://assets.tcgdex.net/fr/bw/bw11/RC3/high.webp", fallback: "https://images.pokemontcg.io/bw11/RC3_hires.png" },
                    { nom: "Grotichon", numero: "RC4/RC25", image: "https://assets.tcgdex.net/fr/bw/bw11/RC4/high.webp", fallback: "https://images.pokemontcg.io/bw11/RC4_hires.png" },
                    { nom: "Roitiflam", numero: "RC5/RC25", image: "https://assets.tcgdex.net/fr/bw/bw11/RC5/high.webp", fallback: "https://images.pokemontcg.io/bw11/RC5_hires.png" }
                ]
            }
        ]
    },
    {
        id: "perspectives-champ-contrechamp",
        titre: "3. Les Perspectives Modernes (AR Champ / Contrechamp)",
        scenes: [
            {
                id: "pluie-posipi-negapi",
                titre: "Fenêtre sur la Pluie",
                extension: "Faille Paradoxe (2023)",
                type: "duo",
                description: "Posipi contemple la pluie depuis l'intérieur d'un café chaud, tandis que Négapi le salue depuis le trottoir mouillé.",
                cartes: [
                    { nom: "Posipi AR", numero: "193/182", image: "https://assets.tcgdex.net/fr/sv/sv04/193/high.webp", fallback: "https://images.pokemontcg.io/sv4/193_hires.png" },
                    { nom: "Négapi AR", numero: "194/182", image: "https://assets.tcgdex.net/fr/sv/sv04/194/high.webp", fallback: "https://images.pokemontcg.io/sv4/194_hires.png" }
                ]
            },
            {
                id: "seance-photo-lithia",
                titre: "La Séance Photo",
                extension: "Mascarade Crépusculaire (2024)",
                type: "duo",
                description: "Caninos de Hisui pose fièrement devant l'objectif, tandis que la carte de Lithia montre la photographe en train de capturer la pose.",
                cartes: [
                    { nom: "Caninos de Hisui AR", numero: "181/167", image: "https://assets.tcgdex.net/fr/sv/sv06/181/high.webp", fallback: "https://images.pokemontcg.io/sv6/181_hires.png" },
                    { nom: "Lithia SAR", numero: "220/167", image: "https://assets.tcgdex.net/fr/sv/sv06/220/high.webp", fallback: "https://images.pokemontcg.io/sv6/220_hires.png" }
                ]
            },
            {
                id: "les-saisons-daim",
                titre: "Le Rythme des Saisons",
                extension: "Force Temporelle (2024)",
                type: "duo",
                description: "Le même sanctuaire forestier représenté au printemps sous les cerisiers (Vivaldaim) puis en automne doré (Haydaim).",
                cartes: [
                    { nom: "Vivaldaim AR", numero: "165/162", image: "https://assets.tcgdex.net/fr/sv/sv05/165/high.webp", fallback: "https://images.pokemontcg.io/sv5/165_hires.png" },
                    { nom: "Haydaim AR", numero: "166/162", image: "https://assets.tcgdex.net/fr/sv/sv05/166/high.webp", fallback: "https://images.pokemontcg.io/sv5/166_hires.png" }
                ]
            },
            {
                id: "affrontement-paradoxe",
                titre: "L'Affrontement Temporel",
                extension: "Faille Paradoxe (2023)",
                type: "duo",
                description: "Le duel du passé et du futur : la même arène de combat observée depuis les angles de vue opposés de Mite-de-Fer puis de Rampe-Ailes.",
                cartes: [
                    { nom: "Mite-de-Fer AR", numero: "187/182", image: "https://assets.tcgdex.net/fr/sv/sv04/187/high.webp", fallback: "https://images.pokemontcg.io/sv4/187_hires.png" },
                    { nom: "Rampe-Ailes AR", numero: "203/182", image: "https://assets.tcgdex.net/fr/sv/sv04/203/high.webp", fallback: "https://images.pokemontcg.io/sv4/203_hires.png" }
                ]
            }
        ]
    },
    {
        id: "cartes-legende-hgss",
        titre: "4. Les Cartes LÉGENDE (Ère HeartGold & SoulSilver)",
        scenes: [
            {
                id: "ho-oh-legende",
                titre: "Ho-Oh LÉGENDE",
                extension: "HeartGold SoulSilver (2010)",
                type: "legend",
                description: "L'oiseau arc-en-ciel sacré de Johto déployant ses ailes incandescentes sur deux cartes complémentaires.",
                cartes: [
                    { nom: "Ho-Oh LÉGENDE (Haut)", numero: "111/123", image: "https://assets.tcgdex.net/fr/hgss/hgss1/111/high.webp", fallback: "https://images.pokemontcg.io/hgss1/111_hires.png" },
                    { nom: "Ho-Oh LÉGENDE (Bas)", numero: "112/123", image: "https://assets.tcgdex.net/fr/hgss/hgss1/112/high.webp", fallback: "https://images.pokemontcg.io/hgss1/112_hires.png" }
                ]
            },
            {
                id: "lugia-legende",
                titre: "Lugia LÉGENDE",
                extension: "HeartGold SoulSilver (2010)",
                type: "legend",
                description: "Le gardien des mers émergeant des abysses des Tourb'Îles.",
                cartes: [
                    { nom: "Lugia LÉGENDE (Haut)", numero: "113/123", image: "https://assets.tcgdex.net/fr/hgss/hgss1/113/high.webp", fallback: "https://images.pokemontcg.io/hgss1/113_hires.png" },
                    { nom: "Lugia LÉGENDE (Bas)", numero: "114/123", image: "https://assets.tcgdex.net/fr/hgss/hgss1/114/high.webp", fallback: "https://images.pokemontcg.io/hgss1/114_hires.png" }
                ]
            },
            {
                id: "rayquaza-deoxys-legende",
                titre: "Rayquaza & Deoxys LÉGENDE",
                extension: "HGSS : Indomptable (2010)",
                type: "legend",
                description: "L'affrontement spatial titanesque dans la haute stratosphère entre le dragon d'ozone et le Pokémon d'ADN.",
                cartes: [
                    { nom: "Rayquaza & Deoxys LÉGENDE (Haut)", numero: "89/90", image: "https://assets.tcgdex.net/fr/hgss/hgss3/89/high.webp", fallback: "https://images.pokemontcg.io/hgss3/89_hires.png" },
                    { nom: "Rayquaza & Deoxys LÉGENDE (Bas)", numero: "90/90", image: "https://assets.tcgdex.net/fr/hgss/hgss3/90/high.webp", fallback: "https://images.pokemontcg.io/hgss3/90_hires.png" }
                ]
            }
        ]
    }
];
