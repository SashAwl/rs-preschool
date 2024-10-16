const block = document.querySelector(".block");
const hole = document.querySelector(".hole");
const character = document.querySelector(".character");
const gameOver = document.querySelector(".game-over");
const scoreText = document.querySelector(".score");
const lastGames = document.querySelector(".last-games");
const record = document.querySelector(".record");
const levelIcon = document.querySelector(".level-icon");
let speedAnimation = 5;
let gameCount = 0;
let jumping = 0;
let score = 0;
if (!localStorage || !localStorage.length) localStorage.setItem("games", '[]');

function setGameInterval(gameInterval) {
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (jumping == 0) {
        character.style.top = (characterTop + 1) + "px";
    }

    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    const cTop = -(500 - characterTop);

    if (characterTop > 480 || ((cTop < holeTop || cTop > holeTop + 150) && (blockLeft > -50 && blockLeft < 20))) {
        clearInterval(gameInterval);
        setTimeout(() => {
            gameOver.style.display = "block";
            scoreText.textContent = "Your score: " + score.toString();
            score = 0;
            block.classList.remove("animation-blocks");
            hole.classList.remove("animation-blocks");
            character.style.top = 100 + "px";
        }, 1);

        const gameList = JSON.parse(localStorage.getItem("games"));
        if (gameList.length >= 10) gameList.pop(0);
        gameList.push({ 'name': "gameItem", 'score': score });
        localStorage.setItem("games", JSON.stringify(gameList));

        const gameUList = document.querySelector(".game-list");
        gameUList.innerHTML = "";
        let maxScore = 0;
        gameList.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Game : ${item.name}${index}. Score: ${item.score}`;
            gameUList.append(listItem);
            maxScore = Math.max(maxScore, item.score);
        });

        record.textContent = `Record: ${maxScore}`
    }
}

function startGame() {
    gameCount += 1;
    block.classList.add("animation-blocks");
    hole.classList.add("animation-blocks");
    startWrapper.style.display = "none";
    gameOver.style.display = "none";
    const gameInterval = setInterval(() => setGameInterval(gameInterval), 10);
}

hole.addEventListener("animationiteration", () => {
    const random = -(Math.random() * 300 + 150);
    hole.style.top = random + "px";
    score++;
})

const startButton = document.querySelector(".start-button");
const startButtonAgain = document.querySelector(".start-button--again");
const startWrapper = document.querySelector(".start-wrapper");

startButton.addEventListener("click", () => startGame());
startButtonAgain.addEventListener("click", () => startGame());

function jump() {
    jumping = 1;
    let jumpCount = 0;
    const jumpInterval = setInterval(() => {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = (characterTop - 5) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10)
}

document.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        jump();
    }
})
