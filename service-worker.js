// Service Worker for In-N-Out Order Helper
// Caches all app files so the app works offline after first visit

const CACHE_NAME = 'innout-order-v6';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './html2canvas.min.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  // Google Fonts CSS
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fraunces:ital,wght@1,500;1,600&family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@500;700;900&display=swap'
];

// Install: cache all app shell files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache files one by one so one failure doesn't abort all
      return Promise.allSettled(
        FILES_TO_CACHE.map(url => cache.add(url).catch(err => console.log('Cache miss:', url, err)))
      );
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      );
    })
  );
  self.clients.claim();
});

// Fetch: serve from cache first, fall back to network, cache new responses
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // Cache successful responses for future offline use (fonts, etc.)
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache).catch(() => {});
          });
        }
        return response;
      }).catch(() => {
        // Network failed and no cache — return offline fallback for HTML
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
