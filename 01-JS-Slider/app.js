// DOM
const slides = [...document.querySelectorAll('.slider__item')];
const slidesContainer = document.querySelector('.slides__container');
const prevBtn = document.querySelector('.slider__arrow-left');
const nextBtn = document.querySelector('.slider__arrow-right');
const navigationContainer = document.querySelector('.bullets_navigation-container');
let activeIndex = 0;

const slidesPosition = function slidesPosition() {
  slides.forEach((slide, index) => {
    slide.style.left = `${100 * index}%`; 
  })
}

const navigateToSlide = function navigateToSlide(index){
  activeIndex = index;

// Option 1: Transform and move whole container
  // let position = activeIndex * - 100;
  // slidesContainer.style.transform = `translateX(${position}%)`;
  
// Option 2: Move all items individually
  slides.forEach((slide, slideIndex) => {
    let position = (slideIndex - activeIndex) * 100;
    slide.style.left = `${position}%`;
  })
}

const prevBtnAction = function prevBtnAction() {
  if (activeIndex ===  0) {
    activeIndex = slides.length - 1;
  } else {
    activeIndex = activeIndex - 1;
  } 
  console.log(activeIndex);
  navigateToSlide(activeIndex)
}

const nextBtnAction = function nextBtnAction() {
  if (activeIndex === slides.length - 1) {
    activeIndex = 0;
  } else {
    activeIndex = activeIndex + 1;
  }
  navigateToSlide(activeIndex)
}

const generateBulletNav = function generateBulletNav(){
  slides.forEach((slide, index) => {
    const bullet = document.createElement('div');
    bullet.classList.add('bullets__navigation-item');
    navigationContainer.insertAdjacentElement('afterbegin', bullet);
  })
}

// Calls
slidesPosition();
generateBulletNav();
const bulletNavigationItems = [...document.querySelectorAll('.bullets__navigation-item')];

prevBtn.addEventListener('click', function() {
  prevBtnAction();
})

nextBtn.addEventListener('click', function() {
  nextBtnAction();
})

bulletNavigationItems.forEach((item, index) => {
  item.addEventListener('click', function() {
    navigateToSlide(index);
  })
})