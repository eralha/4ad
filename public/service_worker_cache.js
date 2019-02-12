
//var cacheNames = ['web-assets'];//old caches to delete on a new service worker activation
var version = 'version_1';
var cacheName = 'web-assets';

self.addEventListener('install', function(event) {
    console.log('install');
    
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(
          [
            '/js/main.js'
          ] //File list goes here
        );//end addAll 
      })
    );
    /**/
  });

  self.addEventListener('activate', function(event) {
    console.log('installed');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
            return true;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    //console.log('Handling fetch event for', event.request.url);
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found response in cache:', response);
          return response;
        }
        //console.log('No response found in cache. About to fetch from network...');
  
        return fetch(event.request).then(function(response) {
          //console.log('Response from network is:', response);
          if(String(event.request.url).indexOf('/images/') != -1 || String(event.request.url).indexOf('/folder/') != -1){
            return caches.open(cacheName).then(function(cache) {
              cache.put(event.request, response.clone());

              return response;
            });
          }else{
            return response;
          }
        }).catch(function(error) {
          //console.error('Fetching failed:', error);
  
          throw error;
        });
      })
    );//end respondWith
  });