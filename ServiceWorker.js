const cacheName = "EJCPMyTech-WAppMy-1.0.1";
const contentToCache = [
    "Build/pwawebgl.loader.js",
    "Build/e63f26f19bdff0764e5203491028712f.js.unityweb",
    "Build/60ccee6a0e2f91f6859dc966f0d50426.data.unityweb",
    "Build/e366c97f532fc39686b982e0e2df5d36.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
