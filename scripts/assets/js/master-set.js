// Master Set EV05 : 162 régulières + 56 secrètes + 4 promos Stamped (222 au total)
const EV5_CARDS = [
    ...Array.from({ length: 218 }, (_, i) => {
        const num = String(i + 1).padStart(3, '0');
        const isSecret = (i + 1) > 162;
        return {
            id: `ev05_${num}`,
            number: `${num}/162`,
            name: isSecret ? `Secrète #${num}` : `Carte #${num}`,
            img: `https://assets.tcgdex.net/fr/sv/sv05/${num}/high.webp`
        };
    }),
    { id: "ev05_stamp_koraidon_pc", number: "PROMO", name: "Koraidon (Pokémon Center)", img: "https://assets.tcgdex.net/fr/sv/svp/113/high.webp" },
    { id: "ev05_stamp_miraidon_pc", number: "PROMO", name: "Miraidon (Pokémon Center)", img: "https://assets.tcgdex.net/fr/sv/svp/114/high.webp" },
    { id: "ev05_stamp_prerelease_1", number: "STAFF", name: "Rugit-Lune (Avant-première)", img: "https://assets.tcgdex.net/fr/sv/svp/115/high.webp" },
    { id: "ev05_stamp_prerelease_2", number: "STAFF", name: "Garde-de-Fer (Avant-première)", img: "https://assets.tcgdex.net/fr/sv/svp/116/high.webp" }
];

let ownedCards = new Set();
let docRef = null;

// 1. Rendu direct de la grille
function renderGrid() {
    const grid = document.getElementById("master-grid");
    if (!grid) return;
    
    grid.innerHTML = EV5_CARDS.map(card => `
        <div class="card-item ${ownedCards.has(card.id) ? 'is-owned' : 'not-owned'}" id="${card.id}" onclick="toggleCard('${card.id}')">
            <img src="${card.img}" alt="${card.name}" loading="lazy">
            <div class="card-info">
                <div class="card-name">${card.name}</div>
                <div class="card-meta">${card.number}</div>
            </div>
        </div>
    `).join('');
}

// 2. Bascule d'état au clic
window.toggleCard = function(cardId) {
    if (ownedCards.has(cardId)) {
        ownedCards.delete(cardId);
    } else {
        ownedCards.add(cardId);
    }
    
    updateUI();
    updateProgress();
    
    // Sauvegarde locale instantanée
    localStorage.setItem("ev5_owned_cards", JSON.stringify(Array.from(ownedCards)));

    // Sauvegarde distante si Firebase est actif
    if (docRef) {
        docRef.set({ owned: Array.from(ownedCards) }, { merge: true })
            .catch(err => console.error("Erreur Firebase Firestore:", err));
    }
};

function updateUI() {
    EV5_CARDS.forEach(card => {
        const el = document.getElementById(card.id);
        if (el) {
            if (ownedCards.has(card.id)) {
                el.classList.add('is-owned');
                el.classList.remove('not-owned');
            } else {
                el.classList.add('not-owned');
                el.classList.remove('is-owned');
            }
        }
    });
}

function updateProgress() {
    const total = EV5_CARDS.length;
    const current = ownedCards.size;
    const percent = Math.min(100, Math.round((current / total) * 100));

    const fill = document.getElementById("master-progress-fill");
    const text = document.getElementById("master-progress-text");
    if (fill) fill.style.width = `${percent}%`;
    if (text) text.innerText = `${current} / ${total} CARTES • ${percent}%`;
    
    // Cache de progression pour le Hub
    localStorage.setItem("ev5_progress_cache", JSON.stringify({ current, total, percent }));
}

// 3. Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    // Restaure le cache local immédiatement
    const localData = localStorage.getItem("ev5_owned_cards");
    if (localData) {
        try {
            ownedCards = new Set(JSON.parse(localData));
        } catch(e) {}
    }

    // Affiche les cartes sans attendre
    renderGrid();
    updateProgress();

    // Connexion Firebase sécurisée
    if (typeof db !== "undefined") {
        try {
            docRef = db.collection("collections").doc("masterset_ev05");
            docRef.onSnapshot((doc) => {
                if (doc.exists && doc.data().owned) {
                    ownedCards = new Set(doc.data().owned);
                    localStorage.setItem("ev5_owned_cards", JSON.stringify(Array.from(ownedCards)));
                    updateUI();
                    updateProgress();
                }
            });
        } catch (e) {
            console.warn("Connexion Firestore en attente :", e);
        }
    } else {
        console.warn("Objet 'db' non trouvé. Vérifiez l'inclusion du script Firebase config.");
    }
});
