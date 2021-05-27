const staticCacheName = 'static-web';
const assets = [
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/tasker.js'
    ]


self.addEventListener('install',(evt) => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(assets);
        })
    )
})


self.addEventListener('fetch',(evt) => {
    caches.match(evt.request).then((res) => {
        return res || fetch(evt.request)
    })
});