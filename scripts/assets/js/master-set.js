// ====================================================================
// MASTER SET EV05 : FORCES TEMPORELLES (SYNCHRO FIRESTORE MULTI-DEVICES)
// ====================================================================

// Numéros sans version Reverse (10 Pokémon-ex + 7 cartes HIGH-TECH / ACE SPEC)
const NO_REVERSE_SET = new Set([
    "012", "025", "035", "038", "060", "081", "099", "104", "108", "123",
    "141", "149", "152", "153", "154", "157", "158"
]);

// 222 cartes de base + secrètes + promos
const EV5_CARDS = [
    ...Array.from({ length: 218 }, (_, i) => {
        const num = String(i + 1).padStart(3, '0');
        const isSecret = (i + 1) > 162;
        const hasReverse = !isSecret && !NO_REVERSE_SET.has(num);
        return {
            id: `ev05_${num}`,
            number: `${num}/162`,
            name: isSecret ? `Secrète #${num}` : `Carte #${num}`,
            img: `https://assets.tcgdex.net/fr/sv/sv05/${num}/high.webp`,
            hasReverse: hasReverse
        };
    }),
    { id: "ev05_stamp_koraidon_pc", number: "PROMO", name: "Koraidon (Pokémon Center)", img: "https://assets.tcgdex.net/fr/sv/svp/113/high.webp", hasReverse: false },
    { id: "ev05_stamp_miraidon_pc", number: "PROMO", name: "Miraidon (Pokémon Center)", img: "https://assets.tcgdex.net/fr/sv/svp/114/high.webp", hasReverse: false },
    { id: "ev05_stamp_prerelease_1", number: "STAFF", name: "Rugit-Lune (Avant-première)", img: "https://assets.tcgdex.net/fr/sv/svp/115/high.webp", hasReverse: false },
    { id: "ev05_stamp_prerelease_2", number: "STAFF", name: "Garde-de-Fer (Avant-première)", img: "https://assets.tcgdex.net/fr/sv/svp/116/high.webp", hasReverse: false }
];

// Total exact : 367 versions réelles à collectionner
const TOTAL_COLLECTIBLE = EV5_CARDS.reduce((sum, c) => sum + (c.hasReverse ? 2 : 1), 0);

let ownedCards = new Set();
let ev5DocRef = null;

