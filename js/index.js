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
