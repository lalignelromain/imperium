document.addEventListener("DOMContentLoaded", function() {
    let cheminActuel = window.location.pathname;
    let pokemonCible = "";

    if (cheminActuel.includes("mewtwo.html")) {
        pokemonCible = "mewtwo";
    } else {
        if (cheminActuel.includes("mew.html")) {
            pokemonCible = "mew";
        }
    }

    if (pokemonCible !== "") {
        chargerPagePokédex(pokemonCible);
    }
});

function recupererCartesTriees(nomPokemon) {
    let listeFiltree = [];

    for (let i = 0; i < TOUTES_LES_CARTES.length; i++) {
        if (TOUTES_LES_CARTES[i].pokemon === nomPokemon) {
            listeFiltree.push(TOUTES_LES_CARTES[i]);
        }
    }

    listeFiltree.sort(function(a, b) {
        if (a.annee < b.annee) {
            return -1;
        }
        if (a.annee > b.annee) {
            return 1;
        }
        if (a.ordre < b.ordre) {
            return -1;
        }
        if (a.ordre > b.ordre) {
            return 1;
        }
        return 0;
    });

    return listeFiltree;
}

function chargerPagePokédex(nomPokemon) {
    let conteneurGrille = document.getElementById("card-grid");

    if (conteneurGrille !== null) {
        let cartesLocales = recupererCartesTriees(nomPokemon);
        conteneurGrille.innerHTML = "";

        for (let i = 0; i < cartesLocales.length; i++) {
            let carte = cartesLocales[i];

            let carteDiv = document.createElement("div");
            carteDiv.style.border = "1px solid #444";
            carteDiv.style.padding = "10px";
            carteDiv.style.margin = "10px";
            carteDiv.style.display = "inline-block";
            carteDiv.style.width = "180px";
            carteDiv.style.textAlign = "center";
            carteDiv.style.background = "#1e1e1e";
            carteDiv.style.color = "#fff";
            carteDiv.style.verticalAlign = "top";

            let titreP = document.createElement("h4");
            titreP.textContent = carte.nom;
            carteDiv.appendChild(titreP);

            let infoP = document.createElement("p");
            infoP.textContent = carte.extension + " (" + carte.numero + ")";
            infoP.style.fontSize = "11px";
            infoP.style.color = "#aaa";
            carteDiv.appendChild(infoP);

            let img = document.createElement("img");
            img.style.maxWidth = "140px";
            img.style.height = "195px";
            img.style.objectFit = "contain";
            img.alt = carte.nom;

            let codeSet = obtenirCodeExtensionApi(carte.extension);
            img.src = "https://images.pokemontcg.io/" + codeSet + "/" + carte.numero + ".png";

            img.onerror = function() {
                let fallbackBox = document.createElement("div");
                fallbackBox.style.width = "140px";
                fallbackBox.style.height = "195px";
                fallbackBox.style.background = "#2a2a2a";
                fallbackBox.style.border = "1px dashed #666";
                fallbackBox.style.display = "flex";
                fallbackBox.style.alignItems = "center";
                fallbackBox.style.justifyContent = "center";
                fallbackBox.style.margin = "0 auto";
                fallbackBox.style.fontSize = "12px";
                fallbackBox.style.color = "#888";
                fallbackBox.style.padding = "10px";
                fallbackBox.style.boxSizing = "border-box";
                fallbackBox.textContent = "Visuel non disponible (" + carte.extension + ")";

                this.parentNode.replaceChild(fallbackBox, this);
            };

            carteDiv.appendChild(img);
            conteneurGrille.appendChild(carteDiv);
        }
    }
}

function obtenirCodeExtensionApi(nomExtension) {
    if (nomExtension === "Set de Base") return "base1";
    if (nomExtension === "Gym Challenge") return "gym2";
    if (nomExtension === "Neo Destiny") return "neo4"; // Identifiant officiel
    if (nomExtension === "Expédition") return "ecard1";
    if (nomExtension === "EX Rubis & Saphir") return "ex1";
    if (nomExtension === "EX Team Rocket Returns") return "ex7"; // Identifiant officiel
    if (nomExtension === "EX Espèces Delta") return "ex11"; // Identifiant officiel
    if (nomExtension === "EX Fantômes Holon") return "ex13"; // Identifiant officiel
    if (nomExtension === "Éveil des Légendes") return "dp6"; // Identifiant officiel
    if (nomExtension === "Destinées Futures") return "bw4"; // Identifiant officiel
    if (nomExtension === "Impulsion TURBO") return "xy8"; 
    if (nomExtension === "Légendes Brillantes") return "sm35"; // Identifiant demi série 3.5
    if (nomExtension === "Pokémon GO") return "pgo";
    if (nomExtension === "151") return "sv3pt5";
    if (nomExtension === "Îles du Sud") return "si1";
    if (nomExtension === "EX Créateurs de Légendes") return "ex12";
    if (nomExtension === "Merveilles Secrètes") return "dp3";
    if (nomExtension === "Triomphe") return "hgss4";
    if (nomExtension === "Dragons Exaltés") return "bw6";
    if (nomExtension === "Impact des Destins") return "xy10";
    if (nomExtension === "Évolutions") return "xy12";
    if (nomExtension === "Harmonie des Esprits") return "sm11";
    if (nomExtension === "Célébrations") return "cel25";
    if (nomExtension === "Poing de Fusion") return "swsh8";
    return "base1";
}
