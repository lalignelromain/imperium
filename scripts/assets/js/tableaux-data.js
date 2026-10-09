/* ====================================================================
   MEWTHOLOGY — BASE DE DONNÉES DES TABLEAUX (ODYSSÉE & CHRONIQUES)
==================================================================== */

// 1. ODYSSÉE : FRESQUES PANORAMIQUES & PUZZLES VISUELS
const odysseeDatabase = [
  {
    id: "zenith-galar-9",
    titre: "La Nature de Galar",
    extension: "Zénith Suprême",
    format: "nine-box",
    desc: "Les 9 cartes s'assemblent pour former un panorama forestier continu.",
    cartes: [
      { id: "riolu-gg", nom: "Riolu", extension: "Zénith Suprême", num: "GG47", file: "zenith-riolu.png" },
      { id: "tylton-gg", nom: "Tylton", extension: "Zénith Suprême", num: "GG48", file: "zenith-tylton.png" },
      { id: "amagara-gg", nom: "Amagara", extension: "Zénith Suprême", num: "GG49", file: "zenith-amagara.png" },
      { id: "pikachu-gg", nom: "Pikachu", extension: "Zénith Suprême", num: "GG50", file: "zenith-pikachu.png" },
      { id: "tortipouss-gg", nom: "Tortipouss", extension: "Zénith Suprême", num: "GG51", file: "zenith-tortipouss.png" },
      { id: "laporeille-gg", nom: "Laporeille", extension: "Zénith Suprême", num: "GG52", file: "zenith-laporeille.png" },
      { id: "manglouton-gg", nom: "Manglouton", extension: "Zénith Suprême", num: "GG53", file: "zenith-manglouton.png" },
      { id: "keunotor-gg", nom: "Keunotor", extension: "Zénith Suprême", num: "GG54", file: "zenith-keunotor.png" },
      { id: "brindibou-gg", nom: "Brindibou", extension: "Zénith Suprême", num: "GG55", file: "zenith-brindibou.png" }
    ]
  },
  {
    id: "dieux-createurs-quad",
    titre: "Les Dieux Créateurs",
    extension: "Zénith Suprême",
    format: "quad",
    desc: "Fresque cosmique de 4 cartes Secrètes Gold.",
    cartes: [
      { id: "palkia-gg67", nom: "Palkia Originel VSTAR", extension: "Zénith Suprême", num: "GG67", file: "palkia-gg67.png" },
      { id: "dialga-gg68", nom: "Dialga Originel VSTAR", extension: "Zénith Suprême", num: "GG68", file: "dialga-gg68.png" },
      { id: "giratina-gg69", nom: "Giratina VSTAR", extension: "Zénith Suprême", num: "GG69", file: "giratina-gg69.png" },
      { id: "arceus-gg70", nom: "Arceus VSTAR", extension: "Zénith Suprême", num: "GG70", file: "arceus-gg70.png" }
    ]
  },
  {
    id: "oiseaux-legendaires-trio",
    titre: "Trio des Oiseaux",
    extension: "Promo Black Star",
    format: "trio",
    desc: "Les trois cartes placées côte à côte partagent le même ciel.",
    cartes: [
      { id: "sulfura-p21", nom: "Sulfura", extension: "Promo", num: "21", file: "sulfura-p21.png" },
      { id: "artikodin-p22", nom: "Artikodin", extension: "Promo", num: "22", file: "artikodin-p22.png" },
      { id: "electhor-p23", nom: "Électhor", extension: "Promo", num: "23", file: "electhor-p23.png" }
    ]
  },
  {
    id: "deoxys-formes-quad",
    titre: "Les 4 Formes de Deoxys",
    extension: "Aube Majestueuse",
    format: "quad",
    desc: "Les halos spatiaux se prolongent d'une carte à l'autre.",
    cartes: [
      { id: "deoxys-1", nom: "Deoxys", extension: "Aube Majestueuse", num: "1", file: "deoxys-normal-1.png" },
      { id: "deoxys-2", nom: "Deoxys", extension: "Aube Majestueuse", num: "2", file: "deoxys-attaque-2.png" },
      { id: "deoxys-3", nom: "Deoxys", extension: "Aube Majestueuse", num: "3", file: "deoxys-defense-3.png" },
      { id: "deoxys-4", nom: "Deoxys", extension: "Aube Majestueuse", num: "4", file: "deoxys-vitesse-4.png" }
    ]
  },
  {
    id: "cheniti-branche-trio",
    titre: "La Branche des Cheniti",
    extension: "Merveilles Secrètes",
    format: "trio",
    desc: "Les trois cartes forment une seule branche d'arbre en panorama.",
    cartes: [
      { id: "cheniti-45", nom: "Cheniti Cape Plante", extension: "Merveilles Secrètes", num: "45", file: "cheniti-plante-45.png" },
      { id: "cheniti-46", nom: "Cheniti Cape Sable", extension: "Merveilles Secrètes", num: "46", file: "cheniti-sable-46.png" },
      { id: "cheniti-47", nom: "Cheniti Cape Déchet", extension: "Merveilles Secrètes", num: "47", file: "cheniti-dechet-47.png" }
    ]
  },
  {
    id: "posipi-negapi-eclairs",
    titre: "Le Courant Électrique",
    extension: "Poings Furieux",
    format: "duo",
    desc: "Les éclairs projetés se rejoignent parfaitement au centre.",
    cartes: [
      { id: "posipi-xy3-31", nom: "Posipi", extension: "Poings Furieux", num: "31", file: "posipi-xy3-31.png" },
      { id: "negapi-xy3-32", nom: "Négapi", extension: "Poings Furieux", num: "32", file: "negapi-xy3-32.png" }
    ]
  },
  {
    id: "seviper-mangriff-face",
    titre: "Le Face-à-Face",
    extension: "Tempête de Sable",
    format: "duo",
    desc: "Les deux ennemis naturels se font face dans le même désert.",
    cartes: [
      { id: "seviper-ex2-73", nom: "Séviper", extension: "Tempête de Sable", num: "73", file: "seviper-ex2-73.png" },
      { id: "mangriff-ex2-84", nom: "Mangriff", extension: "Tempête de Sable", num: "84", file: "mangriff-ex2-84.png" }
    ]
  },
  {
    id: "seleroc-solaroc-aura",
    titre: "L'Aura Cosmique",
    extension: "Gardiens de Cristal",
    format: "duo",
    desc: "L'aura d'énergie qui entoure les deux Pokémon se complète.",
    cartes: [
      { id: "seleroc-ex14-37", nom: "Séléroc", extension: "Gardiens de Cristal", num: "37", file: "seleroc-ex14-37.png" },
      { id: "solaroc-ex14-41", nom: "Solaroc", extension: "Gardiens de Cristal", num: "41", file: "solaroc-ex14-41.png" }
    ]
  },
  {
    id: "double-crise-duo",
    titre: "Double Crise",
    extension: "Double Danger",
    format: "duo",
    desc: "Leurs attaques élémentaires se heurtent au centre.",
    cartes: [
      { id: "kyogre-dc1-14", nom: "Kyogre de la Team Aqua", extension: "Double Danger", num: "14", file: "kyogre-dc1-14.png" },
      { id: "groudon-dc1-15", nom: "Groudon de la Team Magma", extension: "Double Danger", num: "15", file: "groudon-dc1-15.png" }
    ]
  },
  {
    id: "hgss-hooh",
    titre: "Ho-Oh LÉGENDE",
    extension: "HeartGold SoulSilver",
    format: "legend",
    desc: "Assemblage de la moitié haute et basse de Ho-Oh.",
    cartes: [
      { id: "hooh-111", nom: "Ho-Oh LÉGENDE", extension: "HeartGold SoulSilver", num: "111", file: "hooh-legend-haut.png" },
      { id: "hooh-112", nom: "Ho-Oh LÉGENDE", extension: "HeartGold SoulSilver", num: "112", file: "hooh-legend-bas.png" }
    ]
  },
  {
    id: "hgss-lugia",
    titre: "Lugia LÉGENDE",
    extension: "HeartGold SoulSilver",
    format: "legend",
    desc: "Assemblage de la moitié haute et basse de Lugia.",
    cartes: [
      { id: "lugia-113", nom: "Lugia LÉGENDE", extension: "HeartGold SoulSilver", num: "113", file: "lugia-legend-haut.png" },
      { id: "lugia-114", nom: "Lugia LÉGENDE", extension: "HeartGold SoulSilver", num: "114", file: "lugia-legend-bas.png" }
    ]
  },
  {
    id: "hgss-entei-raikou",
    titre: "Entei & Raikou LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "entei-raikou-90", nom: "Entei & Raikou LÉGENDE", extension: "Déchaînement", num: "90", file: "entei-raikou-haut.png" },
      { id: "entei-raikou-91", nom: "Entei & Raikou LÉGENDE", extension: "Déchaînement", num: "91", file: "entei-raikou-bas.png" }
    ]
  },
  {
    id: "hgss-raikou-suicune",
    titre: "Raikou & Suicune LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "raikou-suicune-92", nom: "Raikou & Suicune LÉGENDE", extension: "Déchaînement", num: "92", file: "raikou-suicune-haut.png" },
      { id: "raikou-suicune-93", nom: "Raikou & Suicune LÉGENDE", extension: "Déchaînement", num: "93", file: "raikou-suicune-bas.png" }
    ]
  },
  {
    id: "hgss-suicune-entei",
    titre: "Suicune & Entei LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "suicune-entei-94", nom: "Suicune & Entei LÉGENDE", extension: "Déchaînement", num: "94", file: "suicune-entei-haut.png" },
      { id: "suicune-entei-95", nom: "Suicune & Entei LÉGENDE", extension: "Déchaînement", num: "95", file: "suicune-entei-bas.png" }
    ]
  },
  {
    id: "hgss-kyogre-groudon",
    titre: "Kyogre & Groudon LÉGENDE",
    extension: "Indomptable",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "kyogre-groudon-87", nom: "Kyogre & Groudon LÉGENDE", extension: "Indomptable", num: "87", file: "kyogre-groudon-haut.png" },
      { id: "kyogre-groudon-88", nom: "Kyogre & Groudon LÉGENDE", extension: "Indomptable", num: "88", file: "kyogre-groudon-bas.png" }
    ]
  },
  {
    id: "hgss-rayquaza-deoxys",
    titre: "Rayquaza & Deoxys LÉGENDE",
    extension: "Indomptable",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "rayquaza-deoxys-89", nom: "Rayquaza & Deoxys LÉGENDE", extension: "Indomptable", num: "89", file: "rayquaza-deoxys-haut.png" },
      { id: "rayquaza-deoxys-90", nom: "Rayquaza & Deoxys LÉGENDE", extension: "Indomptable", num: "90", file: "rayquaza-deoxys-bas.png" }
    ]
  },
  {
    id: "hgss-darkrai-cresselia",
    titre: "Darkrai & Cresselia LÉGENDE",
    extension: "Triomphe",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "darkrai-cresselia-99", nom: "Darkrai & Cresselia LÉGENDE", extension: "Triomphe", num: "99", file: "darkrai-cresselia-haut.png" },
      { id: "darkrai-cresselia-100", nom: "Darkrai & Cresselia LÉGENDE", extension: "Triomphe", num: "100", file: "darkrai-cresselia-bas.png" }
    ]
  },
  {
    id: "hgss-dialga-palkia",
    titre: "Dialga & Palkia LÉGENDE",
    extension: "Triomphe",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "dialga-palkia-101", nom: "Dialga & Palkia LÉGENDE", extension: "Triomphe", num: "101", file: "dialga-palkia-haut.png" },
      { id: "dialga-palkia-102", nom: "Dialga & Palkia LÉGENDE", extension: "Triomphe", num: "102", file: "dialga-palkia-bas.png" }
    ]
  }
];

