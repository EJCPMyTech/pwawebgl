const cacheName = "EJCPMyTech-WAppMy-1.0.1";
const contentToCache = [
    "Build/pwawebgl.loader.js",
    "Build/3e48ff6e65a082aaa2833b2dfcc5f5ea.js.unityweb",
    "Build/0e987b68eb4ec685eebc44f48de4b50f.data.unityweb",
    "Build/c243a2973e96a679c0c24fd00708a76b.wasm.unityweb",
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
