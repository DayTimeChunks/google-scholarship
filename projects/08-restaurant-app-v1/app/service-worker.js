
let staticCacheName = "my-restaurants-v1";

self.addEventListener('install', (event) => {
  let urlsToCache = [ // these are the keys to be stored in cache.
    './css/responsive.css',
    './css/styles.css',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js'
  ];

  // Tell the browser not to terminate the service worker
  // until resolving the cache-saving promise.
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cacheName => {
        return cacheName.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Task: delete old caches after SW receives the activate event
  event.waitUntil(
    caches.keys()
      .then(cachedKeys => {
        return Promise.all(cachedKeys
          .filter( name => name.startsWith('my-restaurants-') && name != staticCacheName )
          .map( name =>  caches.delete(name) )
        );
      })
  );
});


self.addEventListener('fetch', (event) => {
  // console.log("Event fetch was called, we are returning ALL the requests objects",
  //   event.request);

  event.respondWith(
    caches // Search for a match
      .match(event.request)
      .then(response => {
        // If yes, return that!
        // Otherwise go look for it.
        // console.log("Response: ", response);
        return response || fetch(event.request);
      })
  )
});