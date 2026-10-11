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
   1. POKÉDEX GLOBAL
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
                delete cardLangs[carte.id];
            } else {
                localCollection.add(carte.id);
                if (!cardLangs[carte.id]) cardLangs[carte.id] = { fr: true, jp: false };
            }
            saveToCloud();
        });
        container.appendChild(cardDiv);
    });
}

/* ====================================================================
   2. CLASSEUR VAULT X (MEW/MEWTWO) & PSA
==================================================================== */
function renderBinderView(pokemonName) {
    const binderContainer = document.getElementById('binder-deck');
    const psaContainer = document.getElementById('psa-wall');
    if (!binderContainer || typeof cartesDatabase === 'undefined') return;

    const cartesPossedees = cartesDatabase.filter(c => c.pokemon === pokemonName && localCollection.has(c.id));
    const currentHofIds = hallOfFameData[pokemonName] || [];

    if (psaContainer) {
        let psaHTML = '';
        for (let i = 0; i < 4; i++) {
            const cardId = currentHofIds[i];
            const card = cardId ? cartesPossedees.find(c => c.id === cardId) : null;
            if (card) {
                const line1 = card.annee && String(card.annee).toLowerCase() !== "inconnue" ? `${card.annee} POKÉMON` : `POKÉMON`;
                const line2 = card.nom;
                const line3 = card.extension || 'OFFICIAL ARCHIVE';
                const cardNum = card.numero ? String(card.numero).replace(/^#/, '') : 'PROMO';
                const certCode = card.cert || `4936280${i + 1}`;
                const displayImg = resolveImg(card.imageFr || card.image, card.langue);

                psaHTML += `
                    <div class="psa-slab">
                        <div class="psa-label-card">
                            <div class="psa-upper-block">
                                <div class="psa-left-text">
                                    <span class="psa-text-line">${line1}</span>
                                    <span class="psa-text-line">${line2}</span>
                                    <span class="psa-text-line">${line3}</span>
                                </div>
                                <div class="psa-right-text">
                                    <span class="psa-text-line">#${cardNum}</span>
                                    <span class="psa-grade-val">AUTHENTIC</span>
                                    <span class="psa-grade-val">A</span>
                                </div>
                            </div>
                            <div class="psa-lower-block">
                                <div class="psa-barcode-svg"></div><div class="psa-foil-seal"></div><span class="psa-cert-code">${certCode}</span>
                            </div>
                        </div>
                        <div class="psa-card-chamber"><img src="${displayImg}" alt="${card.nom}" loading="lazy"></div>
                    </div>`;
            } else {
                psaHTML += `<div class="psa-slab is-empty"><div class="psa-card-chamber"><span>Emplacement Libre</span></div></div>`;
            }
        }
        psaContainer.innerHTML = psaHTML;
    }

    if (cartesPossedees.length === 0) {
        binderContainer.innerHTML = `<div style="text-align:center; padding:40px; color:#94a3b8;"><p>Aucune carte cochée.</p></div>`;
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
            const userLang = cardLangs[c.id] || { fr: true, jp: false };
            const imgFr = resolveImg(c.imageFr || c.image, 'fr');
            const imgJp = resolveImg(c.imageJp || c.imageFr || c.image, 'ja');
            
            let pocketContent = '';
            if (userLang.fr && userLang.jp) {
                pocketContent = `
                    <div class="card-flipper">
                        <div class="face-fr"><img src="${imgFr}" alt="${c.nom} FR" loading="lazy"></div>
                        <div class="face-jp"><img src="${imgJp}" alt="${c.nom} JP" loading="lazy"></div>
                    </div>
                    <button type="button" class="flip-btn-trigger" onclick="event.stopPropagation(); this.closest('.vaultx-pocket').classList.toggle('is-flipped');"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></button>
                `;
            } else if (!userLang.fr && userLang.jp) {
                pocketContent = `<img src="${imgJp}" alt="${c.nom} JP" loading="lazy"><span class="lang-badge">JP</span>`;
            } else {
                pocketContent = `<img src="${imgFr}" alt="${c.nom} FR" loading="lazy">`;
            }

            pageHTML += `
                <div class="vaultx-pocket ${inHof ? 'in-hof' : ''}" id="pocket-${c.id}">
                    ${pocketContent}
                    <div class="lang-toggles">
                        <button type="button" class="lang-btn ${userLang.fr ? 'active' : ''}" onclick="event.stopPropagation(); toggleCardLang('${c.id}', 'fr')">FR</button>
                        <button type="button" class="lang-btn ${userLang.jp ? 'active' : ''}" onclick="event.stopPropagation(); toggleCardLang('${c.id}', 'jp')">JP</button>
                    </div>
                    <button type="button" class="hof-pin-btn" onclick="event.stopPropagation(); toggleHofSlot('${pokemonName}', '${c.id}')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button>
                </div>
            `;
        });

        const emptySlots = CARDS_PER_PAGE - pageCards.length;
        for (let e = 0; e < emptySlots; e++) pageHTML += `<div class="vaultx-pocket is-empty"></div>`;
        pageEl.innerHTML = pageHTML;
        binderContainer.appendChild(pageEl);
    }
}

