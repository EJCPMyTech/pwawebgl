const cacheName = "EJCPMyTech-WAppMyPWAInstall-1.0.1";
const contentToCache = [
    "Build/pwawebgl.loader.js",
    "Build/f2909a62c38a6c489b53ea7ab34a036b.js.unityweb",
    "Build/d15d708866ebf8d3801e50bf6de1ea9f.data.unityweb",
    "Build/a9a8d6eb0a131bf4e2b69ca4cbe84669.wasm.unityweb",
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
