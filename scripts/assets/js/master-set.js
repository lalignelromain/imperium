// ====================================================================
// MASTER SET EV05 : FORCES TEMPORELLES (363 CARTES - SANS PROMOS)
// ====================================================================

// Numéros sans version Reverse (10 Pokémon-ex + 7 cartes HIGH-TECH)
const NO_REVERSE_SET = new Set([
    "012", "025", "035", "038", "060", "081", "099", "104", "108", "123",
    "141", "149", "152", "153", "154", "157", "158"
]);

// 218 cartes régulières et secrètes (001 à 218)
const EV5_CARDS = Array.from({ length: 218 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    const isSecret = (i + 1) > 162;
    const hasReverse = !isSecret && !NO_REVERSE_SET.has(num);
    return {
        id: `ev05_${num}`,
        number: `${num}/162`,
        img: `https://assets.tcgdex.net/fr/sv/sv05/${num}/high.webp`,
        hasReverse: hasReverse
    };
});

// Total réel : 363 cartes
const TOTAL_COLLECTIBLE = EV5_CARDS.reduce((sum, c) => sum + (c.hasReverse ? 2 : 1), 0);

let ownedCards = new Set();

function getDbInstance() {
    if (typeof db !== "undefined" && db) return db;
    if (typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0) {
        return firebase.firestore();
    }
    return null;
}

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
                <img src="${card.img}" alt="Carte ${card.number}" loading="lazy">
                <div class="card-info">
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

window.toggleVariant = function(variantId) {
    if (ownedCards.has(variantId)) {
        ownedCards.delete(variantId);
    } else {
        ownedCards.add(variantId);
    }

    updateUI();
    updateProgress();

    localStorage.setItem("ev5_owned_cards", JSON.stringify(Array.from(ownedCards)));
    saveToFirestore();
};

function saveToFirestore() {
    const firestore = getDbInstance();
    if (!firestore) return;

    firestore.collection("vitrine").doc("cartes").set({
        ev05: Array.from(ownedCards),
        derniereMaj: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
    .then(() => {
        console.log("✓ EV05 synchronisé avec Firestore :", ownedCards.size);
    })
    .catch(err => {
        console.error("Erreur Firestore :", err);
        if (err.code === "permission-denied") {
            alert("Action refusée : connectez-vous avec un double-clic (ou appui long) sur le titre.");
        }
    });
}

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
        // Nettoie aussi d'éventuelles cartes promos enregistrées précédemment
        if (id.includes("stamp")) {
            ownedCards.delete(id);
            changed = true;
        } else if (!id.endsWith("_reg") && !id.endsWith("_rev")) {
            ownedCards.delete(id);
            ownedCards.add(`${id}_reg`);
            changed = true;
        }
    });
    return changed;
}

function initMasterSet() {
    const localData = localStorage.getItem("ev5_owned_cards");
    if (localData) {
        try {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
                ownedCards = new Set(parsed);
                migrateLegacyIds();
            }
        } catch (e) {}
    }

    renderGrid();
    updateProgress();

    const firestore = getDbInstance();
    if (!firestore) {
        setTimeout(initMasterSet, 250);
        return;
    }

    firestore.collection("vitrine").doc("cartes").onSnapshot((doc) => {
        if (doc.exists && doc.data() && Array.isArray(doc.data().ev05)) {
            ownedCards = new Set(doc.data().ev05);
            if (migrateLegacyIds()) {
                saveToFirestore();
            }
            localStorage.setItem("ev5_owned_cards", JSON.stringify(Array.from(ownedCards)));
            updateUI();
            updateProgress();
        } else if (ownedCards.size > 0) {
            saveToFirestore();
        }
    }, (err) => {
        console.error("Erreur lecture Firestore EV05 :", err);
    });
}

document.addEventListener("DOMContentLoaded", initMasterSet);
