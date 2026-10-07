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
    appId: "1:416428446683:web:12abb86abd6df36b6c8dfe"
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
let isEditMode = false;

// 2. SYNCHRONISATION FIRESTORE TEMPS RÉEL
function initFirestoreSync() {
    if (!docRef) {
        localCollection = typeof CARTES_POSSEDEES !== 'undefined' ? new Set(CARTES_POSSEDEES) : new Set();
        updateAllViews();
        return;
    }

    docRef.onSnapshot(doc => {
        if (doc.exists && doc.data().ids) {
            localCollection = new Set(doc.data().ids);
        } else {
            localCollection = typeof CARTES_POSSEDEES !== 'undefined' ? new Set(CARTES_POSSEDEES) : new Set();
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
    }).catch(err => {
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

// 5. RENDU COLLECTIONS DÉDIÉES (MEW & MEWTWO)
function renderCollection(pokemonName, containerId) {
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

// 6. RENDU PANTHÉON (ITEMS SCELLÉS & CARTES GRADÉES 3D)
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

    // Cartes gradées avec double face et retournement 3D
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

            // Sécurité desktop : réinitialise si le curseur quitte la carte
            cardDiv.addEventListener('mouseleave', () => {
                cardDiv.classList.remove('is-flipped');
            });

            gradeesContainer.appendChild(cardDiv);
        });
    }
}

function updateAllViews() {
    renderPokedex();
    renderCollection('mew', 'mew-grid');
    renderCollection('mewtwo', 'mewtwo-grid');
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

// Mise à jour de la jauge Master Set EV5 sur le Hub
function initEV5ProgressHub() {
    const fill = document.getElementById("ev5-hub-progress-fill");
    const text = document.getElementById("ev5-hub-progress-text");
    if (!fill || !text) return;

    // 1. Affiche immédiatement depuis le cache sans attendre le réseau
    const cached = localStorage.getItem("ev5_progress_cache");
    if (cached) {
        try {
            const data = JSON.parse(cached);
            fill.style.width = `${data.percent}%`;
            text.innerText = `${data.current} / ${data.total} • ${data.percent}%`;
        } catch (e) {}
    }

    // 2. Synchronisation Firebase en direct si disponible
    if (typeof db !== "undefined") {
        db.collection("collections").doc("masterset_ev05").onSnapshot((doc) => {
            const total = 222;
            let current = 0;
            if (doc.exists && doc.data().owned) {
                current = doc.data().owned.length;
            }
            const percent = Math.min(100, Math.round((current / total) * 100));
            fill.style.width = `${percent}%`;
            text.innerText = `${current} / ${total} • ${percent}%`;
        });
    }
}

document.addEventListener("DOMContentLoaded", initEV5ProgressHub);
