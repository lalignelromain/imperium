/* ====================================================================
   MEWTHOLOGY - MOTEUR PRINCIPAL & SYNCHRONISATION FIREBASE
==================================================================== */

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

let localCollection = new Set();
let cardLangs = {}; 
let hallOfFameData = { mew: [], mewtwo: [] };
let isEditMode = false;

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
            cardLangs = data.cardLangs || {};
            hallOfFameData.mew = Array.isArray(data.hof_mew) ? data.hof_mew : [];
            hallOfFameData.mewtwo = Array.isArray(data.hof_mewtwo) ? data.hof_mewtwo : [];
        } else {
            localCollection = typeof CARTES_POSSEDEES !== 'undefined' ? new Set(CARTES_POSSEDEES) : new Set();
            cardLangs = {};
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
        cardLangs: cardLangs,
        derniereMaj: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(err => {
        console.error("Erreur d'écriture Firestore :", err);
    });
}

function resolveImg(path, langue) {
    if (!path) return langue === 'ja' ? './scripts/assets/img/back-ja.png' : './scripts/assets/img/back-fr.png';
    return path;
}

/* ====================================================================
   RENDU POKÉDEX GLOBAL & ANCIENNES COLLECTIONS
==================================================================== */
function renderPokedex() {
    const container = document.getElementById('pokedex-grid') || document.getElementById('card-grid');
    if (!container || typeof cartesDatabase === 'undefined') return;

    container.innerHTML = '';
    cartesDatabase.forEach(carte => {
        const isOwned = localCollection.has(carte.id);
        const cardDiv = document.createElement('div');
        cardDiv.className = `card-item ${carte.pokemon === 'mew' ? 'theme-mew' : 'theme-mewtwo'} ${isOwned ? 'is-owned' : 'not-owned'}`;
        
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
            saveToCloud();
        });
        container.appendChild(cardDiv);
    });
}

/* ====================================================================
   FONCTIONS UTILITAIRES DRESSEUSES
==================================================================== */
function getAllDresseusesCards() {
    let allCards = [];
    if (typeof dresseusesDatabase !== 'undefined') {
        dresseusesDatabase.forEach(section => {
            if (section.cartes) allCards.push(...section.cartes);
        });
    }
    return allCards;
}

function getCleanDresseuseName(carte) {
    if (carte.id.includes("olim")) return "Prof. Olim";
    if (carte.id.includes("keteleeria")) return "Prof. Keteleeria";
    if (carte.id.includes("magnolia")) return "Prof. Magnolia";

    let n = carte.nom.replace(/\(.*?\)/g, "").trim();
    const prefixes = [
        "Vigilance d'", "Vigilance de ", "Dévouement de ", "Exploration de ", 
        "Affinité de ", "Ambition de ", "Hospitalité d'", "Invitation d'", 
        "Éclat d'", "Suggestion de ", "Résolution de "
    ];
    prefixes.forEach(p => { if (n.startsWith(p)) n = n.replace(p, "").trim(); });
    return n || "Inconnue";
}

function getGroupedDresseuses() {
    const allCards = getAllDresseusesCards();
    return allCards.reduce((acc, card) => {
        const nom = getCleanDresseuseName(card);
        if (!acc[nom]) acc[nom] = [];
        acc[nom].push(card);
        return acc;
    }, {});
}

/* ====================================================================
   HUB DRESSEUSES (TOPLOADERS 4x10) - dresseuses.html
==================================================================== */
function renderDresseusesHub() {
    const shelfContainer = document.getElementById('shelf');
    if (!shelfContainer) return; // On n'est pas sur la page dresseuses.html

    const grouped = getGroupedDresseuses();
    const trainers = Object.keys(grouped).sort((a, b) => a.localeCompare(b, 'fr'));

    shelfContainer.innerHTML = '';
    const totalSlots = 40; // 4x10

    for (let i = 0; i < totalSlots; i++) {
        const trainerName = trainers[i];
        const isEmpty = !trainerName;
        const firstCard = !isEmpty ? grouped[trainerName][0] : null;
        
        // On récupère la première image pour décorer le toploader (si présente)
        const imgSrc = firstCard ? `./scripts/assets/cards/dresseuses/${firstCard.file}` : '';
        const imgHtml = imgSrc ? `<img src="${imgSrc}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" loading="lazy">` : `<span style="font-size: 0.9rem;">🖼️</span>`;

        const pocket = document.createElement('div');
        pocket.className = 'binder-pocket';
        
        pocket.innerHTML = `
            <div class="toploader-insert" ${isEmpty ? 'style="border-style:dashed; opacity:0.3;"' : ''}>
                <div class="card-in-sleeve" style="${imgSrc ? 'padding:0;' : ''}">
                    ${isEmpty ? '' : imgHtml}
                    ${!isEmpty && !imgSrc ? `<span class="card-name">${trainerName}</span>` : ''}
                </div>
            </div>
        `;

        if (!isEmpty) {
            pocket.style.cursor = 'pointer';
            pocket.addEventListener('click', () => {
                window.location.href = `classeur.html?dresseuse=${encodeURIComponent(trainerName)}`;
            });
        }
        shelfContainer.appendChild(pocket);
    }
}

