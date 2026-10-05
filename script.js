document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    const container = document.getElementById('cards-container');

    if (!container || typeof cartesDatabase === 'undefined') return;

    // Récupération des IDs sauvegardés dans le navigateur
    const STORAGE_KEY = 'imperium_owned_cards';
    let ownedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

    // Synchronisation de l'état initial
    cartesDatabase.forEach(c => {
        if (ownedIds.has(c.id)) {
            c.possedee = true;
        }
    });

    const isMewtwo = (nom) => nom.toLowerCase().includes('mewtwo');
    const isMew = (nom) => nom.toLowerCase().includes('mew') && !isMewtwo(nom);

    // Dos de cartes FR et JA 
    const BACK_FR = 'back-fr.png';
    const BACK_JA = 'back-ja.png';

    function getFallbackImage(langue) {
        return (langue && langue.toLowerCase() === 'ja') ? BACK_JA : BACK_FR;
    }

    // Filtrage selon la vue
    let cartesAffichees = [];
    if (page === 'pokedex') {
        cartesAffichees = cartesDatabase;
    } else if (page === 'mew') {
        cartesAffichees = cartesDatabase.filter(c => ownedIds.has(c.id) && isMew(c.nom));
    } else if (page === 'mewtwo') {
        cartesAffichees = cartesDatabase.filter(c => ownedIds.has(c.id) && isMewtwo(c.nom));
    }

    if (cartesAffichees.length === 0) {
        container.innerHTML = '<p class="empty-msg">Aucune carte possédée pour le moment dans cette section.</p>';
        return;
    }

    container.innerHTML = cartesAffichees.map(carte => {
        const theme = isMewtwo(carte.nom) ? 'theme-mewtwo' : 'theme-mew';
        const isOwned = ownedIds.has(carte.id) ? 'is-owned' : '';
        const fallback = getFallbackImage(carte.langue);
        const imageSrc = carte.image || fallback;

        return `
            <article class="card-item ${theme} ${isOwned}" data-id="${carte.id}">
                <img src="${imageSrc}" alt="${carte.nom}" loading="lazy" onerror="this.onerror=null; this.src='${fallback}';">
                <div class="card-info">
                    <p class="card-name">${carte.nom}</p>
                    <p class="card-meta">#${carte.numero} · ${carte.extension}</p>
                </div>
            </article>
        `;
    }).join('');

    // Interaction uniquement active sur le Pokédex
    if (page === 'pokedex') {
        container.addEventListener('click', (e) => {
            const cardEl = e.target.closest('.card-item');
            if (!cardEl) return;

            const cardId = cardEl.dataset.id;

            if (ownedIds.has(cardId)) {
                ownedIds.delete(cardId);
                cardEl.classList.remove('is-owned');
            } else {
                ownedIds.add(cardId);
                cardEl.classList.add('is-owned');
            }

            // Sauvegarde instantanée et transparente
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...ownedIds]));
        });
    }
});
