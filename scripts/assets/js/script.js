/* ====================================================================
   MEWTHOLOGY - MOTEUR CLOUD FIRESTORE & INTERACTION
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

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const ADMIN_EMAIL = "romainlal76@gmail.com";

// État local en mémoire
let localCollection = new Set();
let isEditMode = false;

// 2. SYNCHRONISATION FIRESTORE TEMPS RÉEL (Document unique = quotas protégés)
const docRef = db.collection('vitrine').doc('cartes');

function initFirestoreSync() {
    docRef.onSnapshot(doc => {
        if (doc.exists && doc.data().ids) {
            localCollection = new Set(doc.data().ids);
        } else {
            // Initialisation avec la liste du code si la base est encore vierge
            localCollection = typeof CARTES_POSSEDEES !== 'undefined' ? new Set(CARTES_POSSEDEES) : new Set();
        }
        updateAllViews();
    }, error => {
        console.error("Erreur de synchronisation Firestore :", error);
    });
}

// Sauvegarde dans Firestore (accessible uniquement si authentifié)
function saveToCloud() {
    if (!isEditMode) return;
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

// 4. RENDU POKÉDEX (POKÉDEX GLOBAL)
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

        // Clic actif seulement en mode édition
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

// 5. RENDU COLLECTIONS DÉDIÉES (MEW / MEWTWO)
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

// 6. RENDU PANTHÉON
function renderPantheon() {
    if (typeof pantheonDatabase === 'undefined') return;

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

    const gradeesContainer = document.getElementById('gradees-grid');
    if (gradeesContainer && pantheonDatabase.gradees) {
        gradeesContainer.innerHTML = pantheonDatabase.gradees.map(item => `
            <div class="pantheon-item item-gradee">
                <div class="grade-badge">${item.societe} - ${item.note}</div>
                <img src="${resolveImg(item.imageFront, item.langue)}" alt="${item.nom}" loading="lazy">
                <div class="item-info">
                    <h4>${item.nom}</h4>
                    <p style="font-size: 12px; color: #aaa;">${item.extension} (${item.numero})</p>
                </div>
            </div>
        `).join('');
    }
}

function updateAllViews() {
    renderPokedex();
    renderCollection('mew', 'mew-grid');
    renderCollection('mewtwo', 'mewtwo-grid');
    renderPantheon();
}

// 7. GESTION DU DOCK FLOTTANT & AUTHENTIFICATION
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
        auth.signOut();
    });
}

// 8. DÉCLENCHEUR INVISIBLE DU MODE ÉDITION SUR LE TITRE (Double-clic & Long press)
function setupAdminTrigger() {
    const title = document.querySelector('.header-main h1');
    if (!title) return;

    // Sur PC : Double-clic
    title.addEventListener('dblclick', triggerLogin);

    // Sur Mobile : Pression longue (1,5 seconde)
    let pressTimer;
    title.addEventListener('touchstart', (e) => {
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
    if (isEditMode) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(err => {
        console.error("Erreur de connexion :", err);
    });
}

// 9. SURVEILLANCE DE L'ÉTAT D'AUTHENTIFICATION GOOGLE
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

// 10. LANCEMENT AU CHARGEMENT
document.addEventListener('DOMContentLoaded', () => {
    setupDock();
    setupAdminTrigger();
    initFirestoreSync();
});
