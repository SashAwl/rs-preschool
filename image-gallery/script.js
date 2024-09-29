const accessKey = "toRvZzu_BTm4oz1hzsIwspseUYlyzA3I9aebIJkDh6k";
const apiUrl = `https://api.unsplash.com/search/collections?client_id=${accessKey}`;
const dafaultQuery = "autumn";
let numPage = 1;

function createQueryURL(apiURL, query, page) {
    return apiURL + `&page=${page}&query=${query}`;
}

async function getData(url) {
    return await fetch(url)
        .then(data => data.json())
        .then(data => data.results)
        .catch(error => {
            console.log(error);
            return [];
        });
}

function createImageItem(imgData) {
    const imageItem = document.createElement("div");
    imageItem.style.backgroundImage = "url(" + imgData.cover_photo.urls.small + ")";
    imageItem.className = "image-item";
    return imageItem;
}

function createNotFound() {
    const notFound = document.createElement("p");
    notFound.className = "not-found";
    notFound.textContent = "No images found for your search";
    return notFound;
}

function createNoMoreImages() {
    const noMore = document.createElement("p");
    noMore.className = "not-found";
    noMore.textContent = "You have viewed all images for the current keyword.";
    return noMore;
}

function displayImgGallery(dataUrl, galleryBox) {
    getData(dataUrl).then(data => {
        if (data.length) {
            data.forEach(item => galleryBox.append(createImageItem(item)))
            loadMoreButton.classList.remove("load-more--hide");
        } else if (numPage > 1) {
            galleryBox.append(createNoMoreImages());
            loadMoreButton.classList.add("load-more--hide");
        } else {
            galleryBox.append(createNotFound());
            loadMoreButton.classList.add("load-more--hide");
        }
    })
}

function displaySearchingImgGallery(isNewRequest, pageNum) {
    const queryItem = searchLine.value || dafaultQuery;
    const queryURL = createQueryURL(apiUrl, queryItem, pageNum);
    if (isNewRequest) galleryImages.innerHTML = "";
    displayImgGallery(queryURL, galleryImages);
}

function toggleIconSearch() {
    searchIcon.classList.toggle("icon-blocked");
    closeIcon.classList.toggle("icon-blocked");
}

const linUrl = createQueryURL(apiUrl, dafaultQuery, numPage);
const galleryImages = document.querySelector(".gallery__images");
displayImgGallery(linUrl, galleryImages);

const searchIcon = document.querySelector(".icon-search");
const closeIcon = document.querySelector(".icon-close");
const searchLine = document.querySelector(".search__line");
const isDoneRequest = false;

searchLine.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        numPage = 1;
        displaySearchingImgGallery(true, numPage);
        toggleIconSearch();
    }
});

searchIcon.addEventListener("click", () => {
    numPage = 1;
    displaySearchingImgGallery(true, numPage);
    toggleIconSearch();
});

closeIcon.addEventListener("click", () => {
    searchLine.value = "";
    toggleIconSearch();
})

// const imgItem = document.querySelector(".image-item");
// imgItem.addEventListener("click", () => {
//     const fullPhotoBox = document.createElement("img");
//     fullPhotoBox.clas
// })

const loadMoreButton = document.querySelector(".load-more");
loadMoreButton.addEventListener("click", () => {
    numPage += 1;
    displaySearchingImgGallery(false, numPage);
})