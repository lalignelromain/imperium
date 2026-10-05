document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    const container = document.getElementById('cards-container');

    if (!container || typeof cartesDatabase === 'undefined') return;

    // Dos de cartes par défaut selon la langue
    const BACK_FR = 'https://images.pokemontcg.io/back/fr.png'; // ou lien d'un dos classique
    const BACK_JA = 'https://images.pokemontcg.io/back/ja.png';

    // Rendu conditionnel selon la page
    let cartesAffichees = [];
    if (page === 'pokedex') {
        cartesAffichees = cartesDatabase;
    } else if (page === 'mew') {
        cartesAffichees = cartesDatabase.filter(c => c.possedee === true && isMew(c.nom));
    } else if (page === 'mewtwo') {
        cartesAffichees = cartesDatabase.filter(c => c.possedee === true && isMewtwo(c.nom));
    }

    function isMewtwo(nom) {
        return nom.toLowerCase().includes('mewtwo');
    }

    function isMew(nom) {
        return nom.toLowerCase().includes('mew') && !isMewtwo(nom);
    }

    function getFallbackImage(langue) {
        return langue === 'ja'
            ? 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/220px-Pokemon_Trading_Card_Game_cardback.jpg'
            : 'https://images.pokemontcg.io/sm1/back_hires.png';
    }

    if (cartesAffichees.length === 0) {
        container.innerHTML = '<p class="empty-msg">Aucune carte trouvée pour cette section.</p>';
        return;
    }

    container.innerHTML = cartesAffichees.map(carte => {
        const theme = isMewtwo(carte.nom) ? 'theme-mewtwo' : 'theme-mew';
        const ownedClass = carte.possedee ? 'is-owned' : '';
        const fallback = getFallbackImage(carte.langue);
        const imageSrc = carte.image || fallback;

        return `
            <article class="card-item ${theme} ${ownedClass}" data-id="${carte.id}">
                <img src="${imageSrc}" alt="${carte.nom}" loading="lazy" onerror="this.onerror=null; this.src='${fallback}';">
                <div class="card-info">
                    <p class="card-name">${carte.nom}</p>
                    <p class="card-meta">#${carte.numero} · ${carte.extension}</p>
                </div>
            </article>
        `;
    }).join('');

    // Mode interactif uniquement sur le Pokédex
    if (page === 'pokedex') {
        // Clic pour basculer possedee: true/false
        container.addEventListener('click', (e) => {
            const cardEl = e.target.closest('.card-item');
            if (!cardEl) return;

            const cardId = cardEl.dataset.id;
            const cardObj = cartesDatabase.find(c => c.id === cardId);
            if (!cardObj) return;

            cardObj.possedee = !cardObj.possedee;
            cardEl.classList.toggle('is-owned', cardObj.possedee);
        });

        // Bouton flottant pour exporter les données mises à jour
        const adminBar = document.createElement('div');
        adminBar.className = 'admin-bar';
        adminBar.innerHTML = `
            <span id="owned-count">${cartesDatabase.filter(c => c.possedee).length} possédée(s)</span>
            <button id="btn-export" class="btn-export">Télécharger cartes-data.js</button>
        `;
        document.body.appendChild(adminBar);

        container.addEventListener('click', () => {
            const count = cartesDatabase.filter(c => c.possedee).length;
            document.getElementById('owned-count').textContent = `${count} possédée(s)`;
        });

        document.getElementById('btn-export').addEventListener('click', () => {
            const fileContent = 'const cartesDatabase = ' + JSON.stringify(cartesDatabase, null, 4) + ';\n';
            const blob = new Blob([fileContent], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'cartes-data.js';
            a.click();
            URL.revokeObjectURL(url);
        });
    }
});
