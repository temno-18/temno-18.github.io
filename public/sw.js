if (navigator.userAgent.includes("Firefox")) {
  Object.defineProperty(globalThis, "crossOriginIsolated", {
    value: true,
    writable: true
  });
}

const params = new URLSearchParams(location.search);
const replacement = params.get('r') ?? '';

importScripts(`${replacement}/c/chicken.all.js`);
importScripts(`${replacement}/n/nuggets.bundle.js`);
importScripts(`${replacement}/n/nuggets.config.js`);
importScripts(`${replacement}/n/nuggets.sw.js`);

const { ScramjetServiceWorker } = $scramjetLoadWorker();

const scramjet = new ScramjetServiceWorker();
const ultraviolet = new UVServiceWorker();

(async function () { await scramjet.loadConfig() })();

self.addEventListener("fetch", function (event) {
  event.respondWith((async () => {
    if (event.request.url.startsWith(location.origin + __uv$config.prefix)) {
        return await ultraviolet.fetch(event);
    } else if (scramjet.route(event)) {
        return await scramjet.fetch(event);
    } else {
        return await fetch(event.request);
    }
  })());
});
