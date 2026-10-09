/* ====================================================================
   MEWTHOLOGY - MOTEUR PRINCIPAL & SYNCHRONISATION FIREBASE
==================================================================== */

// 1. CONFIGURATION & INITIALISATION FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyBl9RVekp4NGk8hldbvuX9hmT85zm3AD6k",
    authDomain: "mewthology.firebaseapp.com",
    projectId: "mewthology",
    storageBucket: "mewthology.firebasestorage.app",
    messagingSenderId: "416428446683",
    app appId: "1:416428446683:web:12abb86abd6df36b6c8dfe"
};

let auth = null;
let db = null;
let docRef = null;

if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore();
    docRef = db.collection('vitrine').doc('cartes');
}

const ADMIN_EMAIL = "romainlal76@gmail.com";

// État local en mémoire
let localCollection = new Set();
let hallOfFameData = {
    mew: [],
    mewtwo: []
};
let isEditMode = false;

// 2. SYNCHRONISATION FIRESTORE TEMPS RÉEL (POSSESSION & HALL OF FAME)
function initFirestoreSync() {
    if (!docRef) {
        localCollection = typeof CARTES_POSSEDEES !== 'undefined' ? new Set(CARTES_POSSEDEES) : new Set();
        updateAllViews();
        return;
    }

    docRef.onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            localCollection = new Set(data.ids || (typeof CARTES_POSSEDEES !== 'undefined' ? CARTES_POSSEDEES : []));
            hallOfFameData.mew = Array.isArray(data.hof_mew) ? data.hof_mew : [];
            hallOfFameData.mewtwo = Array.isArray(data.hof_mewtwo) ? data.hof_mewtwo : [];
        } else {
            localCollection = typeof CARTES_POSSEDEES !== 'undefined' ? new Set(CARTES_POSSEDEES) : new Set();
            hallOfFameData = { mew: [], mewtwo: [] };
        }
        updateAllViews();
    }, error => {
        console.error("Erreur de synchronisation Firestore :", error);
    });
}