// 2. CHRONIQUES : LA NARRATION & LES PERSPECTIVES CROISÉES
const chroniquesDatabase = [
  {
    id: "tarsal-famille-trio",
    titre: "La Famille (L'histoire d'une vie)",
    extension: "Écarlate et Violet",
    format: "trio",
    desc: "L'histoire d'une famille de l'emménagement à la vieillesse.",
    cartes: [
      { id: "tarsal-211", nom: "Tarsal", extension: "Écarlate et Violet", num: "211", file: "tarsal-sv1-211.png" },
      { id: "kirlia-212", nom: "Kirlia", extension: "Écarlate et Violet", num: "212", file: "kirlia-sv1-212.png" },
      { id: "gardevoir-245", nom: "Gardevoir ex", extension: "Écarlate et Violet", num: "245", file: "gardevoir-sv1-245.png" }
    ]
  },
  {
    id: "porygon-developpeur-trio",
    titre: "Le Développeur",
    extension: "Faille Paradoxe",
    format: "trio",
    desc: "L'évolution technologique dans la chambre d'un développeur.",
    cartes: [
      { id: "porygon-142", nom: "Porygon", extension: "Faille Paradoxe", num: "142", file: "porygon-sv4-142.png" },
      { id: "porygon2-143", nom: "Porygon2", extension: "Faille Paradoxe", num: "143", file: "porygon2-sv4-143.png" },
      { id: "porygonz-144", nom: "Porygon-Z", extension: "Faille Paradoxe", num: "144", file: "porygonz-sv4-144.png" }
    ]
  },
  {
    id: "gruikui-parcours-vie-trio",
    titre: "Le Parcours de Vie",
    extension: "Guerriers Mythiques",
    format: "trio",
    desc: "Un enfant grandit, se marie et devient père avec son Pokémon.",
    cartes: [
      { id: "gruikui-rc5", nom: "Gruikui", extension: "Guerriers Mythiques", num: "RC5", file: "gruikui-rc5.png" },
      { id: "grotichon-rc6", nom: "Grotichon", extension: "Guerriers Mythiques", num: "RC6", file: "grotichon-rc6.png" },
      { id: "roitiflam-rc7", nom: "Roitiflam", extension: "Guerriers Mythiques", num: "RC7", file: "roitiflam-rc7.png" }
    ]
  },
  {
    id: "salameche-explorateur-trio",
    titre: "L'Explorateur",
    extension: "Générations",
    format: "trio",
    desc: "Un enfant déguisé en Salamèche grandit pour voler avec son partenaire.",
    cartes: [
      { id: "salameche-rc3", nom: "Salamèche", extension: "Générations", num: "RC3", file: "salameche-rc3.png" },
      { id: "reptincel-rc4", nom: "Reptincel", extension: "Générations", num: "RC4", file: "reptincel-rc4.png" },
      { id: "dracaufeu-rc5", nom: "Dracaufeu", extension: "Générations", num: "RC5", file: "dracaufeu-rc5.png" }
    ]
  },
  {
    id: "frigodo-chambre-trio",
    titre: "La Chambre d'Enfant",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "Le Pokémon grandit dans une chambre qui vieillit avec lui.",
    cartes: [
      { id: "frigodo-057", nom: "Frigodo", extension: "Évolutions à Paldéa", num: "057", file: "frigodo-sv2-057.png" },
      { id: "cryodo-058", nom: "Cryodo", extension: "Évolutions à Paldéa", num: "058", file: "cryodo-sv2-058.png" },
      { id: "glaivodo-210", nom: "Glaivodo", extension: "Évolutions à Paldéa", num: "210", file: "glaivodo-sv2-210.png" }
    ]
  },
  {
    id: "poussacha-amitie-trio",
    titre: "L'Amitié Grandissante",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "La complicité grandissante avec son dresseur au fil des années.",
    cartes: [
      { id: "poussacha-196", nom: "Poussacha", extension: "Évolutions à Paldéa", num: "196", file: "poussacha-sv2-196.png" },
      { id: "matourgeon-197", nom: "Matourgeon", extension: "Évolutions à Paldéa", num: "197", file: "matourgeon-sv2-197.png" },
      { id: "miascarade-256", nom: "Miascarade ex", extension: "Évolutions à Paldéa", num: "256", file: "miascarade-sv2-256.png" }
    ]
  },
  {
    id: "chochodile-chant-trio",
    titre: "La Voix du Feu",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "Un Pokémon timide devenant un puissant chanteur d'opéra.",
    cartes: [
      { id: "chochodile-201", nom: "Chochodile", extension: "Évolutions à Paldéa", num: "201", file: "chochodile-sv2-201.png" },
      { id: "crocogril-202", nom: "Crocogril", extension: "Évolutions à Paldéa", num: "202", file: "crocogril-sv2-202.png" },
      { id: "flamigator-258", nom: "Flâmigator ex", extension: "Évolutions à Paldéa", num: "258", file: "flamigator-sv2-258.png" }
    ]
  },
  {
    id: "kanto-bulbizarre-trio",
    titre: "L'Ascension de Kanto : Flore",
    extension: "151",
    format: "trio",
    desc: "L'évolution à travers la canopée et la forêt.",
    cartes: [
      { id: "bulbizarre-166", nom: "Bulbizarre", extension: "151", num: "166", file: "bulbizarre-151-166.png" },
      { id: "herbizarre-167", nom: "Herbizarre", extension: "151", num: "167", file: "herbizarre-151-167.png" },
      { id: "florizarre-198", nom: "Florizarre ex", extension: "151", num: "198", file: "florizarre-151-198.png" }
    ]
  },
  {
    id: "kanto-salameche-trio",
    titre: "L'Ascension de Kanto : Flamme",
    extension: "151",
    format: "trio",
    desc: "L'évolution à travers les canyons jusqu'au vol au-dessus du monde.",
    cartes: [
      { id: "salameche-168", nom: "Salamèche", extension: "151", num: "168", file: "salameche-151-168.png" },
      { id: "reptincel-169", nom: "Reptincel", extension: "151", num: "169", file: "reptincel-151-169.png" },
      { id: "dracaufeu-199", nom: "Dracaufeu ex", extension: "151", num: "199", file: "dracaufeu-151-199.png" }
    ]
  },
  {
    id: "kanto-carapuce-trio",
    titre: "L'Ascension de Kanto : Marée",
    extension: "151",
    format: "trio",
    desc: "L'évolution des profondeurs vers la surface.",
    cartes: [
      { id: "carapuce-170", nom: "Carapuce", extension: "151", num: "170", file: "carapuce-151-170.png" },
      { id: "carabaffe-171", nom: "Carabaffe", extension: "151", num: "171", file: "carabaffe-151-171.png" },
      { id: "tortank-200", nom: "Tortank ex", extension: "151", num: "200", file: "tortank-151-200.png" }
    ]
  },
  {
    id: "ectoplasma-nuit-trio",
    titre: "La Nuit en Ville",
    extension: "Forces Temporelles",
    format: "trio",
    desc: "Parcours nocturne et espiègle dans les rues illuminées.",
    cartes: [
      { id: "fantominus-177", nom: "Fantominus", extension: "Forces Temporelles", num: "177", file: "fantominus-sv5-177.png" },
      { id: "spectrum-178", nom: "Spectrum", extension: "Forces Temporelles", num: "178", file: "spectrum-sv5-178.png" },
      { id: "ectoplasma-208", nom: "Ectoplasma ex", extension: "Forces Temporelles", num: "208", file: "ectoplasma-sv5-208.png" }
    ]
  },
  {
    id: "pohm-concert-trio",
    titre: "Le Concert",
    extension: "Destinées de Paldéa",
    format: "trio",
    desc: "La foule s'amasse pour un concert au fil des cartes.",
    cartes: [
      { id: "pohm-073", nom: "Pohm", extension: "Destinées de Paldéa", num: "073", file: "pohm-sv4pt5-073.png" },
      { id: "pohmotte-074", nom: "Pohmotte", extension: "Destinées de Paldéa", num: "074", file: "pohmotte-sv4pt5-074.png" },
      { id: "pohmarmotte-075", nom: "Pohmarmotte", extension: "Destinées de Paldéa", num: "075", file: "pohmarmotte-sv4pt5-075.png" }
    ]
  },
  {
    id: "skelenox-brume-trio",
    titre: "L'Errance dans la Brume",
    extension: "Fable Nébuleuse",
    format: "trio",
    desc: "Progression mystique dans la brume.",
    cartes: [
      { id: "skelenox-068", nom: "Skelénox", extension: "Fable Nébuleuse", num: "068", file: "skelenox-sv6pt5-068.png" },
      { id: "teraclope-069", nom: "Téraclope", extension: "Fable Nébuleuse", num: "069", file: "teraclope-sv6pt5-069.png" },
      { id: "noctunoir-070", nom: "Noctunoir", extension: "Fable Nébuleuse", num: "070", file: "noctunoir-sv6pt5-070.png" }
    ]
  },
  {
    id: "granivol-ascension-trio",
    titre: "L'Ascension Végétale",
    extension: "Évolution Céleste",
    format: "trio",
    desc: "Le point de vue s'élève : du sol vers les nuages.",
    cartes: [
      { id: "granivol-002", nom: "Granivol", extension: "Évolution Céleste", num: "002", file: "granivol-swsh7-002.png" },
      { id: "floravol-003", nom: "Floravol", extension: "Évolution Céleste", num: "003", file: "floravol-swsh7-003.png" },
      { id: "cotovol-004", nom: "Cotovol", extension: "Évolution Céleste", num: "004", file: "cotovol-swsh7-004.png" }
    ]
  },
  {
    id: "rongourmand-chute-duo",
    titre: "La Chute des Baies",
    extension: "Épée et Bouclier",
    format: "duo",
    desc: "Rongourmand stocke des baies, mais la branche cède sous son poids.",
    cartes: [
      { id: "rongourmand-153", nom: "Rongourmand", extension: "Épée et Bouclier", num: "153", file: "rongourmand-swsh1-153.png" },
      { id: "rongrigou-154", nom: "Rongrigou", extension: "Épée et Bouclier", num: "154", file: "rongrigou-swsh1-154.png" }
    ]
  },
  {
    id: "fenetre-pluie-duo",
    titre: "Fenêtre sur la Pluie",
    extension: "Faille Paradoxe",
    format: "duo",
    desc: "Vue de l'intérieur vs Vue de l'extérieur.",
    cartes: [
      { id: "posipi-193", nom: "Posipi", extension: "Faille Paradoxe", num: "193", file: "posipi-sv4-193.png" },
      { id: "negapi-194", nom: "Négapi", extension: "Faille Paradoxe", num: "194", file: "negapi-sv4-194.png" }
    ]
  },
  {
    id: "mite-rampe-paradoxe",
    titre: "L'Affrontement Paradoxe",
    extension: "Faille Paradoxe",
    format: "duo",
    desc: "Le même combat vu depuis chacun des deux adversaires.",
    cartes: [
      { id: "mite-fer-187", nom: "Mite-de-Fer", extension: "Faille Paradoxe", num: "187", file: "mite-fer-sv4-187.png" },
      { id: "rampe-ailes-203", nom: "Rampe-Ailes", extension: "Faille Paradoxe", num: "203", file: "rampe-ailes-sv4-203.png" }
    ]
  },
  {
    id: "caninos-lithia-photo",
    titre: "Séance Photo",
    extension: "Mascarade Crépusculaire",
    format: "duo",
    desc: "Caninos et Lithia se prennent mutuellement en photo.",
    cartes: [
      { id: "caninos-181", nom: "Caninos de Hisui", extension: "Mascarade Crépusculaire", num: "181", file: "caninos-sv6-181.png" },
      { id: "lithia-207", nom: "Lithia", extension: "Mascarade Crépusculaire", num: "207", file: "lithia-sv6-207.png" }
    ]
  },
  {
    id: "saisons-vivaldaim-duo",
    titre: "Les Saisons",
    extension: "Forces Temporelles",
    format: "duo",
    desc: "Le même paysage immortalisé à différentes saisons.",
    cartes: [
      { id: "vivaldaim-165", nom: "Vivaldaim", extension: "Forces Temporelles", num: "165", file: "vivaldaim-sv5-165.png" },
      { id: "haydaim-166", nom: "Haydaim", extension: "Forces Temporelles", num: "166", file: "haydaim-sv5-166.png" }
    ]
  },
  {
    id: "seleroc-solaroc-dos",
    titre: "Jour et Nuit",
    extension: "Zénith Suprême",
    format: "duo",
    desc: "Les deux Pokémon combattant dos à dos.",
    cartes: [
      { id: "seleroc-gg11", nom: "Séléroc", extension: "Zénith Suprême", num: "GG11", file: "seleroc-gg11.png" },
      { id: "solaroc-gg15", nom: "Solaroc", extension: "Zénith Suprême", num: "GG15", file: "solaroc-gg15.png" }
    ]
  },
  {
    id: "miaouss-sepiatop-vol",
    titre: "Le Vol de Baie",
    extension: "Ciel Rugissant",
    format: "duo",
    desc: "La course-poursuite vue sous deux angles opposés.",
    cartes: [
      { id: "miaouss-67", nom: "Miaouss", extension: "Ciel Rugissant", num: "67", file: "miaouss-xy6-67.png" },
      { id: "sepiatop-45", nom: "Sepiatop", extension: "Ciel Rugissant", num: "45", file: "sepiatop-xy6-45.png" }
    ]
  },
  {
    id: "natu-frison-dos",
    titre: "Le Voyage sur le Dos",
    extension: "Ciel Rugissant",
    format: "duo",
    desc: "Natu perché sur les cornes de Frison en pleine course.",
    cartes: [
      { id: "natu-28", nom: "Natu", extension: "Ciel Rugissant", num: "28", file: "natu-xy6-28.png" },
      { id: "frison-68", nom: "Frison", extension: "Ciel Rugissant", num: "68", file: "frison-xy6-68.png" }
    ]
  },
  {
    id: "arakdo-moustillon-eau",
    titre: "Rencontre Aquatique",
    extension: "Offensive Vapeur",
    format: "duo",
    desc: "Vue sous-marine vs vue aérienne d'une même rencontre.",
    cartes: [
      { id: "arakdo-13", nom: "Arakdo", extension: "Offensive Vapeur", num: "13", file: "arakdo-xy11-13.png" },
      { id: "moustillon-30", nom: "Moustillon", extension: "Offensive Vapeur", num: "30", file: "moustillon-xy11-30.png" }
    ]
  },
  {
    id: "miamiasme-brocelome-amitie",
    titre: "L'Amitié dans la Ruelle",
    extension: "Rupture Turbo",
    format: "duo",
    desc: "D'une fuite craintive à une partie de jeu dans la ruelle.",
    cartes: [
      { id: "brocelome-55", nom: "Brocélôme", extension: "Rupture Turbo", num: "55", file: "brocelome-xy9-55.png" },
      { id: "miamiasme-65", nom: "Miamiasme", extension: "Rupture Turbo", num: "65", file: "miamiasme-xy9-65.png" }
    ]
  },
  {
    id: "caninos-miamiasme-rue",
    titre: "La Bagarre de Rue",
    extension: "Clash des Rebelles",
    format: "duo",
    desc: "Caninos aboie dans la rue tandis que Miamiasme fuit terrifié.",
    cartes: [
      { id: "caninos-027", nom: "Caninos", extension: "Clash des Rebelles", num: "027", file: "caninos-swsh2-027.png" },
      { id: "miamiasme-117", nom: "Miamiasme", extension: "Clash des Rebelles", num: "117", file: "miamiasme-swsh2-117.png" }
    ]
  },
  {
    id: "statitik-pitrouille-nuit",
    titre: "La Balade Nocturne",
    extension: "Forces Fantômes",
    format: "duo",
    desc: "Les deux Pokémon apparaissent mutuellement en arrière-plan.",
    cartes: [
      { id: "statitik-26", nom: "Statitik", extension: "Forces Fantômes", num: "26", file: "statitik-xy4-26.png" },
      { id: "pitrouille-44", nom: "Pitrouille", extension: "Forces Fantômes", num: "44", file: "pitrouille-xy4-44.png" }
    ]
  },
  {
    id: "abo-smogo-grotte",
    titre: "L'Abri dans la Grotte",
    extension: "Destinées Occultes",
    format: "duo",
    desc: "Les deux Pokémon de la Team Rocket face à face dans la même grotte.",
    cartes: [
      { id: "abo-25", nom: "Abo", extension: "Destinées Occultes", num: "25", file: "abo-sm115-25.png" },
      { id: "smogo-28", nom: "Smogo", extension: "Destinées Occultes", num: "28", file: "smogo-sm115-28.png" }
    ]
  },
  {
    id: "polagriffe-grelacon-blizzard",
    titre: "Le Blizzard Protecteur",
    extension: "Règne de Glace",
    format: "duo",
    desc: "Polagriffe protège Grelaçon, vu sous deux angles différents.",
    cartes: [
      { id: "grelacon-042", nom: "Grelaçon", extension: "Règne de Glace", num: "042", file: "grelacon-swsh6-042.png" },
      { id: "polagriffe-043", nom: "Polagriffe", extension: "Règne de Glace", num: "043", file: "polagriffe-swsh6-043.png" }
    ]
  }
];

function getSceneCardPath(file) {
  return `./assets/cards/chroniques/${file}`;
}

if (typeof window !== 'undefined') {
  window.odysseeDatabase = odysseeDatabase;
  window.chroniquesDatabase = chroniquesDatabase;
  window.getSceneCardPath = getSceneCardPath;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { odysseeDatabase, chroniquesDatabase, getSceneCardPath };
}
