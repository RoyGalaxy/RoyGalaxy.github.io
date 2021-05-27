// Register service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
        console.log('registered service worker',reg)
    })
    .catch((err) => {
        console.log('Error registering service worker',err)
    })
}