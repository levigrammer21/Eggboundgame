const CACHE="eggbound-clean-v1";
const ASSETS=["./","./index.html","./manifest.json"];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch",e=>{
  if(e.request.url.startsWith(self.location.origin)){
    e.respondWith(
      caches.match(e.request).then(r=>r||fetch(e.request))
    );
  }
});
