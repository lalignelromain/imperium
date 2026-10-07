document.addEventListener("DOMContentLoaded", () => {
    initOdyssee();
});

/**
 * Génère dynamiquement l'ensemble des modules d'Odyssée (9-box, quad, trio, duo, legend)
 */
function initOdyssee() {
    const container = document.getElementById("odyssee-content");
    if (!container || typeof ODYSSEE_SECTIONS === "undefined") return;

    let html = "";

    ODYSSEE_SECTIONS.forEach(section => {
        html += `
            <section class="assembly-section" id="${section.id}">
                <h2 class="assembly-section-title">${section.titre}</h2>
        `;

        section.scenes.forEach(scene => {
            // Sélection automatique de la classe de grille selon le type
            let boxClass = "duo-box";
            if (scene.type === "nine") boxClass = "nine-box";
            else if (scene.type === "quad") boxClass = "quad-box";
            else if (scene.type === "trio") boxClass = "trio-box";
            else if (scene.type === "legend") boxClass = "legend-box";

            html += `
                <article class="assembly-unit">
                    <div class="scene-header">
                        <h3 class="scene-title">${scene.titre}</h3>
                        <p class="scene-meta">${scene.extension}</p>
                    </div>

                    <div class="assembly-box ${boxClass}">
            `;

            scene.cartes.forEach(carte => {
                html += `
                    <div class="pocket" title="${carte.nom} (${carte.numero})">
                        <img src="${carte.image}" 
                             data-fallback="${carte.fallback || ''}"
                             alt="${carte.nom}" 
                             loading="lazy" 
                             onerror="handleOdysseeImageError(this)">
                        <div class="pocket-placeholder" style="display: none;">
                            <span class="placeholder-name">${carte.nom}</span>
                            <span class="placeholder-icon">🌌</span>
                            <span class="placeholder-num">${carte.numero}</span>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                    <p class="scene-desc">${scene.description}</p>
                </article>
            `;
        });

        html += `</section>`;
    });

    container.innerHTML = html;
}

/**
 * Gestionnaire d'erreur miroir & fallback
 */
function handleOdysseeImageError(img) {
    const fallback = img.getAttribute("data-fallback");
    if (fallback && img.src !== fallback) {
        img.src = fallback;
    } else {
        img.style.display = "none";
        const placeholder = img.nextElementSibling;
        if (placeholder) {
            placeholder.style.display = "flex";
        }
    }
}

/**
 * Bascule Classeur vs Art Pur pour Odyssée
 * @param {'classeur'|'art'} mode
 */
function setOdysseeMode(mode) {
    const btnClasseur = document.getElementById("btn-classeur");
    const btnArt = document.getElementById("btn-art");

    if (mode === "art") {
        document.body.classList.remove("mode-classeur");
        document.body.classList.add("mode-art-pur");
        btnArt.classList.add("active");
        btnClasseur.classList.remove("active");
    } else {
        document.body.classList.remove("mode-art-pur");
        document.body.classList.add("mode-classeur");
        btnClasseur.classList.add("active");
        btnArt.classList.remove("active");
    }
}
