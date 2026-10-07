/* ====================================================================
   SCRIPT PRINCIPAL - MEWTHOLOGY
   Arborescence : scripts/assets/
==================================================================== */

const STORAGE_KEY = 'mewthology_collection';

// 1. GESTION DU STOCKAGE LOCAL (LocalStorage)
function getCollection() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? new Set(JSON.parse(data)) : new Set();
}

function saveCollection(collectionSet) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(collectionSet)));
}

function toggleCard(cardId) {
    const collection = getCollection();
    if (collection.has(cardId)) {
        collection.delete(cardId);
    } else {
        collection.add(cardId);
    }
    saveCollection(collection);
    return collection.has(cardId);
}

// 2. UTILITAIRE IMAGES (Chemins relatifs avec fallback scripts/assets/img)
function resolveImg(path, langue) {
    if (!path) {
        return langue === 'ja' ? './scripts/assets/img/back-ja.png' : './scripts/assets/img/back-fr.png';
    }
    return path;
}

// 3. HUB 1 : POKÉDEX GLOBAL (Toutes les cartes + Clic pour ajouter/retirer)
function renderPokedex() {
    const container = document.getElementById('pokedex-grid') || document.getElementById('card-grid');
    if (!container || typeof cartesDatabase === 'undefined') return;

    const collection = getCollection();
    container.innerHTML = '';

    cartesDatabase.forEach(carte => {
        const isOwned = collection.has(carte.id);
        const cardDiv = document.createElement('div');
        const themeClass = carte.pokemon === 'mew' ? 'theme-mew' : 'theme-mewtwo';

        cardDiv.className = `card-item ${themeClass} ${isOwned ? 'is-owned' : 'not-owned'}`;
        cardDiv.dataset.id = carte.id;
        cardDiv.style.cursor = 'pointer';

        cardDiv.innerHTML = `
            <div class="card-status-badge">${isOwned ? '✓ Possédée' : '+ Ajouter'}</div>
            <img src="${resolveImg(carte.image, carte.langue)}" alt="${carte.nom} ${carte.numero}" loading="lazy">
            <div class="card-info">
                <div class="card-name">${carte.nom}</div>
                <div class="card-meta">${carte.extension} - #${carte.numero}</div>
            </div>
        `;

        // Clic sur la carte : ajoute ou retire de ta collection perso
        cardDiv.addEventListener('click', () => {
            const nowOwned = toggleCard(carte.id);
            cardDiv.classList.toggle('is-owned', nowOwned);
            cardDiv.classList.toggle('not-owned', !nowOwned);
            const badge = cardDiv.querySelector('.card-status-badge');
            if (badge) badge.textContent = nowOwned ? '✓ Possédée' : '+ Ajouter';
        });

        container.appendChild(cardDiv);
    });
}

// 4. HUBS 2 & 3 : COLLECTIONS PERSO (Filtrées par possession & groupées par extension)
function renderCollection(pokemonName, containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof cartesDatabase === 'undefined') return;

    const collection = getCollection();
    const cartesPossedees = cartesDatabase.filter(c => c.pokemon === pokemonName && collection.has(c.id));

    if (cartesPossedees.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #888; width: 100%;">
                <p>Aucune carte ${pokemonName === 'mew' ? 'Mew' : 'Mewtwo'} dans ta collection pour l'instant.</p>
                <a href="pokedex.html" style="color: #ff77a9; text-decoration: underline;">Accéder au Pokédex pour cocher tes cartes</a>
            </div>
        `;
        return;
    }

    // Regroupement par extension
    const parExtension = {};
    cartesPossedees.forEach(carte => {
        if (!parExtension[carte.extension]) {
            parExtension[carte.extension] = [];
        }
        parExtension[carte.extension].push(carte);
    });

    let html = '';
    for (const [extension, cartes] of Object.entries(parExtension)) {
        html += `
            <section class="extension-group" style="width: 100%; margin-bottom: 30px;">
                <h3 class="extension-title" style="border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 15px;">
                    ${extension} <span style="font-size: 0.8em; color: #888;">(${cartes.length})</span>
                </h3>
                <div class="cards-grid" style="display: flex; flex-wrap: wrap; gap: 15px;">
                    ${cartes.map(carte => `
                        <div class="card-item is-owned ${carte.pokemon === 'mew' ? 'theme-mew' : 'theme-mewtwo'}">
                            <img src="${resolveImg(carte.image, carte.langue)}" alt="${carte.nom}${carte.numero}" loading="lazy">
                            <div class="card-info">
                                <div class="card-name">${carte.nom}</div>
                                <div class="card-meta">#${carte.numero}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    container.innerHTML = html;
}

// 5. HUB 4 : PANTHÉON (Items scellés et cartes gradées)
function renderPantheon() {
    if (typeof pantheonDatabase === 'undefined') return;

    // Items scellés
    const scellesContainer = document.getElementById('scelles-grid');
    if (scellesContainer && pantheonDatabase.scelles) {
        scellesContainer.innerHTML = pantheonDatabase.scelles.map(item => `
            <div class="pantheon-item item-scelle">
                <img src="${resolveImg(item.image, item.langue)}" alt="${item.nom}" loading="lazy">
                <div class="item-info">
                    <h4>${item.nom}</h4>
                    <p style="font-size: 12px; color: #aaa;">${item.extension}</p>
                    <p style="font-size: 11px; color: #666;">${item.annee} • ${item.langue.toUpperCase()}</p>
                </div>
            </div>
        `).join('');
    }

    // Cartes gradées
    const gradeesContainer = document.getElementById('gradees-grid');
    if (gradeesContainer && pantheonDatabase.gradees) {
        gradeesContainer.innerHTML = pantheonDatabase.gradees.map(item => `
            <div class="pantheon-item item-gradee">
                <div class="grade-badge" style="background: #e5a93b; color: #000; font-weight: bold; font-size: 11px; padding: 2px 6px; display: inline-block; margin-bottom: 5px;">
                    ${item.societe} - ${item.note}
                </div>
                <img src="${resolveImg(item.imageFront, item.langue)}" alt="${item.nom}" loading="lazy">
                <div class="item-info">
                    <h4>${item.nom}</h4>
                    <p style="font-size: 12px; color: #aaa;">${item.extension} (${item.numero})</p>
                </div>
            </div>
        `).join('');
    }
}

// 6. INITIALISATION AUTOMATIQUE
document.addEventListener('DOMContentLoaded', () => {
    // Si on est sur pokedex.html
    renderPokedex();

    // Si on est sur mew.html
    renderCollection('mew', 'mew-grid');

    // Si on est sur mewtwo.html
    renderCollection('mewtwo', 'mewtwo-grid');

    // Si on est sur pantheon.html
    renderPantheon();
});
