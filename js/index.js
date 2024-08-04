const catalogSwiper = new Swiper('.catalog-slider .swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1.5,
    },
    720: {
      slidesPerView: 2,
    },
    860: {
      slidesPerView: 2.5,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3.5,
    },
  },
  scrollbar: {
    el: '.catalog-slider .swiper-scrollbar',
  },
});

const projectsSwiper = new Swiper('.projects .swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1.05,
    },
    1200: {
      slidesPerView: 1.2,
    },
  },
  navigation: {
    nextEl: '.projects__top-info-controls-buttons-next',
    prevEl: '.projects__top-info-controls-buttons-prev',
  },
});

const headerBurgerButton = document.querySelector('.header__controls-burger');
const mainNav = document.querySelector('.main-nav');
const mainNavCloseButton = document.querySelector('.main-nav__close');

if (headerBurgerButton && mainNavCloseButton) {
  headerBurgerButton.addEventListener('click', () => {
    mainNav.classList.add('active');
    document.body.classList.add('hidden');
  });

  mainNavCloseButton.addEventListener('click', () => {
    mainNav.classList.remove('active');
    document.body.classList.remove('hidden');
  });
}
