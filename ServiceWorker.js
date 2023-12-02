const cacheName = "EJCPMyTech-WAppMy-1.0.1";
const contentToCache = [
    "Build/pwawebgl_instal.loader.js",
    "Build/1389777f09273997bb9cbaf909bc8679.js",
    "Build/b809def493ee59bb9b64a187e9432cfa.data",
    "Build/b0a9de50cd030ca828e1c9d4f675af32.wasm",
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
