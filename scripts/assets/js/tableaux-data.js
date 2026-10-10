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
      { id: "riolu-gg26", nom: "Riolu", set: "swsh12pt5gg", num: "GG26", file: "zenith-riolu.png", grid_position: 1 },
      { id: "tylton-gg27", nom: "Tylton", set: "swsh12pt5gg", num: "GG27", file: "zenith-tylton.png", grid_position: 2 },
      { id: "wattouat-gg34", nom: "Wattouat", set: "swsh12pt5gg", num: "GG34", file: "zenith-wattouat.png", grid_position: 3 },
      { id: "pikachu-160", nom: "Pikachu", set: "swsh12pt5", num: "160", file: "zenith-pikachu.png", grid_position: 4 },
      { id: "tortipouss-gg31", nom: "Tortipouss", set: "swsh12pt5gg", num: "GG31", file: "zenith-tortipouss.png", grid_position: 5 },
      { id: "paras-gg32", nom: "Paras", set: "swsh12pt5gg", num: "GG32", file: "zenith-paras.png", grid_position: 6 },
      { id: "medhyena-gg33", nom: "Médhyèna", set: "swsh12pt5gg", num: "GG33", file: "zenith-medhyena.png", grid_position: 7 },
      { id: "keunotor-gg29", nom: "Keunotor", set: "swsh12pt5gg", num: "GG29", file: "zenith-keunotor.png", grid_position: 8 },
      { id: "diancie-gg13", nom: "Diancie", set: "swsh12pt5gg", num: "GG13", file: "zenith-diancie.png", grid_position: 9 }
    ]
  },
  {
    id: "dieux-createurs-quad",
    titre: "Les Dieux Créateurs",
    extension: "Zénith Suprême",
    format: "quad",
    desc: "Fresque cosmique de 4 cartes Secrètes Gold.",
    cartes: [
      { id: "palkia-gg67", nom: "Palkia Originel VSTAR", set: "swsh12pt5gg", num: "GG67", file: "palkia-gg67.png", grid_position: "top-left" },
      { id: "dialga-gg68", nom: "Dialga Originel VSTAR", set: "swsh12pt5gg", num: "GG68", file: "dialga-gg68.png", grid_position: "top-right" },
      { id: "giratina-gg69", nom: "Giratina VSTAR", set: "swsh12pt5gg", num: "GG69", file: "giratina-gg69.png", grid_position: "bottom-left" },
      { id: "arceus-gg70", nom: "Arceus VSTAR", set: "swsh12pt5gg", num: "GG70", file: "arceus-gg70.png", grid_position: "bottom-right" }
    ]
  },
  {
    id: "oiseaux-legendaires-trio",
    titre: "Trio des Oiseaux",
    extension: "Promo Black Star Wizards",
    format: "trio",
    desc: "Les trois cartes placées côte à côte partagent le même ciel.",
    cartes: [
      { id: "sulfura-21", nom: "Sulfura", set: "basep", num: "21", file: "sulfura-p21.png", grid_position: "left" },
      { id: "artikodin-22", nom: "Artikodin", set: "basep", num: "22", file: "artikodin-p22.png", grid_position: "center" },
      { id: "electhor-23", nom: "Électhor", set: "basep", num: "23", file: "electhor-p23.png", grid_position: "right" }
    ]
  },
  {
    id: "deoxys-formes-quad",
    titre: "Les 4 Formes de Deoxys",
    extension: "Aube Majestueuse",
    format: "quad",
    desc: "Les halos spatiaux se prolongent d'une carte à l'autre.",
    cartes: [
      { id: "deoxys-1", nom: "Deoxys Normal", set: "dp5", num: "1", file: "deoxys-normal-1.png", grid_position: 1 },
      { id: "deoxys-2", nom: "Deoxys Attaque", set: "dp5", num: "2", file: "deoxys-attaque-2.png", grid_position: 2 },
      { id: "deoxys-3", nom: "Deoxys Défense", set: "dp5", num: "3", file: "deoxys-defense-3.png", grid_position: 3 },
      { id: "deoxys-4", nom: "Deoxys Vitesse", set: "dp5", num: "4", file: "deoxys-vitesse-4.png", grid_position: 4 }
    ]
  },
  {
    id: "cheniti-branche-trio",
    titre: "La Branche des Cheniti",
    extension: "Merveilles Secrètes",
    format: "trio",
    desc: "Les trois cartes forment une seule branche d'arbre en panorama.",
    cartes: [
      { id: "cheniti-45", nom: "Cheniti Cape Plante", set: "dp3", num: "45", file: "cheniti-plante-45.png", grid_position: "left" },
      { id: "cheniti-46", nom: "Cheniti Cape Sable", set: "dp3", num: "46", file: "cheniti-sable-46.png", grid_position: "center" },
      { id: "cheniti-47", nom: "Cheniti Cape Déchet", set: "dp3", num: "47", file: "cheniti-dechet-47.png", grid_position: "right" }
    ]
  },
  {
    id: "posipi-negapi-eclairs",
    titre: "Le Courant Électrique",
    extension: "Poings Furieux",
    format: "duo",
    desc: "Les éclairs projetés se rejoignent parfaitement au centre.",
    cartes: [
      { id: "posipi-31", nom: "Posipi", set: "xy3", num: "31", file: "posipi-xy3-31.png", grid_position: "left" },
      { id: "negapi-32", nom: "Négapi", set: "xy3", num: "32", file: "negapi-xy3-32.png", grid_position: "right" }
    ]
  },
  {
    id: "seviper-mangriff-face",
    titre: "Le Face-à-Face",
    extension: "Tempête de Sable",
    format: "duo",
    desc: "Les deux ennemis naturels se font face dans le même désert.",
    cartes: [
      { id: "seviper-73", nom: "Séviper", set: "ex2", num: "73", file: "seviper-ex2-73.png", grid_position: "left" },
      { id: "mangriff-84", nom: "Mangriff", set: "ex2", num: "84", file: "mangriff-ex2-84.png", grid_position: "right" }
    ]
  },
  {
    id: "seleroc-solaroc-aura",
    titre: "L'Aura Cosmique",
    extension: "Gardiens de Cristal",
    format: "duo",
    desc: "L'aura d'énergie qui entoure les deux Pokémon se complète.",
    cartes: [
      { id: "seleroc-37", nom: "Séléroc", set: "ex14", num: "37", file: "seleroc-ex14-37.png", grid_position: "left" },
      { id: "solaroc-41", nom: "Solaroc", set: "ex14", num: "41", file: "solaroc-ex14-41.png", grid_position: "right" }
    ]
  },
  {
    id: "double-crise-duo",
    titre: "Double Crise",
    extension: "Double Danger",
    format: "duo",
    desc: "Leurs attaques élémentaires se heurtent au centre.",
    cartes: [
      { id: "kyogre-14", nom: "Kyogre de la Team Aqua", set: "dc1", num: "14", file: "kyogre-dc1-14.png", grid_position: "left" },
      { id: "groudon-15", nom: "Groudon de la Team Magma", set: "dc1", num: "15", file: "groudon-dc1-15.png", grid_position: "right" }
    ]
  },
  {
    id: "hgss-hooh",
    titre: "Ho-Oh LÉGENDE",
    extension: "HeartGold SoulSilver",
    format: "legend",
    desc: "Assemblage de la moitié haute et basse de Ho-Oh.",
    cartes: [
      { id: "hooh-111", nom: "Ho-Oh LÉGENDE (Haut)", set: "hgss1", num: "111", file: "hooh-legend-haut.png", moitie: "haut" },
      { id: "hooh-112", nom: "Ho-Oh LÉGENDE (Bas)", set: "hgss1", num: "112", file: "hooh-legend-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-lugia",
    titre: "Lugia LÉGENDE",
    extension: "HeartGold SoulSilver",
    format: "legend",
    desc: "Assemblage de la moitié haute et basse de Lugia.",
    cartes: [
      { id: "lugia-113", nom: "Lugia LÉGENDE (Haut)", set: "hgss1", num: "113", file: "lugia-legend-haut.png", moitie: "haut" },
      { id: "lugia-114", nom: "Lugia LÉGENDE (Bas)", set: "hgss1", num: "114", file: "lugia-legend-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-entei-raikou",
    titre: "Entei & Raikou LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "entei-raikou-90", nom: "Entei & Raikou LÉGENDE (Haut)", set: "hgss2", num: "90", file: "entei-raikou-haut.png", moitie: "haut" },
      { id: "entei-raikou-91", nom: "Entei & Raikou LÉGENDE (Bas)", set: "hgss2", num: "91", file: "entei-raikou-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-raikou-suicune",
    titre: "Raikou & Suicune LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "raikou-suicune-92", nom: "Raikou & Suicune LÉGENDE (Haut)", set: "hgss2", num: "92", file: "raikou-suicune-haut.png", moitie: "haut" },
      { id: "raikou-suicune-93", nom: "Raikou & Suicune LÉGENDE (Bas)", set: "hgss2", num: "93", file: "raikou-suicune-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-suicune-entei",
    titre: "Suicune & Entei LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "suicune-entei-94", nom: "Suicune & Entei LÉGENDE (Haut)", set: "hgss2", num: "94", file: "suicune-entei-haut.png", moitie: "haut" },
      { id: "suicune-entei-95", nom: "Suicune & Entei LÉGENDE (Bas)", set: "hgss2", num: "95", file: "suicune-entei-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-kyogre-groudon",
    titre: "Kyogre & Groudon LÉGENDE",
    extension: "Indomptable",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "kyogre-groudon-87", nom: "Kyogre & Groudon LÉGENDE (Haut)", set: "hgss3", num: "87", file: "kyogre-groudon-haut.png", moitie: "haut" },
      { id: "kyogre-groudon-88", nom: "Kyogre & Groudon LÉGENDE (Bas)", set: "hgss3", num: "88", file: "kyogre-groudon-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-rayquaza-deoxys",
    titre: "Rayquaza & Deoxys LÉGENDE",
    extension: "Indomptable",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "rayquaza-deoxys-89", nom: "Rayquaza & Deoxys LÉGENDE (Haut)", set: "hgss3", num: "89", file: "rayquaza-deoxys-haut.png", moitie: "haut" },
      { id: "rayquaza-deoxys-90", nom: "Rayquaza & Deoxys LÉGENDE (Bas)", set: "hgss3", num: "90", file: "rayquaza-deoxys-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-darkrai-cresselia",
    titre: "Darkrai & Cresselia LÉGENDE",
    extension: "Triomphe",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "darkrai-cresselia-99", nom: "Darkrai & Cresselia LÉGENDE (Haut)", set: "hgss4", num: "99", file: "darkrai-cresselia-haut.png", moitie: "haut" },
      { id: "darkrai-cresselia-100", nom: "Darkrai & Cresselia LÉGENDE (Bas)", set: "hgss4", num: "100", file: "darkrai-cresselia-bas.png", moitie: "bas" }
    ]
  },
  {
    id: "hgss-dialga-palkia",
    titre: "Dialga & Palkia LÉGENDE",
    extension: "Triomphe",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "dialga-palkia-101", nom: "Dialga & Palkia LÉGENDE (Haut)", set: "hgss4", num: "101", file: "dialga-palkia-haut.png", moitie: "haut" },
      { id: "dialga-palkia-102", nom: "Dialga & Palkia LÉGENDE (Bas)", set: "hgss4", num: "102", file: "dialga-palkia-bas.png", moitie: "bas" }
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
      { id: "tarsal-211", nom: "Tarsal", set: "sv1", num: "211", file: "tarsal-sv1-211.png", timeline_step: 1 },
      { id: "kirlia-212", nom: "Kirlia", set: "sv1", num: "212", file: "kirlia-sv1-212.png", timeline_step: 2 },
      { id: "gardevoir-245", nom: "Gardevoir ex", set: "sv1", num: "245", file: "gardevoir-sv1-245.png", timeline_step: 3 }
    ]
  },
  {
    id: "porygon-developpeur-trio",
    titre: "Le Développeur",
    extension: "Faille Paradoxe",
    format: "trio",
    desc: "L'évolution technologique dans la chambre d'un développeur.",
    cartes: [
      { id: "porygon-142", nom: "Porygon", set: "sv4", num: "142", file: "porygon-sv4-142.png", timeline_step: 1 },
      { id: "porygon2-143", nom: "Porygon2", set: "sv4", num: "143", file: "porygon2-sv4-143.png", timeline_step: 2 },
      { id: "porygonz-144", nom: "Porygon-Z", set: "sv4", num: "144", file: "porygonz-sv4-144.png", timeline_step: 3 }
    ]
  },
  {
    id: "gruikui-parcours-vie-trio",
    titre: "Le Parcours de Vie",
    extension: "Noir & Blanc Coffret Trésor",
    format: "trio",
    desc: "Un enfant grandit, se marie et devient père avec son Pokémon.",
    cartes: [
      { id: "gruikui-rc5", nom: "Gruikui", set: "rc", num: "RC5", file: "gruikui-rc5.png", timeline_step: 1 },
      { id: "grotichon-rc6", nom: "Grotichon", set: "rc", num: "RC6", file: "grotichon-rc6.png", timeline_step: 2 },
      { id: "roitiflam-rc7", nom: "Roitiflam", set: "rc", num: "RC7", file: "roitiflam-rc7.png", timeline_step: 3 }
    ]
  },
  {
    id: "salameche-explorateur-trio",
    titre: "L'Explorateur",
    extension: "Générations",
    format: "trio",
    desc: "Un enfant déguisé en Salamèche grandit pour voler avec son partenaire.",
    cartes: [
      { id: "salameche-rc3", nom: "Salamèche", set: "g1", num: "RC3", file: "salameche-rc3.png", timeline_step: 1 },
      { id: "reptincel-rc4", nom: "Reptincel", set: "g1", num: "RC4", file: "reptincel-rc4.png", timeline_step: 2 },
      { id: "dracaufeu-rc5", nom: "Dracaufeu", set: "g1", num: "RC5", file: "dracaufeu-rc5.png", timeline_step: 3 }
    ]
  },
  {
    id: "frigodo-chambre-trio",
    titre: "La Chambre d'Enfant",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "Le Pokémon grandit dans une chambre qui vieillit avec lui.",
    cartes: [
      { id: "frigodo-057", nom: "Frigodo", set: "sv2", num: "057", file: "frigodo-sv2-057.png", timeline_step: 1 },
      { id: "cryodo-058", nom: "Cryodo", set: "sv2", num: "058", file: "cryodo-sv2-058.png", timeline_step: 2 },
      { id: "glaivodo-210", nom: "Glaivodo", set: "sv2", num: "210", file: "glaivodo-sv2-210.png", timeline_step: 3 }
    ]
  },
  {
    id: "poussacha-amitie-trio",
    titre: "L'Amitié Grandissante",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "La complicité grandissante avec son dresseur au fil des années.",
    cartes: [
      { id: "poussacha-196", nom: "Poussacha", set: "sv2", num: "196", file: "poussacha-sv2-196.png", timeline_step: 1 },
      { id: "matourgeon-197", nom: "Matourgeon", set: "sv2", num: "197", file: "matourgeon-sv2-197.png", timeline_step: 2 },
      { id: "miascarade-256", nom: "Miascarade ex", set: "sv2", num: "256", file: "miascarade-sv2-256.png", timeline_step: 3 }
    ]
  },
  {
    id: "chochodile-chant-trio",
    titre: "La Voix du Feu",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "Un Pokémon timide devenant un puissant chanteur d'opéra.",
    cartes: [
      { id: "chochodile-201", nom: "Chochodile", set: "sv2", num: "201", file: "chochodile-sv2-201.png", timeline_step: 1 },
      { id: "crocogril-202", nom: "Crocogril", set: "sv2", num: "202", file: "crocogril-sv2-202.png", timeline_step: 2 },
      { id: "flamigator-258", nom: "Flâmigator ex", set: "sv2", num: "258", file: "flamigator-sv2-258.png", timeline_step: 3 }
    ]
  },
  {
    id: "kanto-bulbizarre-trio",
    titre: "L'Ascension de Kanto : Flore",
    extension: "151",
    format: "trio",
    desc: "L'évolution à travers la canopée et la forêt.",
    cartes: [
      { id: "bulbizarre-166", nom: "Bulbizarre", set: "sv3pt5", num: "166", file: "bulbizarre-151-166.png", timeline_step: 1 },
      { id: "herbizarre-167", nom: "Herbizarre", set: "sv3pt5", num: "167", file: "herbizarre-151-167.png", timeline_step: 2 },
      { id: "florizarre-198", nom: "Florizarre ex", set: "sv3pt5", num: "198", file: "florizarre-151-198.png", timeline_step: 3 }
    ]
  },
  {
    id: "kanto-salameche-trio",
    titre: "L'Ascension de Kanto : Flamme",
    extension: "151",
    format: "trio",
    desc: "L'évolution à travers les canyons jusqu'au vol au-dessus du monde.",
    cartes: [
      { id: "salameche-168", nom: "Salamèche", set: "sv3pt5", num: "168", file: "salameche-151-168.png", timeline_step: 1 },
      { id: "reptincel-169", nom: "Reptincel", set: "sv3pt5", num: "169", file: "reptincel-151-169.png", timeline_step: 2 },
      { id: "dracaufeu-199", nom: "Dracaufeu ex", set: "sv3pt5", num: "199", file: "dracaufeu-151-199.png", timeline_step: 3 }
    ]
  },
  {
    id: "kanto-carapuce-trio",
    titre: "L'Ascension de Kanto : Marée",
    extension: "151",
    format: "trio",
    desc: "L'évolution des profondeurs vers la surface.",
    cartes: [
      { id: "carapuce-170", nom: "Carapuce", set: "sv3pt5", num: "170", file: "carapuce-151-170.png", timeline_step: 1 },
      { id: "carabaffe-171", nom: "Carabaffe", set: "sv3pt5", num: "171", file: "carabaffe-151-171.png", timeline_step: 2 },
      { id: "tortank-200", nom: "Tortank ex", set: "sv3pt5", num: "200", file: "tortank-151-200.png", timeline_step: 3 }
    ]
  },
  {
    id: "ectoplasma-nuit-trio",
    titre: "La Nuit en Ville",
    extension: "Forces Temporelles",
    format: "trio",
    desc: "Parcours nocturne et espiègle dans les rues illuminées.",
    cartes: [
      { id: "fantominus-177", nom: "Fantominus", set: "sv5", num: "177", file: "fantominus-sv5-177.png", timeline_step: 1 },
      { id: "spectrum-178", nom: "Spectrum", set: "sv5", num: "178", file: "spectrum-sv5-178.png", timeline_step: 2 },
      { id: "ectoplasma-208", nom: "Ectoplasma ex", set: "sv5", num: "208", file: "ectoplasma-sv5-208.png", timeline_step: 3 }
    ]
  },
  {
    id: "pohm-concert-trio",
    titre: "Le Concert",
    extension: "Destinées de Paldéa",
    format: "trio",
    desc: "La foule s'amasse pour un concert au fil des cartes.",
    cartes: [
      { id: "pohm-073", nom: "Pohm", set: "sv4pt5", num: "073", file: "pohm-sv4pt5-073.png", timeline_step: 1 },
      { id: "pohmotte-074", nom: "Pohmotte", set: "sv4pt5", num: "074", file: "pohmotte-sv4pt5-074.png", timeline_step: 2 },
      { id: "pohmarmotte-075", nom: "Pohmarmotte", set: "sv4pt5", num: "075", file: "pohmarmotte-sv4pt5-075.png", timeline_step: 3 }
    ]
  },
  {
    id: "skelenox-brume-trio",
    titre: "L'Errance dans la Brume",
    extension: "Fable Nébuleuse",
    format: "trio",
    desc: "Progression mystique dans la brume.",
    cartes: [
      { id: "skelenox-068", nom: "Skelénox", set: "sv6pt5", num: "068", file: "skelenox-sv6pt5-068.png", timeline_step: 1 },
      { id: "teraclope-069", nom: "Téraclope", set: "sv6pt5", num: "069", file: "teraclope-sv6pt5-069.png", timeline_step: 2 },
      { id: "noctunoir-070", nom: "Noctunoir", set: "sv6pt5", num: "070", file: "noctunoir-sv6pt5-070.png", timeline_step: 3 }
    ]
  },
  {
    id: "granivol-ascension-trio",
    titre: "L'Ascension Végétale",
    extension: "Évolution Céleste",
    format: "trio",
    desc: "Le point de vue s'élève : du sol vers les nuages.",
    cartes: [
      { id: "granivol-002", nom: "Granivol", set: "swsh7", num: "002", file: "granivol-swsh7-002.png", timeline_step: 1 },
      { id: "floravol-003", nom: "Floravol", set: "swsh7", num: "003", file: "floravol-swsh7-003.png", timeline_step: 2 },
      { id: "cotovol-004", nom: "Cotovol", set: "swsh7", num: "004", file: "cotovol-swsh7-004.png", timeline_step: 3 }
    ]
  },
  {
    id: "rongourmand-chute-duo",
    titre: "La Chute des Baies",
    extension: "Épée et Bouclier",
    format: "duo",
    desc: "Rongourmand stocke des baies, mais la branche cède sous son poids.",
    cartes: [
      { id: "rongourmand-153", nom: "Rongourmand", set: "swsh1", num: "153", file: "rongourmand-swsh1-153.png", timeline_step: 1 },
      { id: "rongrigou-154", nom: "Rongrigou", set: "swsh1", num: "154", file: "rongrigou-swsh1-154.png", timeline_step: 2 }
    ]
  },
  {
    id: "fenetre-pluie-duo",
    titre: "Fenêtre sur la Pluie",
    extension: "Faille Paradoxe",
    format: "duo",
    desc: "Vue de l'intérieur vs Vue de l'extérieur.",
    cartes: [
      { id: "posipi-193", nom: "Posipi", set: "sv4", num: "193", file: "posipi-sv4-193.png", relation: "reverse-shot", paired_with: "negapi-194" },
      { id: "negapi-194", nom: "Négapi", set: "sv4", num: "194", file: "negapi-sv4-194.png", relation: "reverse-shot", paired_with: "posipi-193" }
    ]
  },
  {
    id: "mite-rampe-paradoxe",
    titre: "L'Affrontement Paradoxe",
    extension: "Faille Paradoxe",
    format: "duo",
    desc: "Le même combat vu depuis chacun des deux adversaires.",
    cartes: [
      { id: "mite-fer-187", nom: "Mite-de-Fer", set: "sv4", num: "187", file: "mite-fer-sv4-187.png", relation: "reverse-shot", paired_with: "rampe-ailes-203" },
      { id: "rampe-ailes-203", nom: "Rampe-Ailes", set: "sv4", num: "203", file: "rampe-ailes-sv4-203.png", relation: "reverse-shot", paired_with: "mite-fer-187" }
    ]
  },
  {
    id: "caninos-lithia-photo",
    titre: "Séance Photo",
    extension: "Mascarade Crépusculaire",
    format: "duo",
    desc: "Caninos et Lithia se prennent mutuellement en photo.",
    cartes: [
      { id: "caninos-181", nom: "Caninos de Hisui", set: "sv6", num: "181", file: "caninos-sv6-181.png", relation: "reverse-shot", paired_with: "lithia-207" },
      { id: "lithia-207", nom: "Lithia", set: "sv6", num: "207", file: "lithia-sv6-207.png", relation: "reverse-shot", paired_with: "caninos-181" }
    ]
  },
  {
    id: "saisons-vivaldaim-duo",
    titre: "Les Saisons",
    extension: "Forces Temporelles",
    format: "duo",
    desc: "Le même paysage immortalisé à différentes saisons.",
    cartes: [
      { id: "vivaldaim-165", nom: "Vivaldaim", set: "sv5", num: "165", file: "vivaldaim-sv5-165.png", relation: "reverse-shot", paired_with: "haydaim-166" },
      { id: "haydaim-166", nom: "Haydaim", set: "sv5", num: "166", file: "haydaim-sv5-166.png", relation: "reverse-shot", paired_with: "vivaldaim-165" }
    ]
  },
  {
    id: "seleroc-solaroc-dos",
    titre: "Jour et Nuit",
    extension: "Zénith Suprême",
    format: "duo",
    desc: "Les deux Pokémon combattant dos à dos.",
    cartes: [
      { id: "seleroc-gg11", nom: "Séléroc", set: "swsh12pt5gg", num: "GG11", file: "seleroc-gg11.png", relation: "reverse-shot", paired_with: "solaroc-gg15" },
      { id: "solaroc-gg15", nom: "Solaroc", set: "swsh12pt5gg", num: "GG15", file: "solaroc-gg15.png", relation: "reverse-shot", paired_with: "seleroc-gg11" }
    ]
  },
  {
    id: "miaouss-sepiatop-vol",
    titre: "Le Vol de Baie",
    extension: "Ciel Rugissant",
    format: "duo",
    desc: "La course-poursuite vue sous deux angles opposés.",
    cartes: [
      { id: "miaouss-67", nom: "Miaouss", set: "xy6", num: "67", file: "miaouss-xy6-67.png", relation: "reverse-shot", paired_with: "sepiatop-45" },
      { id: "sepiatop-45", nom: "Sepiatop", set: "xy6", num: "45", file: "sepiatop-xy6-45.png", relation: "reverse-shot", paired_with: "miaouss-67" }
    ]
  },
  {
    id: "natu-frison-dos",
    titre: "Le Voyage sur le Dos",
    extension: "Ciel Rugissant",
    format: "duo",
    desc: "Natu perché sur les cornes de Frison en pleine course.",
    cartes: [
      { id: "natu-28", nom: "Natu", set: "xy6", num: "28", file: "natu-xy6-28.png", relation: "reverse-shot", paired_with: "frison-68" },
      { id: "frison-68", nom: "Frison", set: "xy6", num: "68", file: "frison-xy6-68.png", relation: "reverse-shot", paired_with: "natu-28" }
    ]
  },
  {
    id: "arakdo-moustillon-eau",
    titre: "Rencontre Aquatique",
    extension: "Offensive Vapeur",
    format: "duo",
    desc: "Vue sous-marine vs vue aérienne d'une même rencontre.",
    cartes: [
      { id: "arakdo-13", nom: "Arakdo", set: "xy11", num: "13", file: "arakdo-xy11-13.png", relation: "reverse-shot", paired_with: "moustillon-30" },
      { id: "moustillon-30", nom: "Moustillon", set: "xy11", num: "30", file: "moustillon-xy11-30.png", relation: "reverse-shot", paired_with: "arakdo-13" }
    ]
  },
  {
    id: "miamiasme-brocelome-amitie",
    titre: "L'Amitié dans la Ruelle",
    extension: "Rupture Turbo",
    format: "duo",
    desc: "D'une fuite craintive à une partie de jeu dans la ruelle.",
    cartes: [
      { id: "brocelome-55", nom: "Brocélôme", set: "xy9", num: "55", file: "brocelome-xy9-55.png", relation: "reverse-shot", paired_with: "miamiasme-65" },
      { id: "miamiasme-65", nom: "Miamiasme", set: "xy9", num: "65", file: "miamiasme-xy9-65.png", relation: "reverse-shot", paired_with: "brocelome-55" }
    ]
  },
  {
    id: "caninos-miamiasme-rue",
    titre: "La Bagarre de Rue",
    extension: "Clash des Rebelles",
    format: "duo",
    desc: "Caninos aboie dans la rue tandis que Miamiasme fuit terrifié.",
    cartes: [
      { id: "caninos-027", nom: "Caninos", set: "swsh2", num: "027", file: "caninos-swsh2-027.png", relation: "reverse-shot", paired_with: "miamiasme-117" },
      { id: "miamiasme-117", nom: "Miamiasme", set: "swsh2", num: "117", file: "miamiasme-swsh2-117.png", relation: "reverse-shot", paired_with: "caninos-027" }
    ]
  },
  {
    id: "statitik-pitrouille-nuit",
    titre: "La Balade Nocturne",
    extension: "Forces Fantômes",
    format: "duo",
    desc: "Les deux Pokémon apparaissent mutuellement en arrière-plan.",
    cartes: [
      { id: "statitik-26", nom: "Statitik", set: "xy4", num: "26", file: "statitik-xy4-26.png", relation: "reverse-shot", paired_with: "pitrouille-44" },
      { id: "pitrouille-44", nom: "Pitrouille", set: "xy4", num: "44", file: "pitrouille-xy4-44.png", relation: "reverse-shot", paired_with: "statitik-26" }
    ]
  },
  {
    id: "abo-smogo-grotte",
    titre: "L'Abri dans la Grotte",
    extension: "Destinées Occultes",
    format: "duo",
    desc: "Les deux Pokémon de la Team Rocket face à face dans la même grotte.",
    cartes: [
      { id: "sm115-25", nom: "Abo", set: "sm115", num: "25", file: "abo-sm115-25.png", relation: "reverse-shot", paired_with: "smogo-28" },
      { id: "smogo-28", nom: "Smogo", set: "sm115", num: "28", file: "smogo-sm115-28.png", relation: "reverse-shot", paired_with: "sm115-25" }
    ]
  },
  {
    id: "polagriffe-grelacon-blizzard",
    titre: "Le Blizzard Protecteur",
    extension: "Règne de Glace",
    format: "duo",
    desc: "Polagriffe protège Grelaçon, vu sous deux angles différents.",
    cartes: [
      { id: "grelacon-042", nom: "Grelaçon", set: "swsh6", num: "042", file: "grelacon-swsh6-042.png", relation: "reverse-shot", paired_with: "polagriffe-043" },
      { id: "polagriffe-043", nom: "Polagriffe", set: "swsh6", num: "043", file: "polagriffe-swsh6-043.png", relation: "reverse-shot", paired_with: "grelacon-042" }
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
