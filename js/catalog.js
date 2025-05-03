const catalogFilterTogglerBtn = document.querySelector('.catalog__toggler-filter');
const catalogFilter = document.querySelector('.catalog__filter');

if (catalogFilterTogglerBtn && catalogFilter) {
  catalogFilterTogglerBtn.addEventListener('click', () => {
    catalogFilter.classList.toggle('active');
  });

  catalogFilter.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const isClose = event.target.classList.contains('catalog__filter-top-close');

    if (isClose || isLayout) {
      event.currentTarget.classList.remove('active');
    }
  });
}
