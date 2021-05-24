const music = document.querySelector('#music');
const poster = document.querySelector('.image img');
const currentTime = document.querySelector('#currentTime');
const duration = document.querySelector('#duration');
// components
const musicList = [
    'Kabhi Kabhi Aditi Zindagi.mp3',
    'Baadshaho- Socha Hai Lyrical.mp3',
    'Nazar-pulkit-arora.mp3',
    'Loot liya.mp3',
    'Sanjog.mp3',
    'khabbi Seat.mp3',
    'Supne - Akhil.mp3'
];
const posterList = [
    'Kabhi Kabhi Aditi Zindagi.webp',
    'Baadshaho- Socha Hai Lyrical.jpg',
    'Nazar-pulkit-arora.jpeg',
    'Loot liya.jpeg',
    'Sanjog.jpg',
    'khabbi Seat.jpg',
    'Supne - Akhil.jpg'    
]
var currentMusic = 0;
var callibrate;

// controllers
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');
const seekSlider = document.querySelector('#seekTime');

// Functions
const toggleMusic = () => {
    music.paused ? music.play() : music.pause();
    music.paused ? clearInterval(callibrate) : callibrate = setInterval(callibrateSeek,1000);
}
const toggleSwitch = () => {
    const target = playBtn.children[0];
    target.className = (music.paused) ? 'fas fa-play' : 'fas fa-pause'
}
const changeMusic = index => {
    music.src = `./music/${musicList[index]}`;
    changePoster(index)
    currentMusic = index;
    playBtn.click();
    checkLike()
}
const changePoster = (index) => {
    poster.src = `./images/${posterList[index]}`;
    navigator.mediaSession.metadata = new MediaMetadata({
    title: `${musicList[index]}`,
    artwork: [
        { src: `./images/${posterList[index]}`, sizes: '256x256', type: 'image/png' },
        { src: `./images/${posterList[index]}`, sizes: '512x512', type: 'image/png' }
    ]
  });
}
const seekTo = () => {
    let time = (music.duration / 100) * seekSlider.value;
    music.currentTime = time;
    let n = seekSlider.value;
    callibrateSeek();
    seekSlider.style.background = `linear-gradient(to right,#23C0BB 0%,#23C0Bb ${n}%,#222 ${n}%,#222 100%)`
}
const callibrateSeek = () => {
    seekSlider.value = (music.currentTime * 100) / music.duration;
    let n = seekSlider.value;
    seekSlider.style.background = `linear-gradient(to right,#23C0BB 0%,#23C0Bb ${n}%,#222 ${n}%,#222 100%)`;
    // currentTime 
    let min = Math.floor(music.currentTime/60)
    let sec = Math.round(music.currentTime - (min * 60),0);
    if(sec == 60){
        min += 1;
        sec = 0;
    }
    (sec < 10) ? sec = '0' + sec : sec = sec;
    currentTime.innerText = `${min}:${sec}`
    // Duration
    let totalMin = Math.floor(music.duration /60);
    let totalSec = Math.round(music.duration - (totalMin * 60));
    if(totalSec == 60){
        totalMin += 1;
        totalSec = 0;
    }
    (totalSec < 10) ? totalSec = '0' + totalSec : totalSec = totalSec;
    duration.innerText = `${totalMin}:${totalSec}`;
}
const goFullScreen = () => {
    const container = document.querySelector('.container')
    if(container.requestFullscreen){
	    container.requestFullscreen();
    }
    else if(container.webkitRequestFullScreen){
	    container.webkitRequestFullScreen();
    }
    screen.orientation.lock('portrait-primary');
}


/* event listener  */
// playBtn
playBtn.onclick = () => {
    goFullScreen();
    toggleMusic();
    toggleSwitch();
}
// nextBtn
nextBtn.onclick = () => {
    if(currentMusic === musicList.length - 1){
        changeMusic(0)
    }else{
        changeMusic(currentMusic + 1);
    }
    seekSlider.value = 0
}
// prevBtn
prevBtn.onclick = () => {
    if(currentMusic === 0){
        changeMusic(musicList.length - 1)
    }else{
        changeMusic(currentMusic - 1);
    }
    seekSlider.value = 0
}
// Screen orientation
screen.orientation.onchange = () => {
    goFullScreen();
}
// music ended
music.onended = () => {
    nextBtn.click();
}
// seekSlider
seekSlider.onchange = () => {
    seekTo();
}

// special feature Functions
const downloadMusic = () => {
    let link = document.createElement('a');
    link.href = music.src;
    console.log(link)
    link.setAttribute('download','');
    link.click()
}
var likeBtn = document.querySelector('.like')
var favourites = [];
const toggleLike = () => {
    likeBtn.classList.toggle('active');
    (likeBtn.classList.value.includes('active')) ? favourites.push(music.src) : favourites.splice(musicList[music.src],1)
    saveFavourites();
}
const checkLike = () => {
    if(!(likeBtn.classList.value.includes('active')) && favourites.includes(music.src)){
        likeBtn.classList.add("active")
    }
    else if((likeBtn.classList.value.includes('active')) && !favourites.includes(music.src)){
        likeBtn.classList.remove('active')
    }
}
const saveFavourites = () => {
    let list = JSON.stringify(favourites);
    localStorage.favourites = list;
}
const getFavourites = () => {
    favourites = JSON.parse(localStorage.favourites)
    console.log(favourites)
}

/* this function calls some function to initialise app */
const initialize = () => {
    getFavourites();
    checkLike();
}
initialize();
if ('mediaSession' in navigator) {

  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    album: 'Whenever You Need Somebody',
    artwork: [
      { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
      { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
      { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
      { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
      { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
      { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
    ]
  });

  navigator.mediaSession.setActionHandler('play', function() {});
  navigator.mediaSession.setActionHandler('pause', function() {});
  navigator.mediaSession.setActionHandler('seekbackward', function() {});
  navigator.mediaSession.setActionHandler('seekforward', function() {});
  navigator.mediaSession.setActionHandler('previoustrack', function() {});
  navigator.mediaSession.setActionHandler('nexttrack', function() {});
}