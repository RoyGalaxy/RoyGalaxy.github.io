const music = document.querySelector('#music');
const poster = document.querySelector('.image img');
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
}
const changePoster = (index) => {
    poster.src = `./images/${posterList[index]}`;
}
const seekTo = () => {
    let time = (music.duration / 100) * seekSlider.value;
    music.currentTime = time;
    let n = seekSlider.value;
    seekSlider.style.background = `linear-gradient(to right,#23C0BB 0%,#23C0Bb ${n}%,#222 ${n}%,#222 100%)`
}
const callibrateSeek = () => {
    seekSlider.value = (music.currentTime * 100) / music.duration;
    let n = seekSlider.value;
    seekSlider.style.background = `linear-gradient(to right,#23C0BB 0%,#23C0Bb ${n}%,#222 ${n}%,#222 100%)`
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