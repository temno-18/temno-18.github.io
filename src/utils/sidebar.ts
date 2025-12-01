export function hideSidebar(sidebar: HTMLElement, toggle: HTMLElement): void {
    sidebar.classList.add('hidden');
    toggle.classList.add('shown');
    sidebar.classList.remove('shown');
    toggle.classList.remove('hidden');
}

export function showSidebar(sidebar: HTMLElement, toggle: HTMLElement): void {
    sidebar.classList.add('shown');
    toggle.classList.add('hidden');
    sidebar.classList.remove('hidden');
    toggle.classList.remove('shown');
}