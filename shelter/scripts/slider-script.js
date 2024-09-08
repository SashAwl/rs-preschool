// fetch("../assets/cardsData.json")
//     .then(res => res.json)
//     .then(data => console.log(data))

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
let cardDataList = []; // data for 48 objects
for (let i = 0; i < 6; i++) {
    cardDataList = [...cardDataList, ...shuffle([...cardData.slice(0, 4)]), ...shuffle([...cardData.slice(4)])];
}

function createCard(data, localImg) {   // create a slider card item
    const cardItem = document.createElement("div");
    cardItem.classList.add("card-item", "card-item--few-cards");

    const cardImg = document.createElement("img");
    cardImg.src = localImg + data.img;
    cardImg.alt = "our-friend-photo";
    cardImg.classList.add("card-item__image");
    cardItem.appendChild(cardImg);

    const cardHeading = document.createElement("h3");
    cardHeading.classList.add("card-item__heading");
    cardHeading.textContent = data.name;
    cardItem.appendChild(cardHeading);

    const cardButton = document.createElement("button");
    cardButton.classList.add("button", "button--color-light");
    cardButton.textContent = "Learn more";
    cardItem.appendChild(cardButton);

    return cardItem;
}

const cardBox = document.querySelector(".card-box");

function getCardCount() {   // receive the card count depending on the window width and site page
    return (isMainPage)
        ? (window.innerWidth < 768) ? 1 : (window.innerWidth < 1280 ? 2 : 3)
        : (window.innerWidth < 768) ? 3 : (window.innerWidth < 1280 ? 6 : 8);
}

function renderCards(cardList, start, stop, localImg) {   // render slider cards
    cardBox.innerHTML = "";

    for (i of cardList.slice(start, stop)) {
        cardBox.appendChild(createCard(i, localImg));
    }
}

let cardCount = getCardCount();     // slider inizialization
let startCard = 0; endCard = cardCount;
renderCards(cardDataList, startCard, endCard, localCardImg);

window.addEventListener("resize", () => {
    if (cardCount !== getCardCount()) {
        cardCount = getCardCount();
        endCard = startCard + cardCount;
        renderCards(cardDataList, startCard, endCard, localCardImg);
    }
})

const sliderArrow = document.querySelectorAll(".card-slider__arrow");
[arrowLeft, arrowRight] = sliderArrow;

arrowLeft.addEventListener("click", () => {
    if (endCard - cardCount > 0) {
        startCard -= cardCount;
        endCard -= cardCount;
        renderCards(cardDataList, startCard, endCard, localCardImg);
    } else {
        startCard = cardDataList.length - cardCount;
        endCard = cardDataList.length;
    }
    console.log(startCard, endCard)
});

arrowRight.addEventListener("click", () => {
    if (startCard + cardCount < cardDataList.length) {
        startCard += cardCount;
        endCard += cardCount;
        renderCards(cardDataList, startCard, endCard, localCardImg);
    } else {
        startCard = 0;
        endCard = startCard + cardCount;
    }
})
// console.log(arrowLeft, arrowRight)
