document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    const container = document.getElementById('cards-container');

    if (!container || typeof cartesDatabase === 'undefined') return;

    let cartesAffichees = [];

    if (page === 'pokedex') {
        cartesAffichees = cartesDatabase;
    } else if (page === 'mew') {
        cartesAffichees = cartesDatabase.filter(c => 
            c.possedee === true && c.nom.toLowerCase().includes('mew') && !c.nom.toLowerCase().includes('mewtwo')
        );
    } else if (page === 'mewtwo') {
        cartesAffichees = cartesDatabase.filter(c => 
            c.possedee === true && c.nom.toLowerCase().includes('mewtwo')
        );
    }

    if (cartesAffichees.length === 0) {
        container.innerHTML = '<p class="empty-msg">Aucune carte trouvée pour cette section.</p>';
        return;
    }

    container.innerHTML = cartesAffichees.map(carte => {
        const estPossedee = carte.possedee === true ? 'is-owned' : '';
        const imageSrc = carte.image || 'assets/img/placeholder.png';

        return `
            <article class="card-item ${estPossedee}">
                <img src="${imageSrc}" alt="${carte.nom}" loading="lazy">
                <div class="card-info">
                    <p class="card-name">${carte.nom}</p>
                    <p class="card-meta">#${carte.numero} · ${carte.extension}</p>
                </div>
            </article>
        `;
    }).join('');
});
