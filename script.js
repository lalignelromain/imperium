document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    const BACK_FR = 'back-fr.png';
    const BACK_JA = 'back-ja.png';

    function getFallbackImage(langue) {
        return (langue && langue.toLowerCase() === 'ja') ? BACK_JA : BACK_FR;
    }

    /* ==========================================
       GESTION DES PAGES POKÉDEX, MEW, MEWTWO
    ========================================== */
    if (['pokedex', 'mew', 'mewtwo'].includes(page)) {
        const container = document.getElementById('cards-container');
        if (!container || typeof cartesDatabase === 'undefined') return;

        const STORAGE_KEY = 'imperium_owned_cards';
        let ownedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

        cartesDatabase.forEach(c => {
            if (ownedIds.has(c.id)) {
                c.possedee = true;
            }
        });

        const isMewtwo = (nom) => nom.toLowerCase().includes('mewtwo');
        const isMew = (nom) => nom.toLowerCase().includes('mew') && !isMewtwo(nom);

        let cartesAffichees = [];
        if (page === 'pokedex') {
            cartesAffichees = [...cartesDatabase];
        } else if (page === 'mew') {
            cartesAffichees = cartesDatabase.filter(c => ownedIds.has(c.id) && isMew(c.nom));
        } else if (page === 'mewtwo') {
            cartesAffichees = cartesDatabase.filter(c => ownedIds.has(c.id) && isMewtwo(c.nom));
        }

        // Tri chronologique : Année -> Extension -> Numéro
        cartesAffichees.sort((a, b) => {
            const anneeA = parseInt(a.annee || (a.releaseDate ? a.releaseDate.substring(0, 4) : 0)) || 0;
            const anneeB = parseInt(b.annee || (b.releaseDate ? b.releaseDate.substring(0, 4) : 0)) || 0;

            if (anneeA !== anneeB) return anneeA - anneeB;

            const extA = (a.extension || '').localeCompare(b.extension || '');
            if (extA !== 0) return extA;

            const numA = parseInt(String(a.numero).replace(/\D/g, '')) || 0;
            const numB = parseInt(String(b.numero).replace(/\D/g, '')) || 0;
            return numA - numB;
        });

        if (cartesAffichees.length === 0) {
            container.innerHTML = '<p class="empty-msg">Aucune carte possédée pour le moment dans cette section.</p>';
            return;
        }

        container.innerHTML = cartesAffichees.map(carte => {
            const theme = isMewtwo(carte.nom) ? 'theme-mewtwo' : 'theme-mew';
            const isOwned = ownedIds.has(carte.id) ? 'is-owned' : '';
            const fallback = getFallbackImage(carte.langue);
            const imageSrc = carte.image || fallback;
            const displayYear = carte.annee ? ` (${carte.annee})` : '';

            return `
                <article class="card-item ${theme} ${isOwned}" data-id="${carte.id}">
                    <img src="${imageSrc}" alt="${carte.nom}" loading="lazy" onerror="this.onerror=null; this.src='${fallback}';">
                    <div class="card-info">
                        <p class="card-name">${carte.nom}</p>
                        <p class="card-meta">#${carte.numero} · ${carte.extension}${displayYear}</p>
                    </div>
                </article>
            `;
        }).join('');

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
                localStorage.setItem(STORAGE_KEY, JSON.stringify([...ownedIds]));
            });
        }
    }

    /* ==========================================
       GESTION DE LA PAGE PANTHÉON
    ========================================== */
    if (page === 'pantheon') {
        const scellesContainer = document.getElementById('scelles-container');
        const gradeesContainer = document.getElementById('gradees-container');

        if (typeof pantheonDatabase === 'undefined') return;

        // Rendu Scellés
        if (scellesContainer && Array.isArray(pantheonDatabase.scelles)) {
            const scelles = [...pantheonDatabase.scelles].sort((a, b) => (a.annee || 0) - (b.annee || 0));
            scellesContainer.innerHTML = scelles.length === 0
                ? '<p class="empty-msg">Aucun item scellé enregistré.</p>'
                : scelles.map(item => {
                    const fallback = getFallbackImage(item.langue);
                    const imageSrc = item.image || fallback;
                    const dateAffichage = item.dateSortie || item.annee || '';
                    return `
                        <article class="card-item pantheon-item scelle-item">
                            <img src="${imageSrc}" alt="${item.nom}" loading="lazy" onerror="this.onerror=null; this.src='${fallback}';">
                            <div class="card-info">
                                <p class="card-name">${item.nom}</p>
                                <p class="card-meta">${item.extension} · ${dateAffichage}</p>
                            </div>
                        </article>
                    `;
                }).join('');
        }

        // Rendu Gradées (avec flip card recto/verso si imageBack existe)
        if (gradeesContainer && Array.isArray(pantheonDatabase.gradees)) {
            const gradees = [...pantheonDatabase.gradees].sort((a, b) => (a.annee || 0) - (b.annee || 0));
            gradeesContainer.innerHTML = gradees.length === 0
                ? '<p class="empty-msg">Aucune carte gradée enregistrée.</p>'
                : gradees.map(item => {
                    const fallback = getFallbackImage(item.langue);
                    const frontSrc = item.imageFront || item.image || fallback;
                    const backSrc = item.imageBack || fallback;
                    const hasFlip = Boolean(item.imageBack);

                    const visualBlock = hasFlip ? `
                        <div class="flip-wrapper">
                            <div class="flip-inner">
                                <div class="flip-front">
                                    <img src="${frontSrc}" alt="${item.nom} - Recto" loading="lazy" onerror="this.onerror=null; this.src='${fallback}';">
                                </div>
                                <div class="flip-back">
                                    <img src="${backSrc}" alt="${item.nom} - Verso" loading="lazy" onerror="this.onerror=null; this.src='${fallback}';">
                                </div>
                            </div>
                        </div>
                    ` : `
                        <img src="${frontSrc}" alt="${item.nom}" loading="lazy" onerror="this.onerror=null; this.src='${fallback}';">
                    `;

                    return `
                        <article class="card-item pantheon-item gradee-item">
                            <div class="grade-badge">${item.societe} · ${item.note}</div>
                            ${visualBlock}
                            <div class="card-info">
                                <p class="card-name">${item.nom}</p>
                                <p class="card-meta">${item.extension} · ${item.numero} (${item.annee || ''})</p>
                            </div>
                        </article>
                    `;
                }).join('');
        }
    }
});
