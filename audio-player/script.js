function getFormattingTime(second, long) {
    second = Math.trunc(second);
    const minutes = ("00" + Math.trunc(second % 3600 / 60)).slice(-2);
    const seconds = ("00" + second % 3600 % 60).slice(-2);
    let rezult = `${minutes}:${seconds}`;

    if (long) {
        const hours = ("00" + Math.trunc(second / 60)).slice(-2);
        rezult = hours + ":" + rezult;
    }
    return rezult;
}

function setTimeStamp(isPlayNow) {
    const timeStamp = setInterval(() => {
        if (isPlayNow) {
            currentTime.textContent = getFormattingTime(audioElement.currentTime, longTrack);
        } else {
            clearInterval(timeStamp);
        }
    }, 1000)
}

function setDurationTrack() {
    progressLine.setAttribute("max", audioElement.duration);

    longTrack = audioElement.duration > 3600;
    currentTime.textContent = getFormattingTime(audioElement.currentTime, longTrack);
    endTime.textContent = getFormattingTime(audioElement.duration, longTrack);
}

function startTrack({ id, name, img }) {
    audioElement.src = "assets/audio/" + name;
    audioElement.addEventListener("loadedmetadata", () => setDurationTrack());

    playerImg.src = "assets/images/" + img;
    playerBack.style = `background-image: url(assets/images/${img});`;
    nameTrack.textContent = name;
    idTrack.textContent = id;
}

function getTrackNum() {
    const currentIdTrack = +document.querySelector(".id_track").textContent;
    return + currentAudioList
        .map((item, index) => item.id === currentIdTrack ? "" + index : "")
        .filter(item => item)[0];
}

function hideMuteRangeBar(delay) {
    setTimeout(() => {
        muteRange.classList.add("controlls-blocked");
    }, delay)
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let currentAudioList = [...audioList];
const audioElement = document.querySelector("audio");
const progressLine = document.querySelector(".progress__line");
const currentTime = document.querySelector(".current-time");
const endTime = document.querySelector(".end-time");
const playerImg = document.querySelector(".player__img");
const playerBack = document.querySelector(".player__back ");
const nameTrack = document.querySelector(".name-track");
const idTrack = document.querySelector(".id_track");
let longTrack;

startTrack(currentAudioList[0]);

audioElement.addEventListener("timeupdate", () => {
    progressLine.value = audioElement.currentTime;
});

progressLine.addEventListener("input", () => {
    audioElement.currentTime = progressLine.value;
})

const playPause = document.querySelector(".play-pause");
const playButton = document.querySelector(".icon-play");
const pauseButton = document.querySelector(".icon-pause");
let isPlaying = false;

playPause.addEventListener("click", (e) => {
    if (e.target.closest(".controlls")) {
        isPlaying ? audioElement.pause() : audioElement.play();
    }
    isPlaying = !isPlaying;
    playButton.classList.toggle("controlls-blocked");
    pauseButton.classList.toggle("controlls-blocked");

    setTimeStamp(isPlaying);
});

const prevButton = document.querySelector(".icon-prev");
prevButton.addEventListener("click", () => {
    const trackNum = getTrackNum();
    if (trackNum > 0) {
        startTrack(currentAudioList[trackNum - 1]);
    } else {
        startTrack(currentAudioList[currentAudioList.length - 1])
    }
    if (isPlaying) audioElement.play();
})

const nextButton = document.querySelector(".icon-next");
nextButton.addEventListener("click", () => {
    const trackNum = getTrackNum();
    if (trackNum + 1 < currentAudioList.length) {
        startTrack(currentAudioList[trackNum + 1]);
    } else {
        startTrack(currentAudioList[0])
    }
    if (isPlaying) audioElement.play();
})

let isOnMute;
const mute = document.querySelector(".mute__changing");
const onMute = document.querySelector(".mute__on");
const offMute = document.querySelector(".mute__off");
const muteRange = document.querySelector(".mute__range");

mute.addEventListener("click", () => {
    if (!isOnMute) {
        muteRange.classList.add("controlls-blocked");
        onMute.classList.remove("controlls--checked");
    } else {
        muteRange.classList.remove("controlls-blocked");
        onMute.classList.add("controlls--checked");

        hideMuteRangeBar(2500);
    }
    isOnMute = !isOnMute;
    onMute.classList.toggle("controlls-blocked");
    offMute.classList.toggle("controlls-blocked");

    audioElement.volume = !isOnMute ? muteRange.value : 0;
})

muteRange.addEventListener("input", () => {
    audioElement.volume = muteRange.value;
    hideMuteRangeBar(1500);
})

const shuffleTracks = document.querySelector(".shuffle-tracks");
shuffleTracks.addEventListener("click", () => {
    shuffleTracks.classList.add("controlls--checked");
    shuffle(currentAudioList);
    startTrack(currentAudioList[0]);
})