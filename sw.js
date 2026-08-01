// ZMIENIAJ TEN NUMER ZA KAŻDYM RAZEM GDY AKTUALIZUJESZ APLIKACJĘ (np. v2, v3, v4)
const CACHE_NAME = 'tcl-cache-v2'; 

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Wymusza natychmiastowe zainstalowanie nowej wersji
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './index.html',
                './manifest.json',
                './icon.png'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    // Usuwa stare wersje z pamięci telefonu
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
