console.log("Hello Service Worker!");

self.addEventListener('fetch', function(event) {
    console.log(event);
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         new Response('Hello <b class ="a-winner-is-me"> World</b>', {

//             headers: { 'Content-Type': 'text/Html' }

//         })
//     );
// });

self.addEventListener('fetch', function(event) {
    if (event.request.url.endsWith('.jpg')) {
        event.respondWith(
            fetch('/img/1.jpg')
        )
    }
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            if (response.status == 404) {
                return new Response("Not found buddy, sorry!");
            }
            return response;
        }).catch(function() {
            return new Response('Loooooser!')
        })
    );
});




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