window.toggleCardLang = function(cardId, lang) {
    if (!isEditMode || !docRef) return;
    if (!cardLangs[cardId]) cardLangs[cardId] = { fr: false, jp: false };
    cardLangs[cardId][lang] = !cardLangs[cardId][lang];

    if (!cardLangs[cardId].fr && !cardLangs[cardId].jp) {
        localCollection.delete(cardId);
        delete cardLangs[cardId];
    } else {
        localCollection.add(cardId);
    }
    saveToCloud();
};

window.toggleHofSlot = function(pokemonName, cardId) {
    if (!isEditMode || !docRef) return;
    let list = hallOfFameData[pokemonName] || [];
    const index = list.indexOf(cardId);

    if (index > -1) list.splice(index, 1);
    else {
        if (list.length >= 4) list.shift();
        list.push(cardId);
    }
    hallOfFameData[pokemonName] = list;
    const payload = {};
    payload[`hof_${pokemonName}`] = list;
    docRef.set(payload, { merge: true });
};

/* ====================================================================
   3. HISTORIQUE CONSERVÉ (MEW/MEWTWO-GRID)
==================================================================== */
function renderLegacyCollection(pokemonName, containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof cartesDatabase === 'undefined') return;

    const cartesPossedees = cartesDatabase.filter(c => c.pokemon === pokemonName && localCollection.has(c.id));
    if (cartesPossedees.length === 0) return;

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
                            <img src="${resolveImg(carte.image, carte.langue)}" alt="${carte.nom}" loading="lazy">
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

