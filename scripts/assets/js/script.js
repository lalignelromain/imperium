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
   6. MODULE DRESSEUSES (HUB & CLASSEUR) - GALERIE & MULTI-SECRÈTES
==================================================================== */

// REGISTRE DES CARTES SECRÈTES (MODE ÉDITION UNIQUEMENT)
// RAPPEL : Remplace ces noms par les VRAIS noms de tes images secrètes !!
const REGISTRE_SECRET = {
    "Carolina": ["carolina.jpg"],
    "Cynthia": ["cynthia.jpg"],
    "Donna": ["donna.jpg"],
    "Erika": ["erika.jpg"],
    "Gladys": ["gladys.jpg"],
    "Lillie": ["lillie.jpg"],
    "Margie": ["margie.jpg"],
    "Nacchara": ["irida.jpg"],
    "Rosemary": ["rosemary.jpg"],
    "Roxanne": ["roxanne.jpg"],
    "Sophora": ["sophora.jpg"]
};

// -> Le Hub des Toploaders (dresseuses.html)
function renderDresseusesHub() {
    const shelfContainer = document.getElementById('shelf');
    if (!shelfContainer || typeof dresseusesData === 'undefined') return; 

    const trainers = Object.keys(dresseusesData).sort((a, b) => a.localeCompare(b, 'fr'));
    shelfContainer.innerHTML = '';
    
    const exactCount = trainers.length;
    const totalSlots = Math.ceil(exactCount / 4) * 4; 

    for (let i = 0; i < totalSlots; i++) {
        const trainerName = trainers[i];
        const isEmpty = !trainerName;
        
        const imgFile = !isEmpty && dresseusesData[trainerName].length > 0 ? dresseusesData[trainerName][0] : null;
        
        let imgHtml = '<span style="font-size: 0.9rem;">🖼️</span>';
        
        if (imgFile) {
            const imagePath = `./assets/cards/dresseuses/${imgFile}`;
            const safeName = trainerName.replace(/'/g, "\\'"); 
            
            imgHtml = `<img src="${imagePath}" onerror="this.outerHTML='<span class=\\'card-name\\' style=\\'color:#64748b; font-size:0.75rem; text-align:center; padding:10px;\\'>${safeName}</span>'" style="width:100%; height:100%; object-fit:cover; opacity:0.8; border-radius:2px;" loading="lazy">`;
        }

        // --- NOUVEAUTÉ : Indicateur de secrète en mode édition ---
        let secretBadge = '';
        if (isEditMode && !isEmpty && REGISTRE_SECRET[trainerName]) {
            const count = REGISTRE_SECRET[trainerName].length;
            secretBadge = `
                <div style="position: absolute; top: -8px; right: -8px; background: #f472b6; color: #000; font-size: 0.7rem; font-weight: 800; padding: 3px 6px; border-radius: 12px; z-index: 10; box-shadow: 0 0 8px rgba(244, 114, 182, 0.6); display: flex; align-items: center; gap: 3px; pointer-events: none;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ${count}
                </div>
            `;
        }

        const pocket = document.createElement('div');
        pocket.className = 'binder-pocket';
        // Position relative pour le badge
        pocket.style.position = 'relative';
        
        pocket.innerHTML = `
            ${secretBadge}
            <div class="toploader-insert" ${isEmpty ? 'style="border-style:dashed; opacity:0.3;"' : ''}>
                <div class="card-in-sleeve" style="${imgFile ? 'padding:0;' : ''}">
                    ${isEmpty ? '' : imgHtml}
                    ${!isEmpty && !imgFile ? `<span class="card-name">${trainerName}</span>` : ''}
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
    if (!container || !titleEl || typeof dresseusesData === 'undefined') return; 

    const existingTab = document.getElementById('secret-tab');
    if (existingTab) existingTab.remove();

    const urlParams = new URLSearchParams(window.location.search);
    const trainerName = urlParams.get('dresseuse');
    
    if (!trainerName || !dresseusesData[trainerName]) { 
        titleEl.textContent = "DRESSEUSE INTROUVABLE"; 
        return; 
    }

    titleEl.textContent = trainerName;
    const trainerImages = dresseusesData[trainerName]; 
    container.innerHTML = '';
    
    const CARDS_PER_PAGE = window.innerWidth <= 800 ? 4 : 6;
    const totalPages = Math.ceil(trainerImages.length / CARDS_PER_PAGE) || 1;

    for (let p = 0; p < totalPages; p++) {
        const pageImages = trainerImages.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
        const pageEl = document.createElement('div');
        pageEl.className = 'vaultx-page';

        let pageHTML = '';
        pageImages.forEach(imgFile => {
            const imgSrc = `./assets/cards/dresseuses/${imgFile}`;
            
            // Affichage normal (galerie, pas de système grisé)
            pageHTML += `
                <div class="vaultx-pocket">
                    <div style="width:100%; height:100%; overflow:hidden; border-radius:3px; position:relative;">
                        <img src="${imgSrc}" alt="${trainerName}" onerror="this.src='./scripts/assets/img/back-fr.png'" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                </div>
            `;
        });

        const emptySlots = CARDS_PER_PAGE - pageImages.length;
        for (let e = 0; e < emptySlots; e++) pageHTML += `<div class="vaultx-pocket is-empty"></div>`;

        pageEl.innerHTML = pageHTML;
        container.appendChild(pageEl);
    }

    // MECANIQUE CARTES SECRÈTES MULTIPLES & TAILLE AJUSTÉE
    if (isEditMode && REGISTRE_SECRET[trainerName]) {
        const secretFiles = REGISTRE_SECRET[trainerName];
        
        const tab = document.createElement('div');
        tab.id = 'secret-tab';
        tab.className = 'secret-tab';
        tab.textContent = 'SECRET';
        document.body.appendChild(tab);

        tab.onclick = () => {
            if (tab.textContent === 'SECRET') {
                // Création d'une galerie flexible et centrée pour les secrètes
                let secretHTML = '<div class="vaultx-page-secret" style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; padding: 20px;">';
                
                secretFiles.forEach(secretFileName => {
                    const imgSrc = `./assets/cards/dresseuses/${secretFileName}`;
                    // max-width 260px appliqué pour garder une taille de carte standard
                    secretHTML += `
                        <div class="vaultx-pocket" onclick="openLightbox('${imgSrc}')" title="Cliquer pour zoomer" style="max-width: 260px; width: 100%; aspect-ratio: 734/1024; flex-shrink: 0; cursor: zoom-in;">
                            <img src="${imgSrc}" alt="Secrète ${trainerName}" onerror="this.src='./scripts/assets/img/back-fr.png'" style="width:100%; height:100%; object-fit:cover; border-radius: 4px;">
                        </div>
                    `;
                });
                
                secretHTML += '</div>';
                container.innerHTML = secretHTML;
                
                tab.textContent = 'RETOUR';
                tab.style.background = 'linear-gradient(135deg, #8a94a2, #5a636f)';
                tab.style.borderColor = '#949ea8';
                tab.style.boxShadow = '-4px 0 15px rgba(138, 148, 162, 0.4)';
            } else {
                renderDresseuseClasseur();
            }
        };
    }
}

// Fonction globale pour la Lightbox
window.openLightbox = function(imgSrc) {
    let overlay = document.getElementById('lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'lightbox-overlay';
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `<img class="lightbox-card" src="" alt="Zoom Carte Secrète">`;
        document.body.appendChild(overlay);
        
        overlay.onclick = () => overlay.classList.remove('active');
    }
    overlay.querySelector('img').src = imgSrc;
    setTimeout(() => overlay.classList.add('active'), 10);
};

/* ====================================================================
   8. MODULE PIKACHU 30TH
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
            const extSrc = `./assets/cards/pikachu/${c.id}-ext.jpg`;

            pageHTML += `
                <div class="vaultx-pocket ${statusClass}" onclick="handlePikachuClick('${c.id}', '${imgSrc}', '${extSrc}')">
                    <div class="sleeve-matte">
                        <img src="${imgSrc}" alt="${c.nom}" onerror="this.src='./scripts/assets/img/back-fr.png'" loading="lazy">
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

window.handlePikachuClick = function(id, imgSrc, extSrc) {
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
            openCollectAura(imgSrc, extSrc);
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

window.openCollectAura = function(cardSrc, extendedBackgroundSrc) {
    const lightbox = document.getElementById('collectaura-lightbox');
    const frameBg = document.getElementById('collectaura-frame-bg');
    const cardImg = document.getElementById('collectaura-card-img');
    if (!lightbox) return;

    cardImg.src = cardSrc;
    frameBg.style.backgroundImage = `url('${extendedBackgroundSrc}')`;
    lightbox.classList.add('active');
};

window.closeCollectAura = function() {
    const lightbox = document.getElementById('collectaura-lightbox');
    if (lightbox) lightbox.classList.remove('active');
};

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
    
    // Détection de la page pour gérer la flèche Retour
    let backLink = '';
    if (window.location.pathname.includes('classeur.html')) {
        // Retourne à la bibliothèque des toploaders
        backLink = `<a href="dresseuses.html" class="dock-btn" title="Retour"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></a>`;
    } else if (!window.location.pathname.includes('index.html') && window.location.pathname.length > 1) {
        // Pour les autres pages, un retour général vers l'accueil
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

    // Masquage automatique de tout ancien bouton "Retour au Panthéon" codé en dur dans ton HTML
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
