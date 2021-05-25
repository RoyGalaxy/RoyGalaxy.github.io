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
        });
        target.setActionHandler('seekto',(details) => {
            music.currentTime = details.seekTime;
            callibrateSeek();
        });
    }
}