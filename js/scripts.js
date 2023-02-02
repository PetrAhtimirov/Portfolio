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


/* Smooth scroll */

let smoothScroll = function () {
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
}


/* Typing text description animation */

let stringDesc = "Creator / Designer / Developer";
let arrayDesc = stringDesc.split("");
let timerDesc;

function frameLooperDesc () {
    if (document.getElementById("desc")) {
        if (arrayDesc.length > 0) {
            document.getElementById("desc").innerHTML += arrayDesc.shift();
        } else {
            clearTimeout(timerDesc);
        }
        setTimeout('frameLooperDesc()',43);
    }
}

window.onload = function () {
    setTimeout(frameLooperDesc, 2000);
}


/* Parallax */

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
  
    return box.top + window.pageYOffset;
}

let parallax = function () {
    const parallaxContainers = document.querySelectorAll(".parallax-container");
    if (parallaxContainers.length > 0) {
        window.addEventListener('scroll', parallaxOnScroll);
        window.addEventListener('scroll', scrollChangeBackground);
    }
}

let parallaxOnScroll = function () {
    const parallaxContainers = document.querySelectorAll(".parallax-container");
    let currentScroll = window.pageYOffset;
    let windowHeight = window.innerHeight;

    for (let i = 0; i < parallaxContainers.length; i++) {
        let currentContainer = parallaxContainers[i];
        let parallaxItems = currentContainer.querySelectorAll(".parallax-image")
        let elementPageMargin = getCoords(currentContainer);
        let elementHeight = currentContainer.offsetHeight;

        let startParallaxIf = (elementPageMargin + (elementHeight/2)) < (currentScroll + windowHeight);
        let endParallaxIf = currentScroll < (elementPageMargin + elementHeight);

        if (startParallaxIf && endParallaxIf) {
            for (let j = 0; j < parallaxItems.length; j++) {
                let currentTransform = (currentScroll)/2;
                parallaxItems[i].style.transform = "translateY(" + currentTransform + "px)";
            }
        }
    }
}


/* Scroll Change Background Color */

let currentColor = [[255, 255, 255], [255, 255, 255]];

let scrollChangeBackground = function () {
    let currentScroll = window.pageYOffset;
    const triggerItems = document.querySelectorAll(".background-trigger");
    const backgroundMain = document.querySelector(".background-change");
    const colorarr = [[[255,255,255], [255,255,255]], 
                      [[230,198,209], [251,239,224]],
                      [[255,251,241], [216,220,231]],
                      [[255,217,147], [255,243,237]], 
                      [[255,255,255], [190,160,143]], 
                      [[255,255,255], [255,255,255]]];
    if (backgroundMain) {
        for (let i = 0; i < triggerItems.length; i++) {
            let elementCoord = getCoords(triggerItems[i]);
            let elementCoordEnd = (elementCoord + triggerItems[i].scrollHeight);
            if (currentScroll > elementCoord && currentScroll < elementCoordEnd) {
                for (let k = 0; k < 2; k++) {
                    for (let j = 0; j < 3; j++) {
                        let colorChanging = (currentScroll - elementCoord)*((colorarr[i+1][k][j] - colorarr[i][k][j])/triggerItems[i].scrollHeight);
                        currentColor[k][j] = colorarr[i][k][j] + colorChanging; 
                    }
                }
                backgroundMain.style.background = 'linear-gradient('+(currentScroll-360*Math.floor(currentScroll/360))/12+'deg, rgb('+currentColor[0][0]+','+currentColor[0][1]+','+currentColor[0][2]+') 0%, rgb('+currentColor[1][0]+','+currentColor[1][1]+','+currentColor[1][2]+') 100%)';
            }
        }
    }  
}


/* Scroll Animations */

let scrollAnimations = function () {
    const animItems = document.querySelectorAll(".anim-content");
    const animItemsMin = document.querySelectorAll(".anim-title", ".anim-hr");
    const animItemsStart = document.querySelectorAll(".anim-start");
    
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
    }

    if (animItemsMin.length > 0) {
        window.addEventListener('scroll', animOnScrollmin);
    }

    if (animItemsStart.length > 0) {
        window.addEventListener('scroll', animOnScrollstart);
    }
}

function animOnScroll() {
    const animItems = document.querySelectorAll(".anim-content");
    
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
    const animItemsMin = document.querySelectorAll(".anim-title, .anim-hr");

    for (let index = 0; index < animItemsMin.length; index++) {
        const animItem = animItemsMin[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 0.6;
        

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

function animOnScrollstart() {
    const animItemsStart = document.querySelectorAll(".anim-start");

    for (let index = 0; index < animItemsStart.length; index++) {
        const animItem = animItemsStart[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;
        

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

parallax();
scrollAnimations();
smoothScroll();
animOnScrollmin();
animOnScrollstart();
animOnScroll();


// Animations

const tl = gsap.timeline();

let pageAnimOut = function (container) {
    return gsap.fromTo(container.querySelector(".preloader"),  {
        duration: 0.4,
        top: "-120vh"
    }, {
        top: 0
    }), gsap.fromTo(container.querySelector("main"),  {
        duration: 0.2,
        transform: "translateY(0)"
    }, {
        delay: 0.2,
        transform: "translateY(300px)"
    })
}

let pageAnimIn = function (container) {
    return gsap.fromTo(container.querySelector(".preloader"),  {
        top: 0,
        duration: 0.4,
    }, {
        top: "100vh"
    }), gsap.fromTo(container.querySelector("main"),  {
        duration: 0.2,
        transform: "translateY(-300px)"
    }, {
        delay: 0.2,
        transform: "translateY(0)"
    })
}

let changePageTheme = function (container) {
    let color;
    if (container.id == "ipad") {
        color = "#141414";
    } else if (container.id == "main") {
        color = "white"
    }
    return gsap.to(container,  {
        background: color
    })
   
}

barba.hooks.enter((data) => {
    window.scrollTo(0, 0);
    smoothScroll();
    scrollAnimations();
    parallax();
    var vids = document.querySelectorAll("video"); vids.forEach(vid => { var playPromise = vid.play(); if (playPromise !== undefined) { playPromise.then(_ => {}).catch(error => {}); }; });
});

barba.init({
    transitions: [
        {
            name: 'base',
            async leave(data) {
                await pageAnimOut(data.current.container);
                await changePageTheme(data.next.container);
                data.current.container.remove();
            },
            async enter(data) {
                await pageAnimIn(data.next.container);   
            }
        }
    ]
})