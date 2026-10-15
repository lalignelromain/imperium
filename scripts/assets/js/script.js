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
   4. NOUVEAU RENDU DU PANTHÉON (Format Liste Catalogue Layout 7)
==================================================================== */
function renderPantheon() {
    const scellesGrid = document.getElementById("scelles-grid");
    const gradeesGrid = document.getElementById("gradees-grid");

    if (!scellesGrid || !gradeesGrid || typeof pantheonDatabase === 'undefined') return;
    
    scellesGrid.innerHTML = '';
    gradeesGrid.innerHTML = '';

    // 1. GÉNÉRATION DES ITEMS SCELLÉS (Toujours possédés 100%)
    if (pantheonDatabase.scelles) {
        const scellesTries = [...pantheonDatabase.scelles].sort((a, b) => {
            const matchA = a.nom.match(/#(\d+)#/);
            const matchB = b.nom.match(/#(\d+)#/);
            const numA = matchA ? parseInt(matchA[1], 10) : 999;
            const numB = matchB ? parseInt(matchB[1], 10) : 999;
            return numA - numB;
        });

        scellesTries.forEach(item => {
            const titrePropre = item.nom.replace(/#\d+#\s*/g, '');
            
            const html = `
                <div class="pantheon-item item-scelle" id="${item.id}">
                    <img src="${resolveImg(item.image, item.langue)}" alt="${titrePropre}">
                    
                    <div class="pantheon-item-info">
                        <div class="grade-badge" style="border-color: #a855f7; color: #a855f7; background: rgba(168, 85, 247, 0.12);">
                            SCELLÉ - ÉTAT MINT
                        </div>
                        <div class="pantheon-item-title">${titrePropre}</div>
                        <div class="pantheon-item-desc">
                            <span>Extension :</span> <strong>${item.extension} (${item.annee})</strong><br><br>
                            <em>Conservé sous protection acrylique. Scellage d'origine scrupuleusement vérifié.</em>
                        </div>
                    </div>
                </div>
            `;
            scellesGrid.insertAdjacentHTML("beforeend", html);
        });
    }

    // 2. GÉNÉRATION DES CARTES GRADÉES (Toujours possédées 100%)
    if (pantheonDatabase.gradees) {
        pantheonDatabase.gradees.forEach(item => {
            let badgeColor = "#d4af37"; 
            let badgeBg = "rgba(212, 175, 55, 0.12)";
            if(item.societe && item.societe.includes("PSA")) {
                badgeColor = "#e74c3c"; 
                badgeBg = "rgba(231, 76, 60, 0.12)";
            } else if(item.societe && item.societe.includes("PCA")) {
                badgeColor = "#38bdf8"; 
                badgeBg = "rgba(56, 189, 248, 0.12)";
            } else if(item.societe && item.societe.includes("AFG")) {
                badgeColor = "#10b981"; 
                badgeBg = "rgba(16, 185, 129, 0.12)";
            }

            const html = `
                <div class="pantheon-item" id="${item.id}">
                    
                    <div class="flip-wrapper gradee-item" onclick="this.classList.toggle('is-flipped')">
                        <div class="flip-inner">
                            <div class="flip-front"><img src="${resolveImg(item.imageFront, item.langue)}" alt="${item.nom} - Face"></div>
                            <div class="flip-back"><img src="${resolveImg(item.imageBack, item.langue)}" alt="${item.nom} - Dos"></div>
                        </div>
                    </div>
                    
                    <div class="pantheon-item-info">
                        <div class="grade-badge" style="border-color: ${badgeColor}; color: ${badgeColor}; background: ${badgeBg};">
                            ${item.societe} - ${item.note}
                        </div>
                        <div class="pantheon-item-title">${item.nom}</div>
                        <div class="pantheon-item-desc">
                            <span>Extension :</span> <strong>${item.extension} (${item.annee})</strong><br>
                            <span>Numérotation :</span> <strong>${item.numero}</strong><br><br>
                            <em>Cliquez sur la carte pour voir son verso.</em>
                        </div>
                    </div>
                    
                </div>
            `;
            gradeesGrid.insertAdjacentHTML("beforeend", html);
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
   6. MODULE DRESSEUSES (HUB, CLASSEUR & SECRÈTES 3D)
==================================================================== */

let currentPageDresseuses = 0; 
let currentActiveTrainerDresseuse = null;
let currentSecretIndexDresseuse = 0;

const REGISTRE_SECRET = {
    "Alizee": ["alizee.png"],
    "Alyxia": ["alyxia.png"],
    "Anis": ["anis.png"],
    "Apia": ["apia.png"],
    "Atalante": ["atalante.png"],
    "Aurore": ["aurore.png"],
    "Barbara": ["barbara.png"],
    "Blanche": ["blanche.png"],
    "Carolina": ["carolina.png"],
    "Cayenn": ["cayenn.png"],
    "Celesta": ["celesta.png"],
    "Cornelia": ["cornelia.png"],
    "Cynthia": ["cynthia.png"],
    "Donna": ["donna.png"],
    "Dracena": ["dracena.png"],
    "Echo": ["echo.png"],
    "Elige": ["elige.png"],
    "Elsamina": ["elsamina.png"],
    "Erika": ["erika.png"],
    "Faiza": ["faiza.png"],
    "Flo": ["flo.png"],
    "Flora": ["flora.png"],
    "Gladys": ["gladys.png"],
    "Gloria": ["gloria.png"],
    "Inezia": ["inezia.png"],
    "Jasmine": ["jasmine.png"],
    "Juliana": ["juliana.png"],
    "Leaf": ["leaf.png"],
    "Lillie": ["lillie.png"],
    "Ludvina": ["ludvina.png"],
    "Margie": ["margie.png"],
    "Nacchara": ["nacchara.png"],
    "Rosemary": ["rosemary.png"],
    "Roxanne": ["roxanne.png"],
    "Sophora": ["sophora.png"]
};

// -> Hub (dresseuses.html) - Grille 5x2
function renderDresseusesHub() {
    const shelfContainer = document.getElementById('shelf');
    if (!shelfContainer || typeof dresseusesData === 'undefined') return; 

    const trainers = Object.keys(dresseusesData).sort((a, b) => a.localeCompare(b, 'fr'));
    const CARDS_PER_PAGE = 10; 
    const totalPages = Math.ceil(trainers.length / CARDS_PER_PAGE);

    if (currentPageDresseuses >= totalPages) currentPageDresseuses = Math.max(0, totalPages - 1);
    if (currentPageDresseuses < 0) currentPageDresseuses = 0;

    const pageTrainers = trainers.slice(currentPageDresseuses * CARDS_PER_PAGE, (currentPageDresseuses + 1) * CARDS_PER_PAGE);
    shelfContainer.innerHTML = '';

    pageTrainers.forEach(trainerName => {
        const imgFile = dresseusesData[trainerName].length > 0 ? dresseusesData[trainerName][0] : null;
        const hasSecret = isEditMode && REGISTRE_SECRET[trainerName] && REGISTRE_SECRET[trainerName].length > 0;
        
        const safeName = trainerName.replace(/'/g, "\\'"); 
        const imagePath = imgFile ? `./assets/cards/dresseuses/${imgFile}` : '';
        const fallbackHTML = `<div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#64748b; font-size:0.75rem; text-align:center; padding:10px; background-color:#111;">${safeName}</div>`;

        const pocket = document.createElement('div');
        pocket.className = `hub-pocket ${hasSecret ? 'has-secret' : ''}`;
        
        pocket.innerHTML = `
            ${imgFile ? `<img src="${imagePath}" onerror="this.outerHTML='${fallbackHTML}'" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; background-color: #111;">` : fallbackHTML}
            
            <div style="position:absolute; top:0; left:0; width:6px; height:100%; background: linear-gradient(to right, rgba(0,0,0,0.6), transparent); pointer-events:none;"></div>
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(115deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 45%); pointer-events:none;"></div>
        `;
        
        pocket.onclick = () => window.location.href = `classeur.html?dresseuse=${encodeURIComponent(trainerName)}`;
        shelfContainer.appendChild(pocket);
    });

    const emptySlots = CARDS_PER_PAGE - pageTrainers.length;
    for (let e = 0; e < emptySlots; e++) {
        const emptyPocket = document.createElement('div');
        emptyPocket.className = 'hub-pocket is-empty';
        emptyPocket.style = 'border: 1px dashed #333; cursor: default;';
        emptyPocket.innerHTML = `<div style="position:absolute; inset:0; background: repeating-linear-gradient(-45deg, #111, #111 5px, #000 5px, #000 10px);"></div>`;
        shelfContainer.appendChild(emptyPocket);
    }

    const navContainer = document.getElementById('dresseuses-pagination');
    if (navContainer) {
        navContainer.innerHTML = '';
        if (totalPages > 1) {
            const btnPrev = document.createElement('button');
            btnPrev.innerHTML = "◀ Précédent";
            btnPrev.disabled = currentPageDresseuses === 0;
            btnPrev.onclick = () => { if (currentPageDresseuses > 0) { currentPageDresseuses--; renderDresseusesHub(); } };

            const btnNext = document.createElement('button');
            btnNext.innerHTML = "Suivant ▶";
            btnNext.disabled = currentPageDresseuses >= totalPages - 1;
            btnNext.onclick = () => { if (currentPageDresseuses < totalPages - 1) { currentPageDresseuses++; renderDresseusesHub(); } };

            navContainer.appendChild(btnPrev);
            navContainer.appendChild(btnNext);
        }
    }
}

// -> Classeur (classeur.html) - Flexbox Adaptatif
function renderDresseuseClasseur() {
    const container = document.getElementById('pages-container');
    const titleEl = document.getElementById('interior-title');
    if (!container || !titleEl || typeof dresseusesData === 'undefined') return; 

    const urlParams = new URLSearchParams(window.location.search);
    const trainerName = urlParams.get('dresseuse');
    
    if (!trainerName || !dresseusesData[trainerName]) { 
        titleEl.textContent = "DRESSEUSE INTROUVABLE"; 
        return; 
    }

    titleEl.textContent = trainerName;
    currentActiveTrainerDresseuse = trainerName;
    
    const trainerImages = dresseusesData[trainerName]; 
    const secretFiles = REGISTRE_SECRET[trainerName] || [];
    const hasMysteryCard = isEditMode && secretFiles.length > 0;
    
    const totalItems = trainerImages.length + (hasMysteryCard ? 1 : 0);
    
    let layoutClass = '';
    if (totalItems === 1) layoutClass = 'layout-max-1'; 
    else if (totalItems >= 2 && totalItems <= 4) layoutClass = 'layout-max-2'; 
    else if (totalItems === 5 || totalItems === 6) layoutClass = 'layout-max-3'; 
    else layoutClass = 'layout-max-4';

    let htmlContent = `<div class="layout-flex ${layoutClass}">`;
    
    trainerImages.forEach(imgFile => {
        const imgSrc = `./assets/cards/dresseuses/${imgFile}`;
        htmlContent += `
            <div class="binder-pocket">
                <div style="width:100%; height:100%; overflow:hidden; border-radius:3px; position:relative;">
                    <img src="${imgSrc}" alt="${trainerName}" onerror="this.src='./scripts/assets/img/back-fr.png'" loading="lazy" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain;">
                </div>
            </div>
        `;
    });

   if (hasMysteryCard) {
    htmlContent += `
        <div class="binder-pocket mystery-pocket" onclick="openLightbox3D()">
            <div class="mystery-visual">
                <img src="./assets/cards/dresseuses/ludvina-front.png" alt="Carte Secrète" class="secret-cover-img">
            </div>
        </div>
    `;
}
    
    htmlContent += `</div>`; 
    
    container.className = 'binder-page';
    container.innerHTML = htmlContent;
}

// -> Lightbox 3D (Module Dresseuses)
window.openLightbox3D = function() {
    currentSecretIndexDresseuse = 0;
    updateSecretImage3D();
    
    const lightbox = document.getElementById('secret-lightbox');
    const flipCard = document.getElementById('flip-card');
    const secretNav = document.getElementById('secret-nav');
    
    if (lightbox) lightbox.classList.add('active');
    if (flipCard) flipCard.classList.remove('is-flipped');
    if (secretNav) secretNav.classList.remove('visible');
};

window.closeLightbox = function(event) {
    if (event && (event.target.closest('#flip-card') || event.target.closest('#secret-nav'))) return;
    
    const lightbox = document.getElementById('secret-lightbox');
    if (lightbox) lightbox.classList.remove('active');
    
    setTimeout(() => {
        const flipCard = document.getElementById('flip-card');
        const secretNav = document.getElementById('secret-nav');
        if (flipCard) flipCard.classList.remove('is-flipped');
        if (secretNav) secretNav.classList.remove('visible');
    }, 400);
};

window.triggerFlip = function(event) {
    const flipCard = document.getElementById('flip-card');
    if (!flipCard) return;
    
    const isFlipped = flipCard.classList.contains('is-flipped');
    flipCard.classList.toggle('is-flipped');
    
    const secretFiles = REGISTRE_SECRET[currentActiveTrainerDresseuse] || [];
    if (secretFiles.length > 1) {
        const nav = document.getElementById('secret-nav');
        if (nav) {
            if (!isFlipped) setTimeout(() => nav.classList.add('visible'), 400);
            else nav.classList.remove('visible');
        }
    }
};

window.changeSecret = function(dir) {
    const secretFiles = REGISTRE_SECRET[currentActiveTrainerDresseuse] || [];
    if (secretFiles.length === 0) return;
    
    currentSecretIndexDresseuse += dir;
    if (currentSecretIndexDresseuse >= secretFiles.length) currentSecretIndexDresseuse = 0;
    if (currentSecretIndexDresseuse < 0) currentSecretIndexDresseuse = secretFiles.length - 1;
    
    updateSecretImage3D();
};

window.updateSecretImage3D = function() {
    const secretFiles = REGISTRE_SECRET[currentActiveTrainerDresseuse] || [];
    if (secretFiles.length === 0) return;
    
    const imgDisplay = document.getElementById('secret-img-display');
    if (imgDisplay) {
        imgDisplay.src = `./assets/cards/dresseuses/${secretFiles[currentSecretIndexDresseuse]}`;
    }
    
    const indicator = document.getElementById('secret-indicator');
    if (indicator) {
        indicator.innerText = `${currentSecretIndexDresseuse + 1} / ${secretFiles.length}`;
    }
};

// -> Lightbox Classique Globale (Utilisée par Pikachu & autres modules)
window.openLightbox = function(imgSrc) {
    let overlay = document.getElementById('lightbox-overlay-standard');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay-standard';
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;z-index:9999;opacity:0;pointer-events:none;transition:opacity 0.3s;";
        overlay.innerHTML = `<img src="" alt="Zoom Carte" style="max-width:90vw;max-height:90vh;border-radius:10px;box-shadow:0 0 50px rgba(0,0,0,0.8);transform:scale(0.95);transition:transform 0.3s;">`;
        document.body.appendChild(overlay);
        
        overlay.onclick = () => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.querySelector('img').style.transform = 'scale(0.95)';
        };
    }
    overlay.querySelector('img').src = imgSrc;
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
        overlay.querySelector('img').style.transform = 'scale(1)';
    }, 10);
};

/* ====================================================================
   8. MODULE PIKACHU 30TH (SLEEVE GLOSS & ZOOM SIMPLE)
==================================================================== */
function renderPikachuBinder() {
    const container = document.getElementById('pikachu-binder-container');
    if (!container || typeof pika30Data === 'undefined') return;

    const pikaCards = pika30Data[0].cartes;
    container.innerHTML = '';
    
    const CARDS_PER_PAGE = 12;
    const totalPages = Math.ceil(pikaCards.length / CARDS_PER_PAGE);

    for (let p = 0; p < totalPages; p++) {
        const pageCards = pikaCards.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
        const pageEl = document.createElement('div');
        pageEl.className = 'vaultx-page';

        let pageHTML = '';
        pageCards.forEach(c => {
            const isOwned = localCollection.has(c.id);
            const statusClass = isOwned ? 'is-owned' : 'not-owned';
            const imgSrc = `./assets/cards/pikachu/${c.id}.jpg`;

            // Filtre gris et opacité réduite si carte non possédée
            const imgStyle = isOwned ? 'width:100%; height:100%; object-fit:cover;' : 'width:100%; height:100%; object-fit:cover; filter: grayscale(100%) opacity(35%);';

            pageHTML += `
                <div class="vaultx-pocket ${statusClass}" onclick="handlePikachuClick('${c.id}', '${imgSrc}')">
                    <div style="width:100%; height:100%; overflow:hidden; border-radius:4px; position:relative; box-shadow: 0 2px 5px rgba(0,0,0,0.4); background-color: #111;">
                        <img src="${imgSrc}" alt="${c.nom}" onerror="this.src='./scripts/assets/img/back-fr.png'" loading="lazy" style="${imgStyle}">
                        
                        <!-- L'effet Sleeve Gloss ne s'affiche QUE si la carte est possédée -->
                        ${isOwned ? `<div style="position:absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(115deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 45%); pointer-events:none;"></div>` : ''}
                    </div>
                </div>
            `;
        });

        const emptySlots = CARDS_PER_PAGE - pageCards.length;
        for (let e = 0; e < emptySlots; e++) {
            pageHTML += `<div class="vaultx-pocket is-empty"></div>`;
        }
        
        pageEl.innerHTML = pageHTML;
        container.appendChild(pageEl);
    }
}

window.handlePikachuClick = function(id, imgSrc) {
    if (isEditMode) {
        if (localCollection.has(id)) {
            localCollection.delete(id);
        } else {
            localCollection.add(id);
        }
        saveToCloud();
        updateAllViews(); 
    } else {
        if (localCollection.has(id)) {
            openLightbox(imgSrc); // Utilise la Lightbox Classique
        }
    }
};

function initPika30ProgressHub() {
    const fill = document.getElementById("pika30-hub-progress-fill");
    const text = document.getElementById("pika30-hub-progress-text");
    if (!fill || !text || typeof pika30Data === 'undefined') return;

    const total = pika30Data[0].cartes.length;
    let current = 0;
    
    localCollection.forEach(id => {
        if (id.startsWith('pika30-')) current++;
    });

    const percent = Math.min(100, Math.round((current / total) * 100));
    fill.style.width = `${percent}%`;
    text.innerText = `${current} / ${total} • ${percent}%`;
}

/* ====================================================================
   9. EXÉCUTION & SYNCHRO
==================================================================== */
function updateAllViews() {
    renderPokedex();
    
    if (document.getElementById('binder-deck') && !document.querySelector('.pikachu-binder')) {
        const isMewtwo = document.body.classList.contains('theme-mewtwo') || (document.title && document.title.toLowerCase().includes('mewtwo'));
        renderBinderView(isMewtwo ? 'mewtwo' : 'mew');
    }
    
    renderLegacyCollection('mew', 'mew-grid');
    renderLegacyCollection('mewtwo', 'mewtwo-grid');
    renderPantheon();
    renderDresseusesHub();
    renderDresseuseClasseur();
    
    renderPikachuBinder();
    initPika30ProgressHub();
}

function setupDock() {
    if (document.getElementById('floating-dock')) return;
    const dock = document.createElement('nav');
    dock.id = 'floating-dock';
    dock.className = 'floating-dock';
    
    let backLink = '';
    if (window.location.pathname.includes('classeur.html')) {
        backLink = `<a href="dresseuses.html" class="dock-btn" title="Retour"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></a>`;
    } else if (!window.location.pathname.includes('index.html') && window.location.pathname.length > 1) {
        backLink = `<a href="index.html" class="dock-btn" title="Retour"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></a>`;
    }

    dock.innerHTML = `
        ${backLink}
        <a href="index.html" class="dock-btn" title="Accueil"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></a>
        <button type="button" id="dock-btn-top" class="dock-btn" title="Haut de page"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg></button>
        <button type="button" id="dock-btn-lock" class="dock-btn dock-btn-lock" style="display: none;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></button>
    `;
    document.body.appendChild(dock);
    
    document.getElementById('dock-btn-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('dock-btn-lock').addEventListener('click', () => { if (auth) auth.signOut(); });

    document.querySelectorAll('a, button, div').forEach(el => {
        if (el.textContent && el.textContent.trim().toUpperCase().includes('RETOUR AU PANTHÉON')) {
            el.style.display = 'none';
        }
    });
}

function setupAdminTrigger() {
    const mainTitle = document.querySelector('.header-main h1');
    if (!mainTitle) return;
    mainTitle.addEventListener('dblclick', triggerLogin);
}

function triggerLogin() {
    if (isEditMode || !auth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    
    provider.setCustomParameters({
        login_hint: ADMIN_EMAIL
    });

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
