interface GameOrder {card: HTMLElement; index: number;}

export function filterGames(searchGames: HTMLInputElement, sortGames: HTMLSelectElement, games: HTMLElement, game: HTMLElement[], order: GameOrder[]): void {
    const query = searchGames.value.toLowerCase();
    const sort = sortGames.value;

    let visible = game.filter(card => {
        const name = card.getAttribute('data-name') || '';
        const matches = name.includes(query);
        card.classList.toggle('hiddengame', !matches);
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

export function orderGames(game: HTMLElement[]): GameOrder[] {
    return game.map((card, index) => ({ card, index }));
}