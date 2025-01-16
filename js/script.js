const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll('.arrowBtn');
let firstCardWidth = carousel.querySelector('.card').offsetWidth;
// array of carousel children (which are li elements)
const carouselChildren = [...carousel.children];


let isDragging = false, startX, startScrollLeft;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})

// Insert copies of the first few cards to the end of carousel for infinite scrolling
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})

// event listeners for arrow buttons to scroll the carousel left & right
arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // let firstCardWidth = carousel.querySelector('.card').offsetWidth;

        // if clicked btn is left, then subtract first card width from
        // the carousel scroll left else add to it
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;

    })
})

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here

    // e.pageX returns the horizontal coordinate of mouse pointer
    // console.log(e.pageX);

    // scrollLeft sets or returns the number of px's an elements content is scroll horizontally
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

// on mouseup user cannot scroll on carousel with mouse
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {

    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth );
        carousel.classList.remove("no-transition");

        // If the carousel is at the end, scroll to the beginning
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        // scrollWidth returns width of the element's content including content
        // not visible on screen due to overflow

        // offsetWidth returns the viewable width of an element

        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);