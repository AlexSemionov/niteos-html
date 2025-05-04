const productMainSwiperEl = document.querySelector('.product__info-gallery-main .swiper');
const productThumbsSwiperEl = document.querySelector('.product__info-gallery-thumbs .swiper');
const productPrevButtonEl = document.querySelector('.product__info-gallery-prev-button');
const productNextButtonEl = document.querySelector('.product__info-gallery-next-button');

if (productMainSwiperEl && productThumbsSwiperEl) {
  const productThumbsSwiper = new Swiper(productThumbsSwiperEl, {
    spaceBetween: 15,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 8,
      },
      576: {
        direction: 'vertical',
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },
  });

  const productMainSwiper = new Swiper(productMainSwiperEl, {
    spaceBetween: 20,
    navigation: {
      prevEl: productPrevButtonEl,
      nextEl: productNextButtonEl,
    },
    thumbs: {
      swiper: productThumbsSwiper,
    },
  });
}
