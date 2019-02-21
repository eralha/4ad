var cacheNames = ['web-assets_v1'];//old caches to delete on a new service worker activation
var version = 'sdfkjsdfkljsklfdklsjflkjsklfjklsjfklj90s09d8f09sd8f09890jsdkjashd';
var cacheName = 'web-assets_v2';

self.addEventListener('install', function(event) {
    console.log('install');

    //forca nova versão
    self.skipWaiting();
    
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(
          [
            '/',
            '/index.html'
          ] //File list goes here
        );//end addAll 
      })
    );
    /**/
  });

  self.addEventListener('activate', function(event) {
    console.log('installed');

    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            console.log('Worker Deleting Cache');
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
            return true;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );//end wait until
  });

  self.addEventListener('fetch', function(event) {
    //console.log('Handling fetch event for', event.request.url);
    
    event.respondWith(
      caches.match(event.request).then(function(response) {
        //console.log('No response found in cache. About to fetch from network...');

        if (response) {
          console.log('Found response in cache:', response);
          return response;
        }
  
        return fetch(event.request).then(function(response) {
          //console.log('Response from network is:', response);
          if(
            String(event.request.url).indexOf('/images/') != -1 
            || String(event.request.url).indexOf('/webfonts/') != -1
            || String(event.request.url).indexOf('/js/libs/') != -1
            || String(event.request.url).indexOf('/js/dist/') != -1
            || String(event.request.url).indexOf('/json/') != -1
            || String(event.request.url).indexOf('/css/') != -1
            || String(event.request.url).indexOf('#!/') != -1
          ){
            return caches.open(cacheName).then(function(cache) {
              cache.put(event.request, response.clone());

              return response;
            });
          }else{
            return response;
          }
        }).catch(function(error) {
          console.error('Fetching failed: ' + event.request.url, error);
  
          throw error;
        });
      })
    );//end respondWith

  });