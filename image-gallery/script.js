const accessKey = "toRvZzu_BTm4oz1hzsIwspseUYlyzA3I9aebIJkDh6k";
const apiUrl = `https://api.unsplash.com/search/collections?client_id=${accessKey}`;
const dafaultQuery = "autumn";
const defaultPage = 1;

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

function displayImgGallery(dataUrl, galleryBox) {
    getData(dataUrl).then(data => {
        data.length
            ? data.forEach(item => galleryBox.append(createImageItem(item)))
            : galleryBox.append(createNotFound());
    })
}

function displaySearchingImgGallery() {
    const queryItem = searchLine.value;
    const queryURL = createQueryURL(apiUrl, queryItem, 1);
    galleryImages.innerHTML = "";
    displayImgGallery(queryURL, galleryImages);
}

function toggleIconSearch() {
    searchIcon.classList.toggle("icon-blocked");
    closeIcon.classList.toggle("icon-blocked");
}

const linUrl = createQueryURL(apiUrl, dafaultQuery, defaultPage);
const galleryImages = document.querySelector(".gallery__images");
displayImgGallery(linUrl, galleryImages);

const searchIcon = document.querySelector(".icon-search");
const closeIcon = document.querySelector(".icon-close");
const searchLine = document.querySelector(".search__line");
const isDoneRequest = false;

searchLine.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        displaySearchingImgGallery();
        toggleIconSearch();
    }
});

searchIcon.addEventListener("click", () => {
    displaySearchingImgGallery();
    toggleIconSearch();
});

closeIcon.addEventListener("click", () => {
    searchLine.value = "";
    toggleIconSearch();
})