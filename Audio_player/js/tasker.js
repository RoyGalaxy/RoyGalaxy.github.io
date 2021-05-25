const music = document.querySelector('#music');
const poster = document.querySelector('.image img');
const currentTime = document.querySelector('#currentTime');
const duration = document.querySelector('#duration');
const trackDisplay = document.querySelector('.track-name h2');

// components
var currentMusic = 0;
var callibrate;

// Functions
const toggleMusic = () => {
    music.paused ? music.play() : music.pause();
    music.paused ? clearInterval(callibrate) : callibrate = setInterval(callibrateSeek,1000);
}
const toggleSwitch = () => {
    const target = [playBtn.children[0],libraryPlayBtn.children[0]];
    target.forEach(item => {
        item.className = (music.paused) ? 'fas fa-play' : 'fas fa-pause';
    })
    
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
    if(isNaN(totalMin)){
        totalMin = 0;
        totalSec = 0;
        seekSlider.value = 0;
    }
    (totalSec < 10) ? totalSec = '0' + totalSec : totalSec = totalSec;
    duration.innerText = `${totalMin}:${totalSec}`;
    let n = seekSlider.value;
    seekSlider.style.background = `linear-gradient(to right,#23C0BB 0%,#23C0Bb ${n}%,#222 ${n}%,#222 100%)`;
}
const goFullScreen = () => {
    const container = document.querySelector('.container');
    if(container.requestFullscreen){
	    container.requestFullscreen();
    }
    else if(container.webkitRequestFullScreen){
	    container.webkitRequestFullScreen();
    }
    screen.orientation.lock('portrait-primary');
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
}
/* this function calls some function to initialise app */
const initialize = () => {
    getFavourites();
    checkLike();
}