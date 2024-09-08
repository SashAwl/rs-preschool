function addButtonBlock(arrow, doubleArrow) {
    arrow.classList.add("item--disabled");
    arrow.setAttribute("disabled", "disabled");
    doubleArrow.classList.add("item--disabled");
    doubleArrow.setAttribute("disabled", "disabled");
}

function removeButtonBlock(arrow, doubleArrow) {
    arrow.classList.remove("item--disabled");
    arrow.removeAttribute("disabled");
    doubleArrow.classList.remove("item--disabled");
    doubleArrow.removeAttribute("disabled");
}

let pageCount = Math.ceil(cardDataList.length / cardCount);
const pagination = document.querySelectorAll(".pagination__item");
[doubleLeft, left, currentPage, right, doubleRight] = pagination;

doubleLeft.addEventListener("click", () => {
    if (Number(currentPage.innerHTML) > 1) {
        currentPage.innerHTML = 1;
        addButtonBlock(left, doubleLeft);
        removeButtonBlock(right, doubleRight);
    }

    startCard = 0;
    endCard = startCard + cardCount;
    renderCards(cardDataList, startCard, endCard, localCardImg);
})

left.addEventListener("click", () => {
    if (Number(currentPage.innerHTML) > 1) {
        currentPage.innerHTML = Number(currentPage.innerHTML) - 1;
        removeButtonBlock(right, doubleRight);
    }
    if (Number(currentPage.innerHTML) === 1) {
        addButtonBlock(left, doubleLeft);
    }

    startCard -= cardCount;
    endCard = startCard + cardCount;
    renderCards(cardDataList, startCard, endCard, localCardImg);
})

right.addEventListener("click", () => {
    if (Number(currentPage.innerHTML) < pageCount) {
        currentPage.innerHTML = Number(currentPage.innerHTML) + 1;
        removeButtonBlock(left, doubleLeft);
    }
    if (Number(currentPage.innerHTML) === pageCount) {
        addButtonBlock(right, doubleRight);
    }
    startCard += cardCount;
    endCard = startCard + cardCount;
    renderCards(cardDataList, startCard, endCard, localCardImg);
})

doubleRight.addEventListener("click", () => {
    if (Number(currentPage.innerHTML) < pageCount) {
        currentPage.innerHTML = pageCount;
        removeButtonBlock(left, doubleLeft);
        addButtonBlock(right, doubleRight);
    }

    endCard = cardDataList.length;
    startCard = endCard - cardCount;
    renderCards(cardDataList, startCard, endCard, localCardImg);
})