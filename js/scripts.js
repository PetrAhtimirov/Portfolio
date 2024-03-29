/* Menu dropdown */

let showHideNav = function () {
    let menu = document.querySelector('.menu');
    let dropdown = document.querySelector('.dropdown-navigation');
    let dropdownPoints = dropdown.children;
    menu.classList.toggle('menu-active');
    dropdown.classList.toggle('dropdown-navigation-disabled');
    for (let i = 0; i < dropdownPoints.length; i++) {
        dropdownPoints[i].classList.toggle('animation-points');
    }
};

/* Smooth scroll */

let smoothScroll = function () {
    const smoothLinks = document.querySelectorAll("a[href^='#']");
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    }
};

/* Parallax */

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return box.top + window.pageYOffset;
}

let parallax = function () {
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    if (parallaxContainers.length > 0) {
        window.addEventListener('scroll', parallaxOnScroll);
    }
    window.addEventListener('scroll', scrollImageShowing);
};

let parallaxOnScroll = function () {
    const parallaxContainers = document.querySelectorAll('.parallax-container');
    let currentScroll = window.pageYOffset;
    let windowHeight = window.innerHeight;

    for (let i = 0; i < parallaxContainers.length; i++) {
        let currentContainer = parallaxContainers[i];
        let parallaxItems =
            currentContainer.querySelectorAll('.parallax-image');
        let elementPageMargin = getCoords(currentContainer);
        let elementHeight = currentContainer.offsetHeight;

        let startParallaxIf =
            elementPageMargin + elementHeight / 2 <
            currentScroll + windowHeight;
        let endParallaxIf = currentScroll < elementPageMargin + elementHeight;

        if (startParallaxIf && endParallaxIf) {
            for (let j = 0; j < parallaxItems.length; j++) {
                let currentTransform = currentScroll / 2;
                parallaxItems[i].style.transform =
                    'translateY(' + currentTransform + 'px)';
            }
        }
    }
};

/* Scroll image showing */

let scrollImageShowing = function () {
    const showingItems = document.querySelectorAll('.kv-image');
    let windowInnerHeight = window.innerHeight;

    for (let i = 0; i < showingItems.length; i++) {
        if (
            showingItems[i].getBoundingClientRect()['y'] <
            0.16 * windowInnerHeight
        ) {
            showingItems[i].style.opacity = '1';
        } else {
            showingItems[i].style.opacity = '0';
        }
    }
};

/* Scroll Animations */

let scrollAnimations = function () {
    const animItems = document.querySelectorAll('.anim-content');
    const animItemsMin = document.querySelectorAll('.anim-title', '.anim-hr');
    const animItemsStart = document.querySelectorAll('.anim-start');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
    }

    if (animItemsMin.length > 0) {
        window.addEventListener('scroll', animOnScrollmin);
    }

    if (animItemsStart.length > 0) {
        window.addEventListener('scroll', animOnScrollstart);
    }
};

function animOnScroll() {
    const animItems = document.querySelectorAll('.anim-content');

    for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
        ) {
            animItem.classList.add('_active');
        } else {
            //animItem.classList.remove('_active');
        }
    }
}

function animOnScrollmin() {
    const animItemsMin = document.querySelectorAll('.anim-title, .anim-hr');

    for (let index = 0; index < animItemsMin.length; index++) {
        const animItem = animItemsMin[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 0.6;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
        ) {
            animItem.classList.add('_active');
        } else {
            //animItem.classList.remove('_active');
        }
    }
}

function animOnScrollstart() {
    const animItemsStart = document.querySelectorAll('.anim-start');

    for (let index = 0; index < animItemsStart.length; index++) {
        const animItem = animItemsStart[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
        ) {
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
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
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
    return (
        gsap.fromTo(
            container.querySelector('.preloader'),
            {
                duration: 0.4,
                top: '-120vh',
            },
            {
                top: 0,
            }
        ),
        gsap.fromTo(
            container.querySelector('main'),
            {
                duration: 0.2,
                transform: 'translateY(0)',
            },
            {
                delay: 0.1,
                transform: 'translateY(300px)',
            }
        )
    );
};

let pageAnimIn = function (container) {
    return (
        gsap.fromTo(
            container.querySelector('.preloader'),
            {
                top: 0,
                duration: 0.4,
            },
            {
                top: '100vh',
            }
        ),
        gsap.fromTo(
            container.querySelector('main'),
            {
                transform: 'translateY(-300px)',
            },
            {
                duration: 0.5,
                transform: 'translateY(0)',
            }
        )
    );
};

let changePageTheme = function (container) {
    let color;
    if (container.id == 'ipad') {
        color = '#141414';
    } else if (container.id == 'main') {
        color = 'white';
    }
    return gsap.to(container, {
        background: color,
    });
};

barba.hooks.enter((data) => {
    window.scrollTo(0, 0);
    smoothScroll();
    scrollAnimations();
    parallax();
    var vids = document.querySelectorAll('video');
    vids.forEach((vid) => {
        var playPromise = vid.play();
        if (playPromise !== undefined) {
            playPromise.then((_) => {}).catch((error) => {});
        }
    });
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
            },
        },
    ],
});
