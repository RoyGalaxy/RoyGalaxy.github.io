// Controllers
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');
const seekSlider = document.querySelector('#seekTime');


// Player Screen
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
    if(currentMusic === musicList.length - 1){
        changeMusic(0)
    }else{
        changeMusic(currentMusic + 1);
    }
    seekSlider.value = 0
}
// seekSlider
seekSlider.onchange = () => {
    seekTo();
}
//  window loaded
window.onload = () => {
    initialize()
}

// Screen Change
const backBtn = document.querySelector('.back');
backBtn.onclick = () => {
    let target1 = document.querySelector('.player-screen');
    let target2 = document.querySelector('.library-screen');
    target1.style.display = "none";
    target2.style.display = "block";
}
const playerBtn = document.querySelector(".player-btn");
playerBtn.onclick = () => {
    let target1 = document.querySelector('.player-screen');
    let target2 = document.querySelector('.library-screen');
    target1.style.display = "block";
    target2.style.display = "none";
}


// Library screen
const libraryPlayBtn = document.querySelector('.popup-play')