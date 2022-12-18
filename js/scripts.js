/* Menu dropdown */
let showHideNav =  function () {
    let menu = document.querySelector('.menu');
    let dropdown = document.querySelector('.dropdown-navigation');
    let dropdownPoints = dropdown.children;
    menu.classList.toggle("menu-active");
    dropdown.classList.toggle("dropdown-navigation-disabled");
    for (let i = 0; i < dropdownPoints.length; i++) {
        dropdownPoints[i].classList.toggle("animation-points");
    }
};

/* Preloader */
window.onload = function () {
    setTimeout(frameLooperDesc, 2000);
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
    setTimeout('frameLooperDesc()',43);
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

// Animations

const tl = gsap.timeline();

let pageAnimOut = function (container) {
    return gsap.fromTo(container.querySelector(".preloader"),  {
        duration: 0.4,
        top: "-120vh"
    }, {
        top: 0
    }), gsap.to(container.querySelector("main"),  {
        duration: 0.5,
        transform: "translateY(200px)"
    })
}

let pageAnimIn = function (container) {
    return gsap.fromTo(container.querySelector(".preloader"),  {
        top: 0,
        duration: 0.4
    }, {
        top: "100vh",
        delay: 0.15
    }), gsap.fromTo(container.querySelector("main"),  {
        duration: 0.5,
        transform: "translateY(-200px)"
    }, {
        delay: 0.25,
        transform: "translateY(0)"
    })
}

barba.init({
    transitions: [
        {
            name: 'base',
            async leave(data) {
                await pageAnimOut(data.current.container);
                data.current.container.remove();
            },
            async enter(data) {
                await pageAnimIn(data.next.container);
            }
        }
    ],
    views: [
        {
            namespace: 'home',
            afterEnter() {
                
            }
        }
    ]
})

/* Scroll Animations */

const animItems = document.querySelectorAll(".anim-content");
const animItemsMin = document.querySelectorAll(".anim-title");

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    window.addEventListener('scroll', animOnScrollmin);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 2;
            

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                //animItem.classList.remove('_active');
            }
        }
    }

    function animOnScrollmin() {
        for (let index = 0; index < animItemsMin.length; index++) {
            const animItem = animItemsMin[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 0.4;
            

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                //animItem.classList.remove('_active');
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
}