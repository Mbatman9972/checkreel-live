const CACHE_NAME = 'checkreel-pwa-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/admin.html', 
  '/dashboard.html',
  '/manifest.json',
  '/dashboard.css',
  '/dashboard.js',
  '/landing.js',
  '/data/en.json',
  '/data/ar.json',
  '/data/fr.json',
  '/images/logo.png',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});