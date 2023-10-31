const cacheName = "EJCPMyTech-WAppMy-1.0.1";
const contentToCache = [
    "Build/pwawebgl.loader.js",
    "Build/d8a43d705c01f83c6d5e66a29f5a0ce0.js.unityweb",
    "Build/d8e44f8cd71abf553a36b667e7032da0.data.unityweb",
    "Build/428aa045c0c1168ed663b603333aad83.wasm.unityweb",
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
