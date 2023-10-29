const cacheName = "EJCPMyTech-WAppMyPWAInstall-1.0.1";
const contentToCache = [
    "Build/pwawebgl.loader.js",
    "Build/5c232b02e950ee03bf1a6e51eadedaec.js.unityweb",
    "Build/d08608e52999b65271a90e3e717120e7.data.unityweb",
    "Build/aadc32bde6906ff6f0cf9ff9f4414820.wasm.unityweb",
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
