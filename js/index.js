import './collect-team.js';

const catalogSwiper = new Swiper('.catalog-slider .swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  mousewheel: true,
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

const headerInfoContactsFasade = document.querySelector('.header__info-contacts-fasade');
const headerInfoContactsLinks = document.querySelectorAll('.header__info-contacts-link');

if (headerInfoContactsLinks[0]) {
  updateFasade(headerInfoContactsLinks[0]);
}

if (headerInfoContactsFasade) {
  headerInfoContactsLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      updateFasade(event.currentTarget);
    });
  });
}

function updateFasade(link) {
  if (headerInfoContactsFasade && link) {
    headerInfoContactsFasade.innerHTML = '';
    const fasadeLink = document.createElement('a');
    fasadeLink.setAttribute('href', link.getAttribute('href'));
    fasadeLink.setAttribute('class', link.getAttribute('class'));
    fasadeLink.innerText = link.innerText;
    headerInfoContactsFasade.append(fasadeLink);
  }
}

const projectInfoSwiper = new Swiper('.project__info-gallery .swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.project__info-controls-next',
    prevEl: '.project__info-controls-prev',
  },
});

const projectGallerySwiper = new Swiper('.project-gallery__slider .swiper', {
  init: false,
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.project-gallery__controls-next',
    prevEl: '.project-gallery__controls-prev',
  },
});

projectGallerySwiper.on('init', function () {
  const prevSlideImg = [
    ...document.querySelectorAll('.project-gallery .swiper-slide img'),
  ].reverse()[0];
  const nextSlideImg = document.querySelector('.project-gallery .swiper-slide-next img');
  const prevImg = document.querySelector('.project-gallery__slider-prev-image');
  const nextImg = document.querySelector('.project-gallery__slider-next-image');

  if (prevSlideImg && prevImg) prevImg.setAttribute('src', prevSlideImg.getAttribute('src'));
  if (nextSlideImg && nextImg) nextImg.setAttribute('src', nextSlideImg.getAttribute('src'));
});

projectGallerySwiper.on('slideChangeTransitionStart', function () {
  const lastSlideImg = [
    ...document.querySelectorAll('.project-gallery .swiper-slide img'),
  ].reverse()[0];
  const prevSlideImg = document.querySelector('.project-gallery .swiper-slide-prev img');
  const nextSlideImg = document.querySelector('.project-gallery .swiper-slide-next img');
  const prevImg = document.querySelector('.project-gallery__slider-prev-image');
  const nextImg = document.querySelector('.project-gallery__slider-next-image');

  if (prevSlideImg && prevImg) prevImg.setAttribute('src', prevSlideImg.getAttribute('src'));
  if (!prevSlideImg && lastSlideImg && prevImg)
    prevImg.setAttribute('src', lastSlideImg.getAttribute('src'));
  if (nextSlideImg && nextImg) nextImg.setAttribute('src', nextSlideImg.getAttribute('src'));
});

projectGallerySwiper.init();

const prevThumb = document.querySelector('.project-gallery__slider-prev');
const nextThumb = document.querySelector('.project-gallery__slider-next');

if (prevThumb && nextThumb) {
  prevThumb.addEventListener('click', () => {
    projectGallerySwiper.slidePrev();
  });

  nextThumb.addEventListener('click', () => {
    projectGallerySwiper.slideNext();
  });
}

const projectWorkersSwiper = new Swiper('.project-workers .swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 1.8,
    },
    992: {
      slidesPerView: 2.5,
    },
    1200: {
      slidesPerView: 3.2,
    },
  },
  navigation: {
    nextEl: '.project-workers__controls-next',
    prevEl: '.project-workers__controls-prev',
  },
});
