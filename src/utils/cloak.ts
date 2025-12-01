export function handleCloak() {
    if (window.self === window.top) Cloak(window.location.href);
    window.location.href = 'https://classroom.google.com';
}

function Cloak(src: string) {
    const tab = window.open('about:blank', '_blank');
    if (!tab) return;
    tab.document.title = document.title;
    const currentFavicon = document.querySelector('link[rel*="icon"]') as HTMLLinkElement;
    const favicon = tab.document.createElement("link");
    favicon.rel = "icon";
    favicon.type = currentFavicon.type || "image/x-icon";
    favicon.href = new URL(currentFavicon.href, window.location.origin).href;
    tab.document.head.appendChild(favicon);
    const style = `border: none; outline: none; width: 100vw; height: 100vh; position: fixed; left: 0; right: 0; top: 0; bottom: 0;`;
    tab.document.body.style.margin = '0';
    tab.document.body.innerHTML = `<iframe src="${src}" style="${style}"></iframe>`;
}