/* ====================================================================
   PAGE INDIVIDUELLE DRESSEUSE (CLASSEUR) - classeur.html
==================================================================== */
function renderDresseuseClasseur() {
    const container = document.getElementById('pages-container');
    const titleEl = document.getElementById('interior-title');
    if (!container || !titleEl) return; // On n'est pas sur la page classeur.html

    const urlParams = new URLSearchParams(window.location.search);
    const trainerName = urlParams.get('dresseuse');
    
    if (!trainerName) {
        titleEl.textContent = "DRESSEUSE INTROUVABLE";
        return;
    }

    titleEl.textContent = trainerName;
    const grouped = getGroupedDresseuses();
    const trainerCards = grouped[trainerName] || [];

    container.innerHTML = '';
    
    // Pages Vault X (6 ou 12 cartes par page selon l'écran)
    const CARDS_PER_PAGE = window.innerWidth <= 800 ? 4 : 6;
    const totalPages = Math.ceil(trainerCards.length / CARDS_PER_PAGE) || 1;

    for (let p = 0; p < totalPages; p++) {
        const pageCards = trainerCards.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
        const pageEl = document.createElement('div');
        pageEl.className = 'vaultx-page';

        let pageHTML = '';
        pageCards.forEach(carte => {
            const imgSrc = `./scripts/assets/cards/dresseuses/${carte.file}`;
            
            // Pas de retournement, juste l'image FR simple
            pageHTML += `
                <div class="vaultx-pocket dresseuse-card-slot" data-id="${carte.id}" style="cursor: ${isEditMode ? 'pointer' : 'default'}">
                    <img src="${imgSrc}" alt="${carte.nom}" loading="lazy">
                </div>
            `;
        });

        // Remplir les trous de la page
        const emptySlots = CARDS_PER_PAGE - pageCards.length;
        for (let e = 0; e < emptySlots; e++) {
            pageHTML += `<div class="vaultx-pocket is-empty"></div>`;
        }

        pageEl.innerHTML = pageHTML;
        container.appendChild(pageEl);
    }

    // Attacher l'événement de clic pour le mode Édition
    container.querySelectorAll('.dresseuse-card-slot').forEach(slot => {
        slot.addEventListener('click', (e) => {
            if (!isEditMode) return;
            const cardId = slot.dataset.id;
            
            // ACTION MODE ÉDITION EN ATTENTE
            console.log("Clic mode édition sur la dresseuse :", cardId);
            // Tu m'expliqueras plus tard quoi mettre ici !
        });
    });
}


/* ====================================================================
   MISE À JOUR GLOBALE
==================================================================== */
function updateAllViews() {
    renderPokedex();
    renderDresseusesHub();
    renderDresseuseClasseur();
}

/* ====================================================================
   DOCK FLOTTANT & AUTHENTIFICATION
==================================================================== */
function setupDock() {
    if (document.getElementById('floating-dock')) return;
    const dock = document.createElement('nav');
    dock.id = 'floating-dock';
    dock.className = 'floating-dock';
    dock.innerHTML = `
        <a href="index.html" class="dock-btn" title="Retour à l'accueil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </a>
        <button type="button" id="dock-btn-top" class="dock-btn" title="Haut de page">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
        <button type="button" id="dock-btn-lock" class="dock-btn dock-btn-lock" style="display: none;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>
    `;
    document.body.appendChild(dock);
    document.getElementById('dock-btn-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('dock-btn-lock').addEventListener('click', () => { if (auth) auth.signOut(); });
}

function setupAdminTrigger() {
    const mainTitle = document.querySelector('.header-main h1');
    if (!mainTitle) return;
    mainTitle.addEventListener('dblclick', triggerLogin);
}

function triggerLogin() {
    if (isEditMode || !auth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(err => console.error(err));
}

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

document.addEventListener('DOMContentLoaded', () => {
    setupDock();
    setupAdminTrigger();
    initFirestoreSync();
});
