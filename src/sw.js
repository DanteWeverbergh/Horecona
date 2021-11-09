/**
 * Serice workers
 */

const DEBUG = true;

const OFFLINE_URL = 'offline.html';
const CACHE_NAME = 'v5';

self.addEventListener('install', (e) => {
  if (DEBUG) console.log('[ServiceWorker] installed');

  e.waitUntil(
    caches
      .open('v1')
      .then((cache) => {
        cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
      })
      .then(() => {
        if (DEBUG) console.log('Cached assets: ', OFFLINE_URL);
      })
      .catch((error) => {
        console.error(error);
      })
  );
});

self.addEventListener('activate', (e) => {
  if (DEBUG)
    console.log('[ServiceWorker] is active and ready to handle fetches');

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheNames.indexOf(CACHE_NAME) === 0) {
            return null;
          }
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  if (DEBUG) console.log('[ServiceWorker] Fetching', e.request.url);
  e.respondWith(
    fetch(e.request).catch((error) => {
      if (DEBUG)
        console.log('Fetch failed; returning offline page instead.', error);
      return caches.match(OFFLINE_URL);
    })
  );
});
