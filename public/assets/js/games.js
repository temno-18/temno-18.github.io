const searchGames = document.getElementById('searchGames');
const sortGames = document.getElementById('sortGames');
const games = document.getElementById('games');
const game = Array.from(document.querySelectorAll('.game'));
const search = document.getElementById('search');

const order = game.map((card, index) => ({ card, index }));

function filter() {
    const query = searchGames.value.toLowerCase();
    const sort = sortGames.value;

    let visible = game.filter(card => {
        const name = card.getAttribute('data-name') || '';
        const matches = name.includes(query);
        card.classList.toggle('hidden', !matches);
        return matches;
    });

    if (sort === 'alphabetical') {
        visible.sort((a, b) => {
            const name1 = a.getAttribute('data-name') || '';
            const name2 = b.getAttribute('data-name') || '';
            return name1.localeCompare(name2);
        });
    } else if (sort === 'recent') {
        visible.sort((a, b) => {
            const index1 = order.find(item => item.card === a)?.index || 0;
            const index2 = order.find(item => item.card === b)?.index || 0;
            return index2 - index1;
        });
    }

    visible.forEach(card => games.appendChild(card));
}

searchGames.addEventListener('input', filter);
sortGames.addEventListener('change', filter);
search.addEventListener('submit', (e) => e.preventDefault());