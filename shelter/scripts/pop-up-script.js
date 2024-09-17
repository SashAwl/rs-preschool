function createDetailsList(listItem) {
    const list = document.createElement("ul");
    list.className = "detail-list";

    listItem.forEach(item => {
        let listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    return list;
}

function createPopUpCard(petData, localImg) {
    const popUp = document.createElement("div");
    popUp.className = "pop-up";

    const popUpBack = document.createElement("div");
    popUpBack.className = "pop-up__back";
    popUp.appendChild(popUpBack);

    const popUpCard = document.createElement("div");
    popUpCard.className = "pop-up__card";

    const closeImg = document.createElement("img");
    closeImg.className = "pop-up__close";
    closeImg.src = localImg + "assets/icons/close.png";
    closeImg.alt = "close-img";
    popUpCard.appendChild(closeImg);

    const cardImg = document.createElement("img");
    cardImg.className = "pop-up__image";
    cardImg.src = localImg + petData.img;
    cardImg.alt = "pet-photo";
    popUpCard.appendChild(cardImg);

    const content = document.createElement("div");
    content.className = "pop-up__content";

    const heading = document.createElement("h2");
    heading.className = "heading-mini";
    heading.textContent = petData.name;
    content.appendChild(heading);

    const describe = document.createElement("h3");
    describe.className = "pop-up__describe";
    describe.textContent = petData.breed;
    content.appendChild(describe);

    const text = document.createElement("p");
    text.className = "pop-up__text";
    text.textContent = petData.description;
    content.appendChild(text);

    const detailList = document.createElement("ul");
    detailList.className = "pop-up__details";

    const age = document.createElement("li");
    age.textContent = `Age: ${petData.age}`;
    detailList.appendChild(age);

    const inoculations = document.createElement("li");
    inoculations.textContent = `Inoculations: ${petData.inoculations.length === 1 ? petData.inoculations[0] : ""}`;
    if (petData.inoculations.length > 1) inoculations.appendChild(createDetailsList(petData.inoculations));
    detailList.appendChild(inoculations);

    const diseases = document.createElement("li");
    diseases.textContent = `Diseases: ${petData.diseases.length === 1 ? petData.diseases[0] : ""}`;
    if (petData.diseases.length > 1) diseases.appendChild(createDetailsList(petData.diseases));
    detailList.appendChild(diseases);

    const parasites = document.createElement("li");
    parasites.textContent = `Parasites: ${petData.parasites.length === 1 ? petData.parasites[0] : ""}`;
    if (petData.parasites.length > 1) parasites.appendChild(createDetailsList(petData.parasites));
    detailList.appendChild(parasites);
    content.appendChild(detailList);
    popUpCard.appendChild(content);
    popUp.appendChild(popUpCard);

    return popUp;
}

const cards = document.querySelector(".card-box");
const ourFriendsCards = document.querySelector(".our-friends-cards");



function closePopUp(e) {
    const popUp = document.querySelector(".pop-up");

    if (popUp && e.target.matches(".pop-up__close")) {
        popUp.remove();
        document.body.style.overflow = "";
    }
    // console.log(e.target.closest(".pop-up__card"))

    // if (popUp && !e.target.closest(".pop-up")) {
    //     popUp.remove();
    //     document.body.style.overflow = "";
    // }
}

document.addEventListener("click", (e) => {
    closePopUp(e);
})
cards.addEventListener("click", (e) => {
    if (e.target.closest(".card-item")) {
        const petTargetName = Array.from(e.target.closest(".card-item").children).filter(i => i.matches(".card-item__heading"))[0].innerText;
        const petTargetData = cardData.filter(petItem => petItem.name === petTargetName)[0];
        ourFriendsCards.prepend(createPopUpCard(petTargetData, localCardImg));

        document.body.style.overflow = "hidden";
    }
})