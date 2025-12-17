const CACHE="eggbound-polished-v2";
const ASSETS=["./","./index.html","./manifest.json","./sw.js"];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE && caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch",e=>{
  const url = new URL(e.request.url);
  if(url.origin !== location.origin) return; // don't cache PokéAPI
  e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
