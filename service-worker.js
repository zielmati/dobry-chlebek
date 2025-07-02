self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("chleb-v1").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/script.js",
        "/manifest.json",
        "/icons/icon-192.png",
        "/icons/icon-512.png",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});