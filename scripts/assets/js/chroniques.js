document.addEventListener("DOMContentLoaded", () => {
    initChroniques();
});

function initChroniques() {
    const container = document.getElementById("chroniques-content");
    if (!container || typeof CHRONIQUES_SECTIONS === "undefined") return;

    let html = "";

    CHRONIQUES_SECTIONS.forEach(section => {
        html += `
            <section class="assembly-section" id="${section.id}">
                <h2 class="assembly-section-title">${section.titre}</h2>
        `;

        section.scenes.forEach(scene => {
            const boxClass = scene.type === "trio" ? "trio-box" : "duo-box";

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
                             onerror="handleImageError(this)">
                        <div class="pocket-placeholder" style="display: none;">
                            <span class="placeholder-name">${carte.nom}</span>
                            <span class="placeholder-icon">🎴</span>
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
 * Gère le repli d'image : tente l'API miroir de secours, sinon affiche le placeholder
 */
function handleImageError(img) {
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

function setChroniquesMode(mode) {
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