/* ====================================================================
   4. PANTHÉON GLOBAL
==================================================================== */
function renderPantheon() {
    if (typeof pantheonDatabase === 'undefined') return;

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
                        <div class="flip-front"><img src="${resolveImg(item.imageFront, item.langue)}" alt="${item.nom} Recto" loading="lazy"></div>
                        <div class="flip-back"><img src="${resolveImg(item.imageBack, item.langue)}" alt="${item.nom} Verso" loading="lazy"></div>
                    </div>
                </div>
                <div class="item-info">
                    <h4>${item.nom}</h4>
                    <p style="font-size: 12px; color: #aaa;">${item.extension} (${item.numero})</p>
                </div>
            `;
            cardDiv.addEventListener('click', () => {
                if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                    cardDiv.classList.toggle('is-flipped');
                }
            });
            cardDiv.addEventListener('mouseleave', () => cardDiv.classList.remove('is-flipped'));
            gradeesContainer.appendChild(cardDiv);
        });
    }
}

/* ====================================================================
   5. PROGRESSION EV5 (HUB)
==================================================================== */
function initEV5ProgressHub() {
    const fill = document.getElementById("ev5-hub-progress-fill");
    const text = document.getElementById("ev5-hub-progress-text");
    if (!fill || !text) return;

    const TOTAL_MASTERSET = 363;
    if (typeof db !== "undefined" && db) {
        db.collection("vitrine").doc("cartes").onSnapshot((doc) => {
            if (doc.exists && doc.data() && Array.isArray(doc.data().ev05)) {
                const current = doc.data().ev05.length;
                const percent = Math.min(100, Math.round((current / TOTAL_MASTERSET) * 100));
                fill.style.width = `${percent}%`;
                text.innerText = `${current} / ${TOTAL_MASTERSET} • ${percent}%`;
            }
        });
    }
}

/* ====================================================================
   6. MODULE DRESSEUSES (HUB & CLASSEUR)
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
    const prefixes = ["Vigilance d'", "Vigilance de ", "Dévouement de ", "Exploration de ", "Affinité de ", "Ambition de ", "Hospitalité d'", "Invitation d'", "Éclat d'", "Suggestion de ", "Résolution de "];
    prefixes.forEach(p => { if (n.startsWith(p)) n = n.replace(p, "").trim(); });
    return n || "Inconnue";
}

function getGroupedDresseuses() {
    return getAllDresseusesCards().reduce((acc, card) => {
        const nom = getCleanDresseuseName(card);
        if (!acc[nom]) acc[nom] = [];
        acc[nom].push(card);
        return acc;
    }, {});
}

// -> Le Hub des Toploaders (dresseuses.html)
function renderDresseusesHub() {
    const shelfContainer = document.getElementById('shelf');
    if (!shelfContainer) return; 

    const grouped = getGroupedDresseuses();
    const trainers = Object.keys(grouped).sort((a, b) => a.localeCompare(b, 'fr'));
    shelfContainer.innerHTML = '';
    const totalSlots = 40; 

    for (let i = 0; i < totalSlots; i++) {
        const trainerName = trainers[i];
        const isEmpty = !trainerName;
        const firstCard = !isEmpty ? grouped[trainerName][0] : null;
        
        let imgHtml = '<span style="font-size: 0.9rem;">🖼️</span>';
        
        // CORRECTION IMAGE DRESSEUSES ICI (.file au lieu de .image)
        if (firstCard && firstCard.file) {
            const resolvedSrc = `./scripts/assets/cards/dresseuses/${firstCard.file}`;
            imgHtml = `<img src="${resolvedSrc}" style="width:100%; height:100%; object-fit:cover; opacity:0.8; border-radius:2px;" loading="lazy">`;
        }

        const pocket = document.createElement('div');
        pocket.className = 'binder-pocket';
        pocket.innerHTML = `
            <div class="toploader-insert" ${isEmpty ? 'style="border-style:dashed; opacity:0.3;"' : ''}>
                <div class="card-in-sleeve" style="${(firstCard && firstCard.file) ? 'padding:0;' : ''}">
                    ${isEmpty ? '' : imgHtml}
                    ${!isEmpty && !(firstCard && firstCard.file) ? `<span class="card-name">${trainerName}</span>` : ''}
                </div>
            </div>
        `;

        if (!isEmpty) {
            pocket.style.cursor = 'pointer';
            pocket.addEventListener('click', () => { window.location.href = `classeur.html?dresseuse=${encodeURIComponent(trainerName)}`; });
        }
        shelfContainer.appendChild(pocket);
    }
}

// -> La page de Classeur Individuel (classeur.html)
function renderDresseuseClasseur() {
    const container = document.getElementById('pages-container');
    const titleEl = document.getElementById('interior-title');
    if (!container || !titleEl) return; 

    const urlParams = new URLSearchParams(window.location.search);
    const trainerName = urlParams.get('dresseuse');
    if (!trainerName) { titleEl.textContent = "DRESSEUSE INTROUVABLE"; return; }

    titleEl.textContent = trainerName;
    const grouped = getGroupedDresseuses();
    const trainerCards = grouped[trainerName] || [];
    container.innerHTML = '';
    
    const CARDS_PER_PAGE = window.innerWidth <= 800 ? 4 : 6;
    const totalPages = Math.ceil(trainerCards.length / CARDS_PER_PAGE) || 1;

    for (let p = 0; p < totalPages; p++) {
        const pageCards = trainerCards.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
        const pageEl = document.createElement('div');
        pageEl.className = 'vaultx-page';

        let pageHTML = '';
        pageCards.forEach(carte => {
            // CORRECTION IMAGE CLASSEUR ICI (.file)
            const imgSrc = `./scripts/assets/cards/dresseuses/${carte.file}`;
            pageHTML += `
                <div class="vaultx-pocket dresseuse-card-slot" data-id="${carte.id}" style="cursor: ${isEditMode ? 'pointer' : 'default'}">
                    <img src="${imgSrc}" alt="${carte.nom}" loading="lazy">
                </div>
            `;
        });

        const emptySlots = CARDS_PER_PAGE - pageCards.length;
        for (let e = 0; e < emptySlots; e++) pageHTML += `<div class="vaultx-pocket is-empty"></div>`;

        pageEl.innerHTML = pageHTML;
        container.appendChild(pageEl);
    }

    container.querySelectorAll('.dresseuse-card-slot').forEach(slot => {
        slot.addEventListener('click', (e) => {
            if (!isEditMode) return;
            const cardId = slot.dataset.id;
            console.log("Clic mode édition dresseuse :", cardId);
        });
    });
}

/* ====================================================================
   7. EXÉCUTION & SYNCHRO
==================================================================== */
function updateAllViews() {
    renderPokedex();
    if (document.getElementById('binder-deck')) {
        const isMewtwo = document.body.classList.contains('theme-mewtwo') || (document.title && document.title.toLowerCase().includes('mewtwo'));
        renderBinderView(isMewtwo ? 'mewtwo' : 'mew');
    }
    renderLegacyCollection('mew', 'mew-grid');
    renderLegacyCollection('mewtwo', 'mewtwo-grid');
    renderPantheon();
    renderDresseusesHub();
    renderDresseuseClasseur();
}

function setupDock() {
    if (document.getElementById('floating-dock')) return;
    const dock = document.createElement('nav');
    dock.id = 'floating-dock';
    dock.className = 'floating-dock';
    dock.innerHTML = `
        <a href="index.html" class="dock-btn" title="Retour à l'accueil"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></a>
        <button type="button" id="dock-btn-top" class="dock-btn" title="Haut de page"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg></button>
        <button type="button" id="dock-btn-lock" class="dock-btn dock-btn-lock" style="display: none;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></button>
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
    initEV5ProgressHub();
});
