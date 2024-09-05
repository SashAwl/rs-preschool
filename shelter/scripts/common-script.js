const menuToogle = document.querySelector("#menu-toggle");
const backMenu = document.querySelector(".back-menu");

document.addEventListener("click", (e) => {
    if (e.target.matches(".menu__item__link")
        || e.target.matches(".back-menu")) {
        menuToogle.checked = false;
    }

    if (menuToogle.checked) {
        backMenu.classList.add("back-menu--color");
        document.body.style.position = 'fixed';
    } else {
        backMenu.classList.remove("back-menu--color");
        document.body.style.position = '';
    }
});


