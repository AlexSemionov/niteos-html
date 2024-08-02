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
