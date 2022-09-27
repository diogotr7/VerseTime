const cacheName = "cache1"; // Change value to force update

self.addEventListener("install", (event) => {
  // Kick out the old service worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        "/",
        "index.html",
        "main.js",
        "map.js",
        "settings.js",
        "ui-controller.js",
        "Location.js",
        "CelestialBody.js",
        "HelperFunctions.js",

        "manifest.json",
        "style.css",

        "/static/assets/aberdeen.png",
        "/static/assets/calliope.png",
        "/static/assets/crusader.png",
        "/static/assets/hurston.png",
        "/static/assets/magda.png",
        "/static/assets/yela.png",
        "/static/assets/arccorp.png",
        "/static/assets/cellin.png",
        "/static/assets/daymar.png",
        "/static/assets/ita.png",
        "/static/assets/microtech.png",
        "/static/assets/arial.png",
        "/static/assets/clio.png",
        "/static/assets/euterpe.png",
        "/static/assets/lyria.png",
        "/static/assets/wala.png",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Delete any non-current cache
  event.waitUntil(
    caches.keys().then((keys) => {
      Promise.all(
        keys.map((key) => {
          if (![cacheName].includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        );
      });
    })
  );
});
