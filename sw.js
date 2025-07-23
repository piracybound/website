const CACHE_NAME = 'piracybound-v1';
const OFFLINE_URL = '/offline.html';

const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/404.html'
];

const RUNTIME_CACHE_URLS = [
];

self.addEventListener('install', (event) => {
  console.log('[SW] Install event');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static resources:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin !== location.origin) {
    if (!url.href.match(/\.(woff2|woff|ttf|jpg|jpeg|png|gif|svg|ico)$/)) {
      return;
    }
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      networkFirstWithOfflineFallback(request)
    );
    return;
  }

  if (request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(css|js|woff2|woff|ttf|jpg|jpeg|png|gif|svg|ico)$/)) {

    event.respondWith(
      cacheFirstWithNetworkFallback(request)
    );
    return;
  }

  event.respondWith(
    networkFirstWithCacheFallback(request)
  );
});

async function networkFirstWithOfflineFallback(request) {
  try {
    const response = await fetch(request);

    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[SW] Network failed for navigation, trying cache');

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    console.log('[SW] No cache match, serving offline page');
    return caches.match(OFFLINE_URL);
  }
}

async function cacheFirstWithNetworkFallback(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      const cacheDate = new Date(cachedResponse.headers.get('date') || 0);
      const now = new Date();
      const oneHour = 60 * 60 * 1000;

      if (now - cacheDate > oneHour) {
        fetch(request).then(response => {
          if (response.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, response.clone());
            });
          }
        }).catch(() => {
        });
      }

      return cachedResponse;
    }

    const response = await fetch(request);

    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[SW] Both cache and network failed for asset:', request.url);

    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="14" fill="#999">Image unavailable</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }

    throw error;
  }
}

async function networkFirstWithCacheFallback(request) {
  try {
    const response = await fetch(request);

    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls;
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urls);
    }).catch((error) => {
      console.error('[SW] Failed to cache URLs:', error);
    });
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-cache-update') {
    event.waitUntil(updateCacheInBackground());
  }
});

async function updateCacheInBackground() {
  console.log('[SW] Running background cache update');

  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();

    const updatePromises = requests.slice(0, 10).map(async (request) => {
      try {
        const response = await fetch(request);
        if (response.status === 200) {
          await cache.put(request, response);
        }
      } catch (error) {
      }
    });

    await Promise.allSettled(updatePromises);
    console.log('[SW] Background cache update completed');
  } catch (error) {
    console.error('[SW] Background cache update failed:', error);
  }
}