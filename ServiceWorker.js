const cacheName = "EJCPMyTech-WAppMy-1.0.1";
const contentToCache = [
    "Build/pwawebgl.loader.js",
    "Build/3e48ff6e65a082aaa2833b2dfcc5f5ea.js.unityweb",
    "Build/6964872ab3fa00abd7457113f52b06e1.data.unityweb",
    "Build/65223846970e3a74285ff8b222a87b0f.wasm.unityweb",
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
