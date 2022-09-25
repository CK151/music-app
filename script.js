const play = document.querySelector(".play"),
 previous = document.querySelector(".prev"),
 next = document.querySelector(".next"),

 //

 trackImage = document.querySelector(".track-image"),
 title = document.querySelector(".title"),
 artist = document.querySelector(".artist"),
 //

 trackCurrentTime = document.querySelector(".current-time"),
 trackDuration = document.querySelector(".duration-time"),
 slider = document.querySelector(".duration-slider"),
 //
 showVolume = document.querySelector("#show-volume"),
 volumeIcon = document.querySelector("#volume-icon"),
 currentVolume = document.querySelector("#volume"),

 //

 autoPlayBtn = document.querySelector(".play-all"),
 //

 hamBurger = document.querySelector(".fa-bars"),
 closeIcon = document.querySelector(".fa-times"),

 //

 musicPlaylist = document.querySelector(".music-playlist"),
 playlist = document.querySelector(".playlist");
 pDiv = document.querySelector(".playlist-div");
 

 let timer;
 let autoPlay = 0;

 let indexTrack = 0;

 let songIsPlaying = false;

 let track = document.createElement("audio");




 // all event listeners


play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
autoPlayBtn.addEventListener("click", autoPlayToggle);
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("click", changeVolume);
slider.addEventListener("click", changeduration);
track.addEventListener("timeupdate", songTimeUpdate);
hamBurger.addEventListener("click", showPlayList);
closeIcon.addEventListener("click", hidePlayList);


//load tracks

function loadTrack(indexTrack) {
    clearInterval(timer);
    resetSlider();

    track.src = trackList[indexTrack].path;
    title.innerHTML = trackList[indexTrack].name;
    trackImage.src = trackList[indexTrack].img;
    artist.innerHTML = trackList[indexTrack].artist;
    track.load()

    timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack)

//playson or puase song

function justPlay() {
    if (songIsPlaying == false){
        playSong();
    }
    else {
        pauseSong();
    }
}



//play song

function playSong() {
    track.play();
    songIsPlaying = true;
    play.innerHTML =  '<i class="fas fa-pause"></i>';
}

//pause song

function pauseSong() {
    track.pause();
    songIsPlaying = false;
    play.innerHTML =  '<i class="fas fa-play"></i>';
}

//next song 

function nextSong() {
    if (indexTrack < trackList.length -1) {
        indexTrack ++;
        loadTrack(indexTrack);
        playSong();
    }
    else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playSong();
    }
}

//prev song

function prevSong() {
    if (indexTrack > 0) {
        indexTrack --;
        loadTrack(indexTrack);
        playSong();
    }
    else {
        indexTrack = trackList.length - 1;
        loadTrack(indexTrack);
        playSong();
    }
}


//mute sound 

function muteSound() {
    track.volume = 0;
    showVolume.innerHTML = 0;
    currentVolume.value = 0;
}

//change volume

function changeVolume() {
    showVolume.value = currentVolume.value;
    track.volume = currentVolume.value /100;
}

// change duration

function changeduration() {
    let sliderPosition = track.duration * (slider.value / 100)
    track.currentTime = sliderPosition
}

//autoplay

function autoPlayToggle() {
    if (autoPlay == 0) {
        autoPlay = 1;
        autoPlayBtn.style.background = "#db6400";
    }
    else {
        autoPlay = 0;
        autoPlayBtn.style.background = "#ccc";
    }
}


//reset slider

function resetSlider() {
    slider.value = 0;
}

//update slider

function updateSlider() {
    let position = 0;

    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    if (track.ended) {
        play.innerHTML = '<i class="fas fa-play"> </i>';
        if (autoPlay == 1 && indexTrack < trackList.lenght -1) {
            indexTrack ++;
            loadTrack(indexTrack);
            playSong();
        }
        else if  (autoPlay == 1 && indexTrack == trackList.lenght -1) {
            indexTrack = 0;
            loadTrack(indexTrack);
            playSong();
        }
    
    }
}

//update current song time

function songTimeUpdate() {
    if (track.duration) {
        let currentMinute = Math.floor(track.currentTime / 60);
    let currentSeconds = Math.floor(track.currentTime - currentMinute * 60);

    let duramins = Math.floor(track.duration / 60);
    let durasecs = Math.floor(track.duration - duramins * 60);

    if (durasecs < 10) {
        durasecs = "0" + durasecs;
    }
    if (duramins < 10) {
        duramins = "0" + duramins;
    }

    if (currentMinute < 10) {
        currentMinute = "0" + currentMinute;
    }

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    trackCurrentTime.innerHTML = currentMinute + ":" + currentSeconds;

    trackDuration.innerHTML = duramins + ":" + durasecs;
    }
    else {
        trackCurrentTime.innerHTML = "00" + ":" + "00";
        trackDuration.innerHTML = "00" + ":" + "00";
    }

   
}
 
// show playlist

function showPlayList() {
    musicPlaylist.style.transform = "translateX(0)";
}
 
//hide playlist

function hidePlayList() {
    musicPlaylist.style.transform = "translateX(-100%)";
}


//display tracks in playlists

let counter = 1
function displayTracks() {
    for (let i = 0; i < trackList.length; i++) {
        console.log(trackList[i].name);

        let div = document.createElement("div");
        div.classList.add("playlist");
        div.innerHTML = `
            <span class="song-index">${counter++}</span>
            <p class="single-song">${trackList[i].name}</p>
        `;

     pDiv.appendChild(div)
    }

    playFromPlayList();
}

displayTracks()


//play song from the play list

function playFromPlayList() {
    pDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("single-song")) {
            //alert(e.target.innerHTML);

            const indexNum = trackList.findIndex((item, index) => {
                if (item.name === e.target.innerHTML) {
                    return true;
                }
            });
            loadTrack(indexNum);
            playSong();
            hidePlayList();
        }

    });
    
}