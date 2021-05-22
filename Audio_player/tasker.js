const music = document.querySelector('#music');
// components
musicList = [
    'Kabhi Kabhi Aditi Zindagi.mp3',
    'Baadshaho- Socha Hai Lyrical.mp3',
    'Nazar-pulkit-arora.mp3',
    'Loot liya.mp3'
];
var currentMusic = 0;

// controllers
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');

const toggleMusic = () => {
    music.paused ? music.play() : music.pause();

}
const toggleSwitch = () => {
    const target = playBtn.children[0];
    target.className = (music.paused) ? 'fas fa-play' : 'fas fa-pause'
}
const changeMusic = n => {
    music.src = `./music/${musicList[n]}`;
    currentMusic = n;
    toggleMusic()
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


/*/// event listener  ///*/
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
}
// prevBtn
prevBtn.onclick = () => {
    if(currentMusic === 0){
        changeMusic(musicList.length - 1)
    }else{
        changeMusic(currentMusic - 1);
    }
}
// Screen orientation
screen.orientation.onchange = () => {
    goFullScreen();
}
// music ended
music.onended = () => {
    nextBtn.click();
}