// Rendu HTML du classeur virtuel
function renderGrid() {
    const grid = document.getElementById("master-grid");
    if (!grid) return;

    grid.innerHTML = EV5_CARDS.map(card => {
        const regId = `${card.id}_reg`;
        const revId = `${card.id}_rev`;

        const hasReg = ownedCards.has(regId);
        const hasRev = card.hasReverse ? ownedCards.has(revId) : false;

        let statusClass = "status-none";
        if (card.hasReverse) {
            if (hasReg && hasRev) statusClass = "status-complete";
            else if (hasReg || hasRev) statusClass = "status-partial";
        } else {
            if (hasReg) statusClass = "status-complete";
        }

        return `
            <div class="card-item ${statusClass}" id="${card.id}">
                <img src="${card.img}" alt="${card.name}" loading="lazy">
                <div class="card-info">
                    <div class="card-name">${card.name}</div>
                    <div class="card-meta">${card.number}</div>

                    <div class="variant-pills">
                        ${card.hasReverse ? `
                            <button type="button" class="pill-btn pill-reg ${hasReg ? 'active' : ''}" onclick="toggleVariant('${regId}')">Normale</button>
                            <button type="button" class="pill-btn pill-rev ${hasRev ? 'active' : ''}" onclick="toggleVariant('${revId}')">Reverse</button>
                        ` : `
                            <button type="button" class="pill-btn pill-unique ${hasReg ? 'active' : ''}" onclick="toggleVariant('${regId}')">Unique</button>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Clic : bascule d'état et écriture Firestore
window.toggleVariant = function(variantId) {
    if (ownedCards.has(variantId)) {
        ownedCards.delete(variantId);
    } else {
        ownedCards.add(variantId);
    }

    updateUI();
    updateProgress();

    // Cache local immédiat
    localStorage.setItem("ev5_owned_cards", JSON.stringify(Array.from(ownedCards)));

    // Connexion Firestore si pas encore attachée
    if (!ev5DocRef && typeof db !== "undefined" && db) {
        ev5DocRef = db.collection("vitrine").doc("masterset_ev05");
    }

    if (ev5DocRef) {
        ev5DocRef.set({ 
            owned: Array.from(ownedCards),
            derniereMaj: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
        .then(() => {
            console.log("✓ Cloud Firebase mis à jour");
        })
        .catch(err => {
            console.error("Erreur Firebase Firestore :", err);
            alert("Erreur Firebase (" + err.code + ") : connectez-vous avec un appui long sur le titre pour autoriser l'écriture.");
        });
    }
};

function updateUI() {
    EV5_CARDS.forEach(card => {
        const el = document.getElementById(card.id);
        if (!el) return;

        const regId = `${card.id}_reg`;
        const revId = `${card.id}_rev`;
        const hasReg = ownedCards.has(regId);
        const hasRev = card.hasReverse ? ownedCards.has(revId) : false;

        el.classList.remove("status-none", "status-partial", "status-complete");
        if (card.hasReverse) {
            if (hasReg && hasRev) el.classList.add("status-complete");
            else if (hasReg || hasRev) el.classList.add("status-partial");
            else el.classList.add("status-none");
        } else {
            if (hasReg) el.classList.add("status-complete");
            else el.classList.add("status-none");
        }

        const btnReg = el.querySelector(".pill-reg, .pill-unique");
        const btnRev = el.querySelector(".pill-rev");
        if (btnReg) btnReg.classList.toggle("active", hasReg);
        if (btnRev) btnRev.classList.toggle("active", hasRev);
    });
}

function updateProgress() {
    const current = ownedCards.size;
    const percent = Math.min(100, Math.round((current / TOTAL_COLLECTIBLE) * 100));

    const fill = document.getElementById("master-progress-fill");
    const text = document.getElementById("master-progress-text");
    if (fill) fill.style.width = `${percent}%`;
    if (text) text.innerText = `${current} / ${TOTAL_COLLECTIBLE} CARTES • ${percent}%`;

    localStorage.setItem("ev5_progress_cache", JSON.stringify({ current, total: TOTAL_COLLECTIBLE, percent }));
}

function migrateLegacyIds() {
    let changed = false;
    ownedCards.forEach(id => {
        if (!id.endsWith("_reg") && !id.endsWith("_rev")) {
            ownedCards.delete(id);
            ownedCards.add(`${id}_reg`);
            changed = true;
        }
    });
    return changed;
}

// Initialisation et écoute temps réel
function initMasterSet() {
    // 1. Restauration cache local immédiat
    const localData = localStorage.getItem("ev5_owned_cards");
    if (localData) {
        try {
            ownedCards = new Set(JSON.parse(localData));
            migrateLegacyIds();
        } catch(e) {}
    }

    renderGrid();
    updateProgress();

    // 2. Synchronisation Firebase (collection 'vitrine')
    if (typeof db !== "undefined" && db) {
        ev5DocRef = db.collection("vitrine").doc("masterset_ev05");
        ev5DocRef.onSnapshot((doc) => {
            if (doc.exists && doc.data().owned) {
                ownedCards = new Set(doc.data().owned);
                if (migrateLegacyIds()) {
                    ev5DocRef.set({ owned: Array.from(ownedCards) }, { merge: true });
                }
                localStorage.setItem("ev5_owned_cards", JSON.stringify(Array.from(ownedCards)));
                updateUI();
                updateProgress();
            }
        }, (err) => {
            console.error("Erreur lecture Firestore EV05 :", err);
        });
    } else {
        setTimeout(initMasterSet, 200);
    }
}

document.addEventListener("DOMContentLoaded", initMasterSet);
