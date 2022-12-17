/* Menu dropdown */
let menuLink = document.querySelector('.menu-link');
let menu = document.querySelector('.menu');
let dropdown = document.querySelector('.dropdown-navigation');
let dropdownPoints = dropdown.children;
menuLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    menu.classList.toggle("menu-active");
    dropdown.classList.toggle("dropdown-navigation-disabled");
    for (let i = 0; i < dropdownPoints.length; i++) {
        dropdownPoints[i].classList.toggle("animation-points");
    }
});

/* Preloader */
let logo = document.querySelector('.logo');
logo.classList.add('display-none');

let navigation = document.querySelector('.navigation');
navigation.classList.add('display-none');

let bannerContent = document.querySelector('.banner-text');
bannerContent.classList.add('display-none');

let cursor = document.querySelector('.cursor');
cursor.classList.add('display-none');

let circle = document.querySelector('.loader');

let showPage = function () {
    document.body.classList.add('loaded_hiding');
    circle.classList.add('zero-opacity');
    window.setTimeout(function () {
        document.body.classList.remove('loaded_hiding');
        document.body.classList.add('loaded');
    }, 800);
};

window.onload = function () {
    logo.classList.remove('display-none');
    navigation.classList.remove('display-none');
    bannerContent.classList.remove('display-none');
    cursor.classList.remove('display-none');
    setTimeout(showPage, 500);
    setTimeout(frameLooperDesc, 2600);
}

window.onbeforeunload = function () {
    document.body.classList.remove('loaded');
    window.scrollTo(0, 0);
}

/* Typing text description animation */
let stringDesc = "Creator / Developer / Designer";
let arrayDesc = stringDesc.split("");
let timerDesc;

function frameLooperDesc () {
    if (arrayDesc.length > 0) {
        document.getElementById("desc").innerHTML += arrayDesc.shift();
    } else {
        clearTimeout(timerDesc);
    }
    setTimeout('frameLooperDesc()',50);
}

/* Smooth scroll */
const smoothLinks = document.querySelectorAll("a[href^='#']");
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener("click", function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute("href");

        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}