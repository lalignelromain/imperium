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
      { id: "swsh12pt5gg-GG47", set: "swsh12pt5gg", num: "GG47", nom: "Sorcilence VMAX", file: "zenith-gg47.png" },
      { id: "swsh12pt5gg-GG48", set: "swsh12pt5gg", num: "GG48", nom: "Zacian V", file: "zenith-gg48.png" },
      { id: "swsh12pt5gg-GG49", set: "swsh12pt5gg", num: "GG49", nom: "Drascore V", file: "zenith-gg49.png" },
      { id: "swsh12pt5gg-GG50", set: "swsh12pt5gg", num: "GG50", nom: "Darkrai VSTAR", file: "zenith-gg50.png" },
      { id: "swsh12pt5gg-GG51", set: "swsh12pt5gg", num: "GG51", nom: "Clamiral de Hisui V", file: "zenith-gg51.png" },
      { id: "swsh12pt5gg-GG52", set: "swsh12pt5gg", num: "GG52", nom: "Clamiral de Hisui VSTAR", file: "zenith-gg52.png" },
      { id: "swsh12pt5gg-GG53", set: "swsh12pt5gg", num: "GG53", nom: "Hoopa V", file: "zenith-gg53.png" },
      { id: "swsh12pt5gg-GG54", set: "swsh12pt5gg", num: "GG54", nom: "Zamazenta V", file: "zenith-gg54.png" },
      { id: "swsh12pt5gg-GG55", set: "swsh12pt5gg", num: "GG55", nom: "Regigigas VSTAR", file: "zenith-gg55.png" }
    ]
  },
  {
    id: "dieux-createurs-quad",
    titre: "Les Dieux Créateurs",
    extension: "Zénith Suprême",
    format: "quad",
    desc: "Fresque cosmique de 4 cartes Secrètes Gold.",
    cartes: [
      { id: "swsh12pt5gg-GG67", set: "swsh12pt5gg", num: "GG67", nom: "Palkia Originel VSTAR", file: "palkia-gg67.png" },
      { id: "swsh12pt5gg-GG68", set: "swsh12pt5gg", num: "GG68", nom: "Dialga Originel VSTAR", file: "dialga-gg68.png" },
      { id: "swsh12pt5gg-GG69", set: "swsh12pt5gg", num: "GG69", nom: "Giratina VSTAR", file: "giratina-gg69.png" },
      { id: "swsh12pt5gg-GG70", set: "swsh12pt5gg", num: "GG70", nom: "Arceus VSTAR", file: "arceus-gg70.png" }
    ]
  },
  {
    id: "oiseaux-legendaires-trio",
    titre: "Trio des Oiseaux",
    extension: "WotC Black Star Promo",
    format: "trio",
    desc: "Les trois cartes placées côte à côte partagent le même ciel.",
    cartes: [
      { id: "basep-21", set: "basep", num: "21", nom: "Sulfura", file: "sulfura-p21.png" },
      { id: "basep-22", set: "basep", num: "22", nom: "Artikodin", file: "artikodin-p22.png" },
      { id: "basep-23", set: "basep", num: "23", nom: "Électhor", file: "electhor-p23.png" }
    ]
  },
  {
    id: "deoxys-formes-quad",
    titre: "Les 4 Formes de Deoxys",
    extension: "Aube Majestueuse",
    format: "quad",
    desc: "Les halos spatiaux se prolongent d'une carte à l'autre.",
    cartes: [
      { id: "dp5-1", set: "dp5", num: "1", nom: "Deoxys Normal", file: "deoxys-normal-1.png" },
      { id: "dp5-2", set: "dp5", num: "2", nom: "Deoxys Attaque", file: "deoxys-attaque-2.png" },
      { id: "dp5-3", set: "dp5", num: "3", nom: "Deoxys Défense", file: "deoxys-defense-3.png" },
      { id: "dp5-4", set: "dp5", num: "4", nom: "Deoxys Vitesse", file: "deoxys-vitesse-4.png" }
    ]
  },
  {
    id: "cheniti-branche-trio",
    titre: "La Branche des Cheniti",
    extension: "Merveilles Secrètes",
    format: "trio",
    desc: "Les trois cartes forment une seule branche d'arbre en panorama.",
    cartes: [
      { id: "dp3-45", set: "dp3", num: "45", nom: "Cheniti Cape Plante", file: "cheniti-plante-45.png" },
      { id: "dp3-46", set: "dp3", num: "46", nom: "Cheniti Cape Sable", file: "cheniti-sable-46.png" },
      { id: "dp3-47", set: "dp3", num: "47", nom: "Cheniti Cape Déchet", file: "cheniti-dechet-47.png" }
    ]
  },
  {
    id: "posipi-negapi-eclairs",
    titre: "Le Courant Électrique",
    extension: "Poings Furieux",
    format: "duo",
    desc: "Les éclairs projetés se rejoignent parfaitement au centre.",
    cartes: [
      { id: "xy3-31", set: "xy3", num: "31", nom: "Posipi", file: "posipi-xy3-31.png" },
      { id: "xy3-32", set: "xy3", num: "32", nom: "Négapi", file: "negapi-xy3-32.png" }
    ]
  },
  {
    id: "seviper-mangriff-face",
    titre: "Le Face-à-Face",
    extension: "EX Tempête de Sable",
    format: "duo",
    desc: "Les deux ennemis naturels se font face dans le même désert.",
    cartes: [
      { id: "ex2-73", set: "ex2", num: "73", nom: "Séviper", file: "seviper-ex2-73.png" },
      { id: "ex2-84", set: "ex2", num: "84", nom: "Mangriff", file: "mangriff-ex2-84.png" }
    ]
  },
  {
    id: "seleroc-solaroc-aura",
    titre: "L'Aura Cosmique",
    extension: "EX Gardiens de Cristal",
    format: "duo",
    desc: "L'aura d'énergie qui entoure les deux Pokémon se complète.",
    cartes: [
      { id: "ex14-37", set: "ex14", num: "37", nom: "Séléroc", file: "seleroc-ex14-37.png" },
      { id: "ex14-41", set: "ex14", num: "41", nom: "Solaroc", file: "solaroc-ex14-41.png" }
    ]
  },
  {
    id: "double-crise-duo",
    titre: "Double Crise",
    extension: "Team Aqua vs Team Magma",
    format: "duo",
    desc: "Leurs attaques élémentaires se heurtent au centre.",
    cartes: [
      { id: "dc1-14", set: "dc1", num: "14", nom: "Kyogre de la Team Aqua", file: "kyogre-dc1-14.png" },
      { id: "dc1-15", set: "dc1", num: "15", nom: "Groudon de la Team Magma", file: "groudon-dc1-15.png" }
    ]
  },
  {
    id: "hgss-hooh",
    titre: "Ho-Oh LÉGENDE",
    extension: "HeartGold & SoulSilver",
    format: "legend",
    desc: "Assemblage de la moitié haute et basse de Ho-Oh.",
    cartes: [
      { id: "hgss1-111", set: "hgss1", num: "111", nom: "Ho-Oh LÉGENDE (Haut)", file: "hooh-legend-haut.png" },
      { id: "hgss1-112", set: "hgss1", num: "112", nom: "Ho-Oh LÉGENDE (Bas)", file: "hooh-legend-bas.png" }
    ]
  },
  {
    id: "hgss-lugia",
    titre: "Lugia LÉGENDE",
    extension: "HeartGold & SoulSilver",
    format: "legend",
    desc: "Assemblage de la moitié haute et basse de Lugia.",
    cartes: [
      { id: "hgss1-113", set: "hgss1", num: "113", nom: "Lugia LÉGENDE (Haut)", file: "lugia-legend-haut.png" },
      { id: "hgss1-114", set: "hgss1", num: "114", nom: "Lugia LÉGENDE (Bas)", file: "lugia-legend-bas.png" }
    ]
  },
  {
    id: "hgss-entei-raikou",
    titre: "Entei & Raikou LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "hgss2-90", set: "hgss2", num: "90", nom: "Entei & Raikou LÉGENDE (Haut)", file: "entei-raikou-haut.png" },
      { id: "hgss2-91", set: "hgss2", num: "91", nom: "Entei & Raikou LÉGENDE (Bas)", file: "entei-raikou-bas.png" }
    ]
  },
  {
    id: "hgss-raikou-suicune",
    titre: "Raikou & Suicune LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "hgss2-92", set: "hgss2", num: "92", nom: "Raikou & Suicune LÉGENDE (Haut)", file: "raikou-suicune-haut.png" },
      { id: "hgss2-93", set: "hgss2", num: "93", nom: "Raikou & Suicune LÉGENDE (Bas)", file: "raikou-suicune-bas.png" }
    ]
  },
  {
    id: "hgss-suicune-entei",
    titre: "Suicune & Entei LÉGENDE",
    extension: "Déchaînement",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "hgss2-94", set: "hgss2", num: "94", nom: "Suicune & Entei LÉGENDE (Haut)", file: "suicune-entei-haut.png" },
      { id: "hgss2-95", set: "hgss2", num: "95", nom: "Suicune & Entei LÉGENDE (Bas)", file: "suicune-entei-bas.png" }
    ]
  },
  {
    id: "hgss-kyogre-groudon",
    titre: "Kyogre & Groudon LÉGENDE",
    extension: "Indomptable",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "hgss3-87", set: "hgss3", num: "87", nom: "Kyogre & Groudon LÉGENDE (Haut)", file: "kyogre-groudon-haut.png" },
      { id: "hgss3-88", set: "hgss3", num: "88", nom: "Kyogre & Groudon LÉGENDE (Bas)", file: "kyogre-groudon-bas.png" }
    ]
  },
  {
    id: "hgss-rayquaza-deoxys",
    titre: "Rayquaza & Deoxys LÉGENDE",
    extension: "Indomptable",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "hgss3-89", set: "hgss3", num: "89", nom: "Rayquaza & Deoxys LÉGENDE (Haut)", file: "rayquaza-deoxys-haut.png" },
      { id: "hgss3-90", set: "hgss3", num: "90", nom: "Rayquaza & Deoxys LÉGENDE (Bas)", file: "rayquaza-deoxys-bas.png" }
    ]
  },
  {
    id: "hgss-darkrai-cresselia",
    titre: "Darkrai & Cresselia LÉGENDE",
    extension: "Triomphe",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "hgss4-99", set: "hgss4", num: "99", nom: "Darkrai & Cresselia LÉGENDE (Haut)", file: "darkrai-cresselia-haut.png" },
      { id: "hgss4-100", set: "hgss4", num: "100", nom: "Darkrai & Cresselia LÉGENDE (Bas)", file: "darkrai-cresselia-bas.png" }
    ]
  },
  {
    id: "hgss-dialga-palkia",
    titre: "Dialga & Palkia LÉGENDE",
    extension: "Triomphe",
    format: "legend",
    desc: "Moitiés haute et basse.",
    cartes: [
      { id: "hgss4-101", set: "hgss4", num: "101", nom: "Dialga & Palkia LÉGENDE (Haut)", file: "dialga-palkia-haut.png" },
      { id: "hgss4-102", set: "hgss4", num: "102", nom: "Dialga & Palkia LÉGENDE (Bas)", file: "dialga-palkia-bas.png" }
    ]
  }
];

