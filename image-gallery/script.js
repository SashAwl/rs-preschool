const apiUrl = "https://api.unsplash.com/";
const accessKey = "toRvZzu_BTm4oz1hzsIwspseUYlyzA3I9aebIJkDh6k";
let query = "spring";
const linUrl = apiUrl + `search/collections?client_id=${accessKey}&page=1&query=${query}`;

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

function displayGalleryImg(galleryBox) {
    getData(linUrl).then(data => {
        console.log(data[0])
        data.forEach(item => galleryBox.append(createImageItem(item)));
    })
}

const galleryImages = document.querySelector(".gallery__images");
displayGalleryImg(galleryImages);