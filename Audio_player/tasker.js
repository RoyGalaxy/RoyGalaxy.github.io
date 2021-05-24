const music = document.querySelector('#music');
const poster = document.querySelector('.image img');
const currentTime = document.querySelector('#currentTime');
const duration = document.querySelector('#duration');
const trackDisplay = document.querySelector('.track-name h2');

// components
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
    currentMusic = index;
    changePoster(index)
    playBtn.click();
    checkLike();
    trackDisplay.innerText = musicList[index];
}
const changePoster = (index) => {
    poster.src = `./images/${posterList[index]}`;
    createMediaSession();
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
    if(totalMin === NaN && totalSec === NaN){
        totalMin = 0;
        totalSec = 0
    }
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
    createMediaSession();
    createActionHandlers();
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
//  window loaded
window.onload = () => {
    initialize()
}

// special feature Functions
const downloadMusic = () => {
    let link = document.createElement('a');
    link.href = music.src;
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

const createMediaSession = () => {
    let index = currentMusic;
    let image = `./images/${posterList[index]}`;
    if('mediaSession' in navigator){
        navigator.mediaSession.metadata = new MediaMetadata({
            title:`${musicList[index]}`,
            album:'Roy Galaxy',
            artwork:[
               { src:`${image}`, sizes:'512x512', type:'image/png'},
               { src:`${image}`, sizes:'256x256', type:'image/png'}
            ]
        });
    }
    console.log(index)
}
const createActionHandlers = () => {
    if('mediaSession' in navigator){
        const target = navigator.mediaSession
        //  Play music
        target.setActionHandler('play',() => {
            toggleMusic();
            toggleSwitch();
        });
        //  Pause
        target.setActionHandler('pause',() => {
            toggleMusic();
            toggleSwitch();
        });
        // nect track
        target.setActionHandler('nexttrack',() => {
            let index = currentMusic + 1;
            (index > (musicList.length - 1)) ? index = 0 : index = index;
            changeMusic(index)
            seekSlider.value = 0;
        });
        //  Previous track
        target.setActionHandler('previoustrack',() => {
            let index = currentMusic - 1;
            (index < 0) ? index = musicList.length - 1 : index = index;
            changeMusic(index)
            seekSlider.value = 0;
        });
        //  Seek forward
        target.setActionHandler('seekforward',() => {
           music.currentTime += 10 
        });
        //  seek Backward
        target.setActionHandler('seekbackward',() => {
            music.currentTime -= 10
        })
    }
}

/* this function calls some function to initialise app */
const initialize = () => {
    getFavourites();
    checkLike();
}