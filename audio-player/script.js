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
    return +audioList
        .map((item, index) => item.id === currentIdTrack ? "" + index : "")
        .filter(item => item)[0];
}

const audioElement = document.querySelector("audio");
const progressLine = document.querySelector(".progress__line");
const currentTime = document.querySelector(".current-time");
const endTime = document.querySelector(".end-time");
const playerImg = document.querySelector(".player__img");
const playerBack = document.querySelector(".player__back ");
const nameTrack = document.querySelector(".name-track");
const idTrack = document.querySelector(".id_track");
let longTrack;

startTrack(audioList[0]);

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
        startTrack(audioList[trackNum - 1]);
    } else {
        startTrack(audioList[audioList.length - 1])
    }
})

const nextButton = document.querySelector(".icon-next");
nextButton.addEventListener("click", () => {
    const trackNum = getTrackNum();
    if (trackNum + 1 < audioList.length) {
        startTrack(audioList[trackNum + 1]);
    } else {
        startTrack(audioList[0])
    }
})
