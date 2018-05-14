console.log("Hello Service Worker!");

//Fetching events

// self.addEventListener('fetch', function(event) {
//     console.log(event);
// });

//Hello world to everything

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         new Response('Hello <b class ="a-winner-is-me"> World</b>', {

//             headers: { 'Content-Type': 'text/Html' }

//         })
//     );
// });


//Specific image for everything

// self.addEventListener('fetch', function(event) {
//     if (event.request.url.endsWith('.jpg')) {
//         event.respondWith(
//             fetch('/img/offline.jpg')
//         )
//     }
// });

// 404 and NO SERVER responses

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         fetch(event.request).then(function(response) {
//             if (response.status == 404) {
//                 return new Response("Not found buddy, sorry!");
//             }
//             return response;
//         }).catch(function() {
//             return new Response('Loooooser!')
//         })
//     );
// });


// var staticCacheName = 'JohnyCache6';

self.addEventListener('install', function(event) {
    event.waituntil(
        caches.open('JohnyCache4').then(function(cache) {
            return cache.addAll([
                '/',
                '/restaurant.html',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './img/',
                './css/responsive.css',
                './css/styles.css',
                './data/restaurants.json',
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waituntil(
        caches.delete('JohnyCache3')
    )
})

// self.addEventListener('install', function(event) {
//     event.waituntil(
//         caches.keys().then(function(staticCacheName) {
//             return Promise.all(
//                 cacheNames.filter(function(staticCachName) {
//                     return cachName.startsWith('JohnyCache') &&
//                         cacheName != staticCacheName;
//                 }).map(function(casheName) {
//                     return cache.delete(casheName);
//                 })
//             )
//         })
//     )
// })

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            // else if (event.request.url.endsWith('.jpg') && response.status == 404) return fetch('/img/offline.jpg');
            return fetch(event.request);
        })
    )
})


// self.addEventListener('fetch', function(event) {
//     event.respondWith(caches.match(event.request).then(function(response) {
//         // caches.match() always resolves
//         // but in case of success response will have value
//         if (response !== undefined) {
//             return response;
//         } else {
//             return fetch(event.request).then(function(response) {
//                 // response may be used only once
//                 // we need to save clone to put one copy in cache
//                 // and serve second one
//                 let responseClone = response.clone();

//                 caches.open('v1').then(function(cache) {
//                     cache.put(event.request, responseClone);
//                 });
//                 return response;
//             }).catch(function() {
//                 return caches.match('/sw-test/gallery/myLittleVader.jpg');
//             });
//         }
//     }));
// });