function saveToCloud() {
    if (!isEditMode || !docRef) return;
    docRef.set({
        ids: Array.from(localCollection),
        derniereMaj: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(err => {
        console.error("Erreur d'écriture Firestore :", err);
        alert("Action refusée : vérifiez vos droits d'administration.");
    });
}

// 3. UTILITAIRE IMAGES
function resolveImg(path, langue) {
    if (!path) {
        return langue === 'ja' ? './scripts/assets/img/back-ja.png' : './scripts/assets/img/back-fr.png';
    }
    return path;
}

// 4. RENDU POKÉDEX GLOBAL
function renderPokedex() {
    const container = document.getElementById('pokedex-grid') || document.getElementById('card-grid');
    if (!container || typeof cartesDatabase === 'undefined') return;

    container.innerHTML = '';

    cartesDatabase.forEach(carte => {
        const isOwned = localCollection.has(carte.id);
        const cardDiv = document.createElement('div');
        const themeClass = carte.pokemon === 'mew' ? 'theme-mew' : 'theme-mewtwo';

        cardDiv.className = `card-item ${themeClass} ${isOwned ? 'is-owned' : 'not-owned'}`;
        cardDiv.dataset.id = carte.id;

        cardDiv.innerHTML = `
            <img src="${resolveImg(carte.image, carte.langue)}" alt="${carte.nom} ${carte.numero}" loading="lazy">
            <div class="card-info">
                <div class="card-name">${carte.nom}</div>
                <div class="card-meta">${carte.extension} - #${carte.numero}</div>
            </div>
        `;

        cardDiv.addEventListener('click', () => {
            if (!isEditMode) return;

            if (localCollection.has(carte.id)) {
                localCollection.delete(carte.id);
            } else {
                localCollection.add(carte.id);
            }

            const nowOwned = localCollection.has(carte.id);
            cardDiv.classList.toggle('is-owned', nowOwned);
            cardDiv.classList.toggle('not-owned', !nowOwned);

            saveToCloud();
        });

        container.appendChild(cardDiv);
    });
}

// 5. RENDU DU CLASSEUR VAULT X 4x3 & DU HALL OF FAME (MEW & MEWTWO)
function renderBinderView(pokemonName) {
    const binderContainer = document.getElementById('binder-deck');
    const psaContainer = document.getElementById('psa-wall');
    if (!binderContainer || typeof cartesDatabase === 'undefined') return;

    // Filtre les cartes physiques de ce Pokémon actuellement possédées
    const cartesPossedees = cartesDatabase.filter(c => c.pokemon === pokemonName && localCollection.has(c.id));
    const currentHofIds = hallOfFameData[pokemonName] || [];

    // --- A. RENDU DU HALL OF FAME (4 BOÎTIERS PSA) ---
    if (psaContainer) {
        let psaHTML = '';
        for (let i = 0; i < 4; i++) {
            const cardId = currentHofIds[i];
            const card = cardId ? cartesPossedees.find(c => c.id === cardId) : null;

            if (card) {
                psaHTML += `
                    <div class="psa-slab">
                        <div class="psa-label-card">
                            <div class="psa-upper-block">
                                <div class="psa-left-text">
                                    <span class="psa-row-set">${card.annee} POKÉMON ${card.extension.toUpperCase()}</span>
                                    <span class="psa-row-name">${card.nom.toUpperCase()}</span>
                                    <span class="psa-row-sub">OFFICIAL ARCHIVE</span>
                                </div>
                                <div class="psa-right-text">
                                    <span class="psa-card-number">${card.numero}</span>
                                    <span class="psa-grade-title">GEM MT</span>
                                    <span class="psa-grade-value">10</span>
                                </div>
                            </div>
                            <div class="psa-lower-block">
                                <div class="psa-barcode-svg"></div>
                                <span class="psa-cert-code">8492015${i}</span>
                            </div>
                            <div class="psa-foil-seal"></div>
                        </div>
                        <div class="psa-card-chamber">
                            <img src="${resolveImg(card.image, card.langue)}" alt="${card.nom}" loading="lazy">
                        </div>
                    </div>
                `;
            } else {
                psaHTML += `
                    <div class="psa-slab is-empty">
                        <div class="psa-card-chamber">
                            <span>Emplacement Libre</span>
                        </div>
                    </div>
                `;
            }
        }
        psaContainer.innerHTML = psaHTML;
    }

    // --- B. RENDU DU CLASSEUR VAULT X (GRILLES 4x3 = 12 CASES) ---
    const totalCountEl = document.getElementById('total-count-text');
    if (totalCountEl) {
        totalCountEl.innerText = `${cartesPossedees.length} cartes en classeur`;
    }

    if (cartesPossedees.length === 0) {
        binderContainer.innerHTML = `
            <div style="text-align: center; padding: 50px 20px; color: #94a3b8; width: 100%;">
                <p style="font-size: 15px; margin-bottom: 12px;">Aucune carte ${pokemonName === 'mew' ? 'Mew' : 'Mewtwo'} cochée dans le Pokédex pour l'instant.</p>
                <a href="pokedex.html" style="color: #f472b6; font-weight: 700; text-decoration: underline;">Accéder au Pokédex Global</a>
            </div>
        `;
        return;
    }

    binderContainer.innerHTML = '';
    const CARDS_PER_PAGE = 12;
    const totalPages = Math.ceil(cartesPossedees.length / CARDS_PER_PAGE);

    for (let p = 0; p < totalPages; p++) {
        const pageCards = cartesPossedees.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
        const pageEl = document.createElement('div');
        pageEl.className = 'vaultx-page';

        let pageHTML = '';
        pageCards.forEach(c => {
            const inHof = currentHofIds.includes(c.id);
            const isJp = c.langue === 'ja';

            pageHTML += `
                <div class="vaultx-pocket ${inHof ? 'in-hof' : ''}">
                    <img src="${resolveImg(c.image, c.langue)}" alt="${c.nom}" loading="lazy">
                    ${isJp ? '<span class="lang-badge">JP</span>' : ''}
                    <button type="button" class="hof-pin-btn" title="Épingler au Hall of Fame" onclick="toggleHofSlot('${pokemonName}', '${c.id}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </button>
                </div>
            `;
        });

        // Complète la grille 4x3 par des pochettes transparentes hachurées si la page est incomplète
        const emptySlots = CARDS_PER_PAGE - pageCards.length;
        for (let e = 0; e < emptySlots; e++) {
            pageHTML += `<div class="vaultx-pocket is-empty"></div>`;
        }

        pageEl.innerHTML = pageHTML;
        binderContainer.appendChild(pageEl);
    }
}

// Action d'attribution HOF en mode édition
window.toggleHofSlot = function(pokemonName, cardId) {
    if (!isEditMode || !docRef) return;

    let list = hallOfFameData[pokemonName] || [];
    const index = list.indexOf(cardId);

    if (index > -1) {
        list.splice(index, 1);
    } else {
        if (list.length >= 4) {
            list.shift();
        }
        list.push(cardId);
    }
    hallOfFameData[pokemonName] = list;

    const payload = {};
    payload[`hof_${pokemonName}`] = list;

    docRef.set(payload, { merge: true }).catch(err => {
        console.error("Erreur d'enregistrement Hall of Fame :", err);
        alert("Action refusée : vérifiez vos droits d'administration.");
    });
};

// Rendu historique pour les conteneurs classiques par extension (mew-grid / mewtwo-grid)
function renderLegacyCollection(pokemonName, containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof cartesDatabase === 'undefined') return;

    const cartesPossedees = cartesDatabase.filter(c => c.pokemon === pokemonName && localCollection.has(c.id));

    if (cartesPossedees.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #888; width: 100%;">
                <p>Aucune carte ${pokemonName === 'mew' ? 'Mew' : 'Mewtwo'} répertoriée pour l'instant.</p>
                <a href="pokedex.html" style="color: #ff77a9; text-decoration: underline;">Consulter le Pokédex Global</a>
            </div>
        `;
        return;
    }

    const parExtension = {};
    cartesPossedees.forEach(carte => {
        if (!parExtension[carte.extension]) parExtension[carte.extension] = [];
        parExtension[carte.extension].push(carte);
    });

    let html = '';
    for (const [extension, cartes] of Object.entries(parExtension)) {
        html += `
            <section class="extension-group" style="width: 100%; margin-bottom: 30px;">
                <h3 class="extension-title" style="border-bottom: 1px solid #333; padding-bottom: 8px; margin-bottom: 15px;">
                    ${extension} <span style="font-size: 0.8em; color: #888;">(${cartes.length})</span>
                </h3>
                <div class="cards-grid">
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

// 6. RENDU PANTHÉON (ITEMS SCELLÉS AVEC TRI #XX# & CARTES GRADÉES 3D)
function renderPantheon() {
    if (typeof pantheonDatabase === 'undefined') return;

    // Items scellés : tri numérique intelligent via balise #XX#
    const scellesContainer = document.getElementById('scelles-grid');
    if (scellesContainer && pantheonDatabase.scelles) {
        const scellesTries = [...pantheonDatabase.scelles].sort((a, b) => {
            const numA = parseInt((a.nom.match(/#(\d+)#/) || [])[1], 10) || 999;
            const numB = parseInt((b.nom.match(/#(\d+)#/) || [])[1], 10) || 999;
            return numA - numB;
        });

        scellesContainer.innerHTML = scellesTries.map(item => {
            const nomAffiche = item.nom.replace(/#\d+#\s*/, '');

            return `
                <div class="pantheon-item item-scelle">
                    <img src="${resolveImg(item.image, item.langue)}" alt="${nomAffiche}" loading="lazy">
                    <div class="item-info">
                        <h4>${nomAffiche}</h4>
                        <p style="font-size: 12px; color: #aaa;">${item.extension}</p>
                        <p style="font-size: 11px; color: #666;">${item.annee} • ${item.langue.toUpperCase()}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Cartes gradées : double face et retournement 3D
    const gradeesContainer = document.getElementById('gradees-grid');
    if (gradeesContainer && pantheonDatabase.gradees) {
        gradeesContainer.innerHTML = '';
        pantheonDatabase.gradees.forEach(item => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'pantheon-item gradee-item';

            cardDiv.innerHTML = `
                <div class="grade-badge">${item.societe} - ${item.note}</div>
                <div class="flip-wrapper">
                    <div class="flip-inner">
                        <div class="flip-front">
                            <img src="${resolveImg(item.imageFront, item.langue)}" alt="${item.nom} Recto" loading="lazy">
                        </div>
                        <div class="flip-back">
                            <img src="${resolveImg(item.imageBack, item.langue)}" alt="${item.nom} Verso" loading="lazy">
                        </div>
                    </div>
                </div>
                <div class="item-info">
                    <h4>${item.nom}</h4>
                    <p style="font-size: 12px; color: #aaa;">${item.extension} (${item.numero})</p>
                </div>
            `;

            // Interaction tactile sur mobile uniquement
            cardDiv.addEventListener('click', () => {
                const isDesktopHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
                if (!isDesktopHover) {
                    cardDiv.classList.toggle('is-flipped');
                }
            });

            // Réinitialisation desktop si le curseur sort
            cardDiv.addEventListener('mouseleave', () => {
                cardDiv.classList.remove('is-flipped');
            });

            gradeesContainer.appendChild(cardDiv);
        });
    }
}

function updateAllViews() {
    renderPokedex();

    // Rendu spécifique Binder Vault X & Hall of Fame (mew.html ou mewtwo.html)
    if (document.getElementById('binder-deck')) {
        const isMewtwo = document.body.classList.contains('theme-mewtwo') ||
                         (document.title && document.title.toLowerCase().includes('mewtwo'));
        renderBinderView(isMewtwo ? 'mewtwo' : 'mew');
    }

    // Maintien du rendu des grilles traditionnelles
    renderLegacyCollection('mew', 'mew-grid');
    renderLegacyCollection('mewtwo', 'mewtwo-grid');

    renderPantheon();
}

// 7. DOCK FLOTTANT EN VERRE
function setupDock() {
    if (document.getElementById('floating-dock')) return;

    const dock = document.createElement('nav');
    dock.id = 'floating-dock';
    dock.className = 'floating-dock';
    dock.setAttribute('aria-label', 'Actions rapides');

    dock.innerHTML = `
        <a href="index.html" class="dock-btn" title="Retour à l'accueil" aria-label="Accueil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </a>
        <button type="button" id="dock-btn-top" class="dock-btn" title="Haut de page" aria-label="Haut de page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
        <button type="button" id="dock-btn-lock" class="dock-btn dock-btn-lock" title="Quitter le mode édition" aria-label="Verrouiller" style="display: none;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>
    `;

    document.body.appendChild(dock);

    document.getElementById('dock-btn-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('dock-btn-lock').addEventListener('click', () => {
        if (auth) auth.signOut();
    });
}

// 8. DÉCLENCHEUR DU MODE ÉDITION (Double-clic & Appui long sur le titre)
function setupAdminTrigger() {
    const title = document.querySelector('.header-main h1');
    if (!title) return;

    title.addEventListener('dblclick', triggerLogin);

    let pressTimer;
    title.addEventListener('touchstart', () => {
        pressTimer = setTimeout(() => {
            triggerLogin();
        }, 1500);
    }, { passive: true });

    title.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });

    title.addEventListener('touchmove', () => {
        clearTimeout(pressTimer);
    });
}

function triggerLogin() {
    if (isEditMode || !auth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(err => {
        console.error("Erreur d'authentification Google :", err);
    });
}

// 9. ÉCOUTE DE L'AUTHENTIFICATION
if (auth) {
    auth.onAuthStateChanged(user => {
        const lockBtn = document.getElementById('dock-btn-lock');

        if (user && user.email === ADMIN_EMAIL) {
            isEditMode = true;
            document.body.classList.add('mode-edition');
            if (lockBtn) lockBtn.style.display = 'flex';
        } else {
            isEditMode = false;
            document.body.classList.remove('mode-edition');
            if (lockBtn) lockBtn.style.display = 'none';
        }
        updateAllViews();
    });
}

// 10. LANCEMENT AU CHARGEMENT DU DOM
document.addEventListener('DOMContentLoaded', () => {
    setupDock();
    setupAdminTrigger();
    initFirestoreSync();
});

// 11. ENREGISTREMENT DU SERVICE WORKER (PWA)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.error("SW error:", err));
}

// 12. PROGRESSION MASTER SET EV5 SUR LE HUB (TOTAL DE 363)
function initEV5ProgressHub() {
    const fill = document.getElementById("ev5-hub-progress-fill");
    const text = document.getElementById("ev5-hub-progress-text");
    if (!fill || !text) return;

    const TOTAL_MASTERSET = 363;

    // 1. Rendu instantané depuis le cache local
    const cached = localStorage.getItem("ev5_progress_cache");
    if (cached) {
        try {
            const data = JSON.parse(cached);
            fill.style.width = `${data.percent}%`;
            text.innerText = `${data.current} / ${data.total || TOTAL_MASTERSET} • ${data.percent}%`;
        } catch (e) {}
    }

    // 2. Synchronisation Firebase temps réel sur vitrine/cartes (champ ev05)
    if (typeof db !== "undefined" && db) {
        db.collection("vitrine").doc("cartes").onSnapshot((doc) => {
            if (doc.exists && doc.data() && Array.isArray(doc.data().ev05)) {
                const current = doc.data().ev05.length;
                const percent = Math.min(100, Math.round((current / TOTAL_MASTERSET) * 100));
                fill.style.width = `${percent}%`;
                text.innerText = `${current} / ${TOTAL_MASTERSET} • ${percent}%`;
            }
        }, (err) => {
            console.warn("Écoute EV05 Hub :", err);
        });
    }
}

document.addEventListener("DOMContentLoaded", initEV5ProgressHub);
