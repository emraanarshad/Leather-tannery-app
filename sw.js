const cacheName = 'tannery-app-v3';
const assets = ['./', './index.html'];

// Nayi files ko install karna
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

// Puraani cache ko khudraat delete karna (Missing Code)
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== cacheName) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Offline data serve karna
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request);
        })
    );
});
