/**
 * Service Worker für PWA
 * Ermöglicht Offline-Funktionalität und schnelles Laden
 */

const CACHE_NAME = 'lucas-snake-adventure-v1.0.1';
const RUNTIME_CACHE = 'lucas-snake-runtime-v1.0.1';

// Assets die gecacht werden sollen
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/mobile.css',
  '/js/main.js',
  '/js/game.js',
  '/js/snake.js',
  '/js/food.js',
  '/js/powerups.js',
  '/js/powerupitems.js',
  '/js/particles.js',
  '/js/trails.js',
  '/js/effects.js',
  '/js/background.js',
  '/js/controls.js',
  '/js/ui.js',
  '/js/sound.js',
  '/js/numberdisplay.js',
  '/js/utils.js',
  '/js/animations.js',
  '/js/buttonassets.js',
  '/js/buttonintegration.js',
  '/js/uiassets.js',
  '/js/achievements.js',
  '/js/statistics.js',
  '/js/walls.js',
  '/manifest.json',
  '/assets/images/logo/weedgame.png'
];

// Install Event - Cache Static Assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('❌ Service Worker: Cache error', error);
      })
  );
  self.skipWaiting(); // Aktiviert sofort den neuen Service Worker
});

// Activate Event - Cleanup alte Caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('🗑️ Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Übernimmt sofort Kontrolle
});

// Fetch Event - Cache First Strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Nur GET-Requests cachen
  if (request.method !== 'GET') {
    return;
  }

  // Externe Requests (CDN, etc.) nicht cachen
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Cache Hit - Return cached version
        if (cachedResponse) {
          return cachedResponse;
        }

        // Cache Miss - Fetch from network
        return fetch(request)
          .then((response) => {
            // Nur erfolgreiche Responses cachen
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone response für Cache
            const responseToCache = response.clone();

            // Cache in Runtime Cache speichern
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Offline Fallback
            if (request.destination === 'image') {
              // Fallback für Bilder
              return new Response('', { status: 404 });
            }
            // Fallback für HTML
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Message Event - Für Updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

