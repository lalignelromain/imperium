/* ====================================================================
   MEWTHOLOGY — BASE DE DONNÉES : DRESSEUSES FULL ART
==================================================================== */

const dresseusesDatabase = [
  {
    categorie: "Les Iconiques & Ultra-Cotes",
    cartes: [
      { id: "lilie-up-139", nom: "Lilie", set: "sm5", num: "139", file: "lilie-sm5-139.png", fileAlt: "lilie-sm5-139-alt.png" },
      { id: "lilie-ce-246", nom: "Lilie", set: "sm12", num: "246", file: "lilie-sm12-246.png", fileAlt: "lilie-sm12-246-alt.png" },
      { id: "rosemary-ss-200", nom: "Rosemary", set: "swsh1", num: "200", file: "rosemary-swsh1-200.png", fileAlt: "rosemary-swsh1-200-alt.png" },
      { id: "rosemary-sf-121", nom: "Rosemary", set: "swsh45v", num: "SV121", file: "rosemary-swsh45-121.png", fileAlt: "rosemary-swsh45-121-alt.png" },
      { id: "cynthia-up-148", nom: "Cynthia", set: "sm5", num: "148", file: "cynthia-sm5-148.png", fileAlt: "cynthia-sm5-148-alt.png" },
      { id: "cynthia-bs-169", nom: "Cynthia (Ambition)", set: "swsh9", num: "169", file: "cynthia-swsh9-169.png", fileAlt: "cynthia-swsh9-169-alt.png" },
      { id: "cynthia-bs-tg27", nom: "Cynthia (Ambition)", set: "swsh9tg", num: "TG27", file: "cynthia-swsh9-tg27.png", fileAlt: "cynthia-swsh9-tg27-alt.png" },
      { id: "macha-pal-269", nom: "Macha", set: "sv2", num: "269", file: "macha-sv2-269.png", fileAlt: "macha-sv2-269-alt.png" },
      { id: "macha-paf-237", nom: "Macha", set: "sv4pt5", num: "237", file: "macha-sv4pt5-237.png", fileAlt: "macha-sv4pt5-237-alt.png" },
      { id: "nacchara-ar-186", nom: "Nacchara", set: "swsh10", num: "186", file: "nacchara-swsh10-186.png", fileAlt: "nacchara-swsh10-186-alt.png" },
      { id: "nacchara-cz-63", nom: "Nacchara", set: "swsh12pt5gg", num: "GG63", file: "nacchara-swsh12pt5-63.png", fileAlt: "nacchara-swsh12pt5-63-alt.png" }
    ]
  },
  {
    categorie: "Les Protagonistes, Rivales & Héroïnes",
    cartes: [
      { id: "serena-st-193", nom: "Serena", set: "swsh11", num: "193", file: "serena-swsh11-193.png", fileAlt: "serena-swsh11-193-alt.png" },
      { id: "cardamine-ce-236", nom: "Cardamine", set: "sm12", num: "236", file: "cardamine-sm12-236.png", fileAlt: "cardamine-sm12-236-alt.png" },
      { id: "gloria-fs-236", nom: "Gloria", set: "swsh8", num: "236", file: "gloria-swsh8-236.png", fileAlt: "gloria-swsh8-236-alt.png" },
      { id: "clara-cr-194", nom: "Clara", set: "swsh6", num: "194", file: "clara-swsh6-194.png", fileAlt: "clara-swsh6-194-alt.png" },
      { id: "aurore-cz-149", nom: "Aurore", set: "swsh12pt5", num: "149", file: "aurore-swsh12pt5-149.png", fileAlt: "aurore-swsh12pt5-149-alt.png" },
      { id: "flora-lo-181", nom: "Flora", set: "swsh11", num: "181", file: "flora-swsh11-181.png", fileAlt: "flora-swsh11-181-alt.png" },
      { id: "selene-promo-401", nom: "Selene", set: "smp", num: "401", file: "selene-smp-401.png", fileAlt: "selene-smp-401-alt.png" },
      { id: "juana-tf-209", nom: "Juana", set: "sv5", num: "209", file: "juana-sv5-209.png", fileAlt: "juana-sv5-209-alt.png" },
      { id: "menzi-pal-238", nom: "Menzi", set: "sv2", num: "238", file: "menzi-sv2-238.png", fileAlt: "menzi-sv2-238-alt.png" },
      { id: "camille-sf-92", nom: "Camille", set: "sv6pt5", num: "092", file: "camille-sv6pt5-092.png", fileAlt: "camille-sv6pt5-092-alt.png" }
    ]
  },
  {
    categorie: "Les Championnes d'Arène & Conseil 4",
    cartes: [
      { id: "ondine-um-235", nom: "Ondine", set: "sm11", num: "235", file: "ondine-sm11-235.png", fileAlt: "ondine-sm11-235-alt.png" },
      { id: "inezia-fs-260", nom: "Inezia", set: "swsh8", num: "260", file: "inezia-swsh8-260.png", fileAlt: "inezia-swsh8-260-alt.png" },
      { id: "inezia-cz-147", nom: "Inezia", set: "swsh12pt5", num: "147", file: "inezia-swsh12pt5-147.png", fileAlt: "inezia-swsh12pt5-147-alt.png" },
      { id: "donna-vv-183", nom: "Donna", set: "swsh4", num: "183", file: "donna-swsh4-183.png", fileAlt: "donna-swsh4-183-alt.png" },
      { id: "anemone-sf-72", nom: "Anémone", set: "swsh45", num: "072", file: "anemone-swsh45-072.png", fileAlt: "anemone-swsh45-072-alt.png" },
      { id: "morgane-tu-154", nom: "Morgane", set: "sm9", num: "154", file: "morgane-sm9-154.png", fileAlt: "morgane-sm9-154-alt.png" },
      { id: "erika-tu-149", nom: "Erika", set: "sm9", num: "149", file: "erika-sm9-149.png", fileAlt: "erika-sm9-149-alt.png" },
      { id: "erika-151-203", nom: "Erika", set: "sv3pt5", num: "203", file: "erika-sv3pt5-203.png", fileAlt: "erika-sv3pt5-203-alt.png" },
      { id: "alizee-rs-108", nom: "Alizée", set: "xy6", num: "108", file: "alizee-xy6-108.png", fileAlt: "alizee-xy6-108-alt.png" },
      { id: "valeriane-ao-107", nom: "Valériane", set: "xy7", num: "107", file: "valeriane-xy7-107.png", fileAlt: "valeriane-xy7-107-alt.png" },
      { id: "sally-vv-184", nom: "Sally", set: "swsh4", num: "184", file: "sally-swsh4-184.png", fileAlt: "sally-swsh4-184-alt.png" },
      { id: "faiza-vv-180", nom: "Faïza", set: "swsh4", num: "180", file: "faiza-swsh4-180.png", fileAlt: "faiza-swsh4-180-alt.png" },
      { id: "melony-cr-195", nom: "Melony", set: "swsh6", num: "195", file: "melony-swsh6-195.png", fileAlt: "melony-swsh6-195-alt.png" },
      { id: "melony-cr-tg26", nom: "Melony", set: "swsh6tg", num: "TG26", file: "melony-swsh6-tg26.png", fileAlt: "melony-swsh6-tg26-alt.png" },
      { id: "barbara-gr-129", nom: "Barbara", set: "sm2", num: "129", file: "barbara-sm2-129.png", fileAlt: "barbara-sm2-129-alt.png" },
      { id: "nephie-ci-105", nom: "Néphie", set: "sm4", num: "105", file: "nephie-sm4-105.png", fileAlt: "nephie-sm4-105-alt.png" },
      { id: "alyxia-bs-143", nom: "Alyxia", set: "sm3", num: "143", file: "alyxia-sm3-143.png", fileAlt: "alyxia-sm3-143-alt.png" },
      { id: "margie-bs-142", nom: "Margie", set: "sm3", num: "142", file: "margie-sm3-142.png", fileAlt: "margie-sm3-142-alt.png" },
      { id: "gladys-st-189", nom: "Gladys", set: "swsh11", num: "189", file: "gladys-swsh11-189.png", fileAlt: "gladys-swsh11-189-alt.png" },
      { id: "cayenn-pr-258", nom: "Cayenn", set: "sv4", num: "258", file: "cayenn-sv4-258.png", fileAlt: "cayenn-sv4-258-alt.png" },
      { id: "bruyere-of-227", nom: "Bruyère", set: "sv3", num: "227", file: "bruyere-sv3-227.png", fileAlt: "bruyere-sv3-227-alt.png" }
    ]
  },
  {
    categorie: "Les Classes de Dresseuses Génériques & NPCs",
    cartes: [
      { id: "blanche-pgo-227", nom: "Blanche", set: "pgo", num: "227", file: "blanche-pgo-227.png", fileAlt: "blanche-pgo-227-alt.png" },
      { id: "courtney-lo-171", nom: "Courtney", set: "swsh11", num: "171", file: "courtney-swsh11-171.png", fileAlt: "courtney-swsh11-171-alt.png" },
      { id: "apia-pal-240", nom: "Apia", set: "sv2", num: "240", file: "apia-sv2-240.png", fileAlt: "apia-sv2-240-alt.png" },
      { id: "olim-pr-256", nom: "Olim", set: "sv4", num: "256", file: "olim-sv4-256.png", fileAlt: "olim-sv4-256-alt.png" },
      { id: "chloe-es-180", nom: "Chloé", set: "swsh7", num: "180", file: "chloe-swsh7-180.png", fileAlt: "chloe-swsh7-180-alt.png" },
      { id: "elsamina-ci-110", nom: "Elsa-Mina", set: "sm4", num: "110", file: "elsamina-sm4-110.png", fileAlt: "elsamina-sm4-110-alt.png" },
      { id: "oxy-bs-145", nom: "Oxy", set: "sm3", num: "145", file: "oxy-sm3-145.png", fileAlt: "oxy-sm3-145-alt.png" },
      { id: "danseuse-fs-259", nom: "Danseuse", set: "swsh8", num: "259", file: "danseuse-swsh8-259.png", fileAlt: "danseuse-swsh8-259-alt.png" },
      { id: "ecoliere-fs-262", nom: "Écolière", set: "swsh8", num: "262", file: "ecoliere-swsh8-262.png", fileAlt: "ecoliere-swsh8-262-alt.png" },
      { id: "aroma-es-141", nom: "Faiseuse d'Arômes", set: "swsh7", num: "141", file: "aroma-swsh7-141.png", fileAlt: "aroma-swsh7-141-alt.png" },
      { id: "lady-lo-193", nom: "Mademoiselle", set: "swsh11", num: "193", file: "lady-swsh11-193.png", fileAlt: "lady-swsh11-193-alt.png" },
      { id: "kimono-st-190", nom: "Fille en Kimono", set: "swsh11", num: "190", file: "kimono-swsh11-190.png", fileAlt: "kimono-swsh11-190-alt.png" },
      { id: "infirmiere-ff-102", nom: "Dame du Centre Pokémon", set: "xy2", num: "102", file: "infirmiere-xy2-102.png", fileAlt: "infirmiere-xy2-102-alt.png" }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.dresseusesDatabase = dresseusesDatabase;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dresseusesDatabase };
}