// 2. CHRONIQUES : LA NARRATION & LES PERSPECTIVES CROISÉES
const chroniquesDatabase = [
  {
    id: "tarsal-famille-trio",
    titre: "La Famille (L'histoire d'une vie)",
    extension: "Écarlate & Violet",
    format: "trio",
    desc: "L'histoire d'une famille de l'emménagement à la vieillesse.",
    cartes: [
      { id: "sv1-211", set: "sv1", num: "211", nom: "Tarsal", file: "tarsal-sv1-211.png" },
      { id: "sv1-212", set: "sv1", num: "212", nom: "Kirlia", file: "kirlia-sv1-212.png" },
      { id: "sv1-245", set: "sv1", num: "245", nom: "Gardevoir ex", file: "gardevoir-sv1-245.png" }
    ]
  },
  {
    id: "porygon-developpeur-trio",
    titre: "Le Développeur",
    extension: "Faille Paradoxe",
    format: "trio",
    desc: "L'évolution technologique dans la chambre d'un développeur.",
    cartes: [
      { id: "sv4-142", set: "sv4", num: "142", nom: "Porygon", file: "porygon-sv4-142.png" },
      { id: "sv4-143", set: "sv4", num: "143", nom: "Porygon2", file: "porygon2-sv4-143.png" },
      { id: "sv4-144", set: "sv4", num: "144", nom: "Porygon-Z", file: "porygonz-sv4-144.png" }
    ]
  },
  {
    id: "gruikui-parcours-vie-trio",
    titre: "Le Parcours de Vie",
    extension: "Guerriers Mythiques",
    format: "trio",
    desc: "Un enfant grandit, se marie et devient père avec son Pokémon.",
    cartes: [
      { id: "bw11-RC5", set: "bw11", num: "RC5", nom: "Gruikui", file: "gruikui-rc5.png" },
      { id: "bw11-RC6", set: "bw11", num: "RC6", nom: "Grotichon", file: "grotichon-rc6.png" },
      { id: "bw11-RC7", set: "bw11", num: "RC7", nom: "Roitiflam", file: "roitiflam-rc7.png" }
    ]
  },
  {
    id: "salameche-explorateur-trio",
    titre: "L'Explorateur",
    extension: "Générations",
    format: "trio",
    desc: "Un enfant déguisé en Salamèche grandit pour voler avec son partenaire.",
    cartes: [
      { id: "g1-RC3", set: "g1", num: "RC3", nom: "Salamèche", file: "salameche-rc3.png" },
      { id: "g1-RC4", set: "g1", num: "RC4", nom: "Reptincel", file: "reptincel-rc4.png" },
      { id: "g1-RC5", set: "g1", num: "RC5", nom: "Dracaufeu", file: "dracaufeu-rc5.png" }
    ]
  },
  {
    id: "frigodo-chambre-trio",
    titre: "La Chambre d'Enfant",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "Le Pokémon grandit dans une chambre qui vieillit avec lui.",
    cartes: [
      { id: "sv2-057", set: "sv2", num: "057", nom: "Frigodo", file: "frigodo-sv2-057.png" },
      { id: "sv2-058", set: "sv2", num: "058", nom: "Cryodo", file: "cryodo-sv2-058.png" },
      { id: "sv2-210", set: "sv2", num: "210", nom: "Glaivodo", file: "glaivodo-sv2-210.png" }
    ]
  },
  {
    id: "poussacha-amitie-trio",
    titre: "L'Amitié Grandissante",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "La complicité grandissante avec son dresseur au fil des années.",
    cartes: [
      { id: "sv2-196", set: "sv2", num: "196", nom: "Poussacha", file: "poussacha-sv2-196.png" },
      { id: "sv2-197", set: "sv2", num: "197", nom: "Matourgeon", file: "matourgeon-sv2-197.png" },
      { id: "sv2-256", set: "sv2", num: "256", nom: "Miascarade ex", file: "miascarade-sv2-256.png" }
    ]
  },
  {
    id: "chochodile-chant-trio",
    titre: "La Voix du Feu",
    extension: "Évolutions à Paldéa",
    format: "trio",
    desc: "Un Pokémon timide devenant un puissant chanteur d'opéra.",
    cartes: [
      { id: "sv2-201", set: "sv2", num: "201", nom: "Chochodile", file: "chochodile-sv2-201.png" },
      { id: "sv2-202", set: "sv2", num: "202", nom: "Crocogril", file: "crocogril-sv2-202.png" },
      { id: "sv2-258", set: "sv2", num: "258", nom: "Flâmigator ex", file: "flamigator-sv2-258.png" }
    ]
  },
  {
    id: "kanto-bulbizarre-trio",
    titre: "L'Ascension de Kanto : Flore",
    extension: "151",
    format: "trio",
    desc: "L'évolution à travers la canopée et la forêt.",
    cartes: [
      { id: "sv3pt5-166", set: "sv3pt5", num: "166", nom: "Bulbizarre", file: "bulbizarre-151-166.png" },
      { id: "sv3pt5-167", set: "sv3pt5", num: "167", nom: "Herbizarre", file: "herbizarre-151-167.png" },
      { id: "sv3pt5-198", set: "sv3pt5", num: "198", nom: "Florizarre ex", file: "florizarre-151-198.png" }
    ]
  },
  {
    id: "kanto-salameche-trio",
    titre: "L'Ascension de Kanto : Flamme",
    extension: "151",
    format: "trio",
    desc: "L'évolution à travers les canyons jusqu'au vol au-dessus du monde.",
    cartes: [
      { id: "sv3pt5-168", set: "sv3pt5", num: "168", nom: "Salamèche", file: "salameche-151-168.png" },
      { id: "sv3pt5-169", set: "sv3pt5", num: "169", nom: "Reptincel", file: "reptincel-151-169.png" },
      { id: "sv3pt5-199", set: "sv3pt5", num: "199", nom: "Dracaufeu ex", file: "dracaufeu-151-199.png" }
    ]
  },
  {
    id: "kanto-carapuce-trio",
    titre: "L'Ascension de Kanto : Marée",
    extension: "151",
    format: "trio",
    desc: "L'évolution des profondeurs vers la surface.",
    cartes: [
      { id: "sv3pt5-170", set: "sv3pt5", num: "170", nom: "Carapuce", file: "carapuce-151-170.png" },
      { id: "sv3pt5-171", set: "sv3pt5", num: "171", nom: "Carabaffe", file: "carabaffe-151-171.png" },
      { id: "sv3pt5-200", set: "sv3pt5", num: "200", nom: "Tortank ex", file: "tortank-151-200.png" }
    ]
  },
  {
    id: "ectoplasma-nuit-trio",
    titre: "La Nuit en Ville",
    extension: "Forces Temporelles",
    format: "trio",
    desc: "Parcours nocturne et espiègle dans les rues illuminées.",
    cartes: [
      { id: "sv5-177", set: "sv5", num: "177", nom: "Fantominus", file: "fantominus-sv5-177.png" },
      { id: "sv5-178", set: "sv5", num: "178", nom: "Spectrum", file: "spectrum-sv5-178.png" },
      { id: "sv5-208", set: "sv5", num: "208", nom: "Ectoplasma ex", file: "ectoplasma-sv5-208.png" }
    ]
  },
  {
    id: "pohm-concert-trio",
    titre: "Le Concert",
    extension: "Destinées de Paldéa",
    format: "trio",
    desc: "La foule s'amasse pour un concert au fil des cartes.",
    cartes: [
      { id: "sv4pt5-073", set: "sv4pt5", num: "073", nom: "Pohm", file: "pohm-sv4pt5-073.png" },
      { id: "sv4pt5-074", set: "sv4pt5", num: "074", nom: "Pohmotte", file: "pohmotte-sv4pt5-074.png" },
      { id: "sv4pt5-075", set: "sv4pt5", num: "075", nom: "Pohmarmotte", file: "pohmarmotte-sv4pt5-075.png" }
    ]
  },
  {
    id: "skelenox-brume-trio",
    titre: "L'Errance dans la Brume",
    extension: "Fable Nébuleuse",
    format: "trio",
    desc: "Progression mystique dans la brume.",
    cartes: [
      { id: "sv6pt5-068", set: "sv6pt5", num: "068", nom: "Skelénox", file: "skelenox-sv6pt5-068.png" },
      { id: "sv6pt5-069", set: "sv6pt5", num: "069", nom: "Téraclope", file: "teraclope-sv6pt5-069.png" },
      { id: "sv6pt5-070", set: "sv6pt5", num: "070", nom: "Noctunoir", file: "noctunoir-sv6pt5-070.png" }
    ]
  },
  {
    id: "granivol-ascension-trio",
    titre: "L'Ascension Végétale",
    extension: "Évolution Céleste",
    format: "trio",
    desc: "Le point de vue s'élève : du sol vers les nuages.",
    cartes: [
      { id: "swsh7-002", set: "swsh7", num: "002", nom: "Granivol", file: "granivol-swsh7-002.png" },
      { id: "swsh7-003", set: "swsh7", num: "003", nom: "Floravol", file: "floravol-swsh7-003.png" },
      { id: "swsh7-004", set: "swsh7", num: "004", nom: "Cotovol", file: "cotovol-swsh7-004.png" }
    ]
  },
  {
    id: "rongourmand-chute-duo",
    titre: "La Chute des Baies",
    extension: "Épée & Bouclier",
    format: "duo",
    desc: "Rongourmand stocke des baies, mais la branche cède sous son poids.",
    cartes: [
      { id: "swsh1-153", set: "swsh1", num: "153", nom: "Rongourmand", file: "rongourmand-swsh1-153.png" },
      { id: "swsh1-154", set: "swsh1", num: "154", nom: "Rongrigou", file: "rongrigou-swsh1-154.png" }
    ]
  },
  {
    id: "fenetre-pluie-duo",
    titre: "Fenêtre sur la Pluie",
    extension: "Faille Paradoxe",
    format: "duo",
    desc: "Vue de l'intérieur vs Vue de l'extérieur.",
    cartes: [
      { id: "sv4-193", set: "sv4", num: "193", nom: "Posipi", file: "posipi-sv4-193.png" },
      { id: "sv4-194", set: "sv4", num: "194", nom: "Négapi", file: "negapi-sv4-194.png" }
    ]
  },
  {
    id: "mite-rampe-paradoxe",
    titre: "L'Affrontement Paradoxe",
    extension: "Faille Paradoxe",
    format: "duo",
    desc: "Le même combat vu depuis chacun des deux adversaires.",
    cartes: [
      { id: "sv4-187", set: "sv4", num: "187", nom: "Mite-de-Fer", file: "mite-fer-sv4-187.png" },
      { id: "sv4-203", set: "sv4", num: "203", nom: "Rampe-Ailes", file: "rampe-ailes-sv4-203.png" }
    ]
  },
  {
    id: "caninos-lithia-photo",
    titre: "Séance Photo",
    extension: "Mascarade Crépusculaire",
    format: "duo",
    desc: "Caninos et Lithia se prennent mutuellement en photo.",
    cartes: [
      { id: "sv6-181", set: "sv6", num: "181", nom: "Caninos de Hisui", file: "caninos-sv6-181.png" },
      { id: "sv6-207", set: "sv6", num: "207", nom: "Lithia", file: "lithia-sv6-207.png" }
    ]
  },
  {
    id: "saisons-vivaldaim-duo",
    titre: "Les Saisons",
    extension: "Forces Temporelles",
    format: "duo",
    desc: "Le même paysage immortalisé à différentes saisons.",
    cartes: [
      { id: "sv5-165", set: "sv5", num: "165", nom: "Vivaldaim", file: "vivaldaim-sv5-165.png" },
      { id: "sv5-166", set: "sv5", num: "166", nom: "Haydaim", file: "haydaim-sv5-166.png" }
    ]
  },
  {
    id: "seleroc-solaroc-dos",
    titre: "Jour et Nuit",
    extension: "Zénith Suprême",
    format: "duo",
    desc: "Les deux Pokémon combattant dos à dos.",
    cartes: [
      { id: "swsh12pt5gg-GG11", set: "swsh12pt5gg", num: "GG11", nom: "Séléroc", file: "seleroc-gg11.png" },
      { id: "swsh12pt5gg-GG15", set: "swsh12pt5gg", num: "GG15", nom: "Solaroc", file: "solaroc-gg15.png" }
    ]
  },
  {
    id: "miaouss-sepiatop-vol",
    titre: "Le Vol de Baie",
    extension: "Ciel Rugissant",
    format: "duo",
    desc: "La course-poursuite vue sous deux angles opposés.",
    cartes: [
      { id: "xy6-67", set: "xy6", num: "67", nom: "Miaouss", file: "miaouss-xy6-67.png" },
      { id: "xy6-45", set: "xy6", num: "45", nom: "Sepiatop", file: "sepiatop-xy6-45.png" }
    ]
  },
  {
    id: "natu-frison-dos",
    titre: "Le Voyage sur le Dos",
    extension: "Ciel Rugissant",
    format: "duo",
    desc: "Natu perché sur les cornes de Frison en pleine course.",
    cartes: [
      { id: "xy6-28", set: "xy6", num: "28", nom: "Natu", file: "natu-xy6-28.png" },
      { id: "xy6-68", set: "xy6", num: "68", nom: "Frison", file: "frison-xy6-68.png" }
    ]
  },
  {
    id: "arakdo-moustillon-eau",
    titre: "Rencontre Aquatique",
    extension: "Offensive Vapeur",
    format: "duo",
    desc: "Vue sous-marine vs vue aérienne d'une même rencontre.",
    cartes: [
      { id: "xy11-13", set: "xy11", num: "13", nom: "Arakdo", file: "arakdo-xy11-13.png" },
      { id: "xy11-30", set: "xy11", num: "30", nom: "Moustillon", file: "moustillon-xy11-30.png" }
    ]
  },
  {
    id: "miamiasme-brocelome-amitie",
    titre: "L'Amitié dans la Ruelle",
    extension: "Rupture Turbo",
    format: "duo",
    desc: "D'une fuite craintive à une partie de jeu dans la ruelle.",
    cartes: [
      { id: "xy9-55", set: "xy9", num: "55", nom: "Brocélôme", file: "brocelome-xy9-55.png" },
      { id: "xy9-65", set: "xy9", num: "65", nom: "Miamiasme", file: "miamiasme-xy9-65.png" }
    ]
  },
  {
    id: "caninos-miamiasme-rue",
    titre: "La Bagarre de Rue",
    extension: "Clash des Rebelles",
    format: "duo",
    desc: "Caninos aboie dans la rue tandis que Miamiasme fuit terrifié.",
    cartes: [
      { id: "swsh2-027", set: "swsh2", num: "027", nom: "Caninos", file: "caninos-swsh2-027.png" },
      { id: "swsh2-117", set: "swsh2", num: "117", nom: "Miamiasme", file: "miamiasme-swsh2-117.png" }
    ]
  },
  {
    id: "statitik-pitrouille-nuit",
    titre: "La Balade Nocturne",
    extension: "Forces Fantômes",
    format: "duo",
    desc: "Les deux Pokémon apparaissent mutuellement en arrière-plan.",
    cartes: [
      { id: "xy4-26", set: "xy4", num: "26", nom: "Statitik", file: "statitik-xy4-26.png" },
      { id: "xy4-44", set: "xy4", num: "44", nom: "Pitrouille", file: "pitrouille-xy4-44.png" }
    ]
  },
  {
    id: "abo-smogo-grotte",
    titre: "L'Abri dans la Grotte",
    extension: "Destinées Occultes",
    format: "duo",
    desc: "Les deux Pokémon de la Team Rocket face à face dans la même grotte.",
    cartes: [
      { id: "sm115-25", set: "sm115", num: "25", nom: "Abo", file: "abo-sm115-25.png" },
      { id: "sm115-28", set: "sm115", num: "28", nom: "Smogo", file: "smogo-sm115-28.png" }
    ]
  },
  {
    id: "polagriffe-grelacon-blizzard",
    titre: "Le Blizzard Protecteur",
    extension: "Règne de Glace",
    format: "duo",
    desc: "Polagriffe protège Grelaçon, vu sous deux angles différents.",
    cartes: [
      { id: "swsh6-042", set: "swsh6", num: "042", nom: "Grelaçon", file: "grelacon-swsh6-042.png" },
      { id: "swsh6-043", set: "swsh6", num: "043", nom: "Polagriffe", file: "polagriffe-swsh6-043.png" }
    ]
  }
];

function getSceneCardPath(file) {
  return `./assets/cards/chroniques/${file}`;
}

// Compatibilité double : Navigateur (window) + Node.js (CommonJS)
if (typeof window !== 'undefined') {
  window.odysseeDatabase = odysseeDatabase;
  window.chroniquesDatabase = chroniquesDatabase;
  window.getSceneCardPath = getSceneCardPath;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { odysseeDatabase, chroniquesDatabase, getSceneCardPath };
}
