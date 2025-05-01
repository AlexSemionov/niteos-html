const productionTogglerButtons = document.querySelectorAll('.production__list-toggler-button');
const productionContentItems = document.querySelectorAll('.production__list-content-item');
const productionContent = document.querySelector('.production__list-content');
const productionContentMoreButton = document.querySelector('.production__content-more-button');

productionTogglerButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    productionTogglerButtons.forEach((button) => button.classList.remove('active'));
    event.currentTarget.classList.add('active');
    updateProduction();
  });
});

function updateProduction() {
  const activeButton = document.querySelector('.production__list-toggler-button.active');
  if (!activeButton) return;
  const targetName = activeButton.dataset.target;
  productionContentItems.forEach(item => {
    if (item.dataset.category === targetName) item.classList.add('active')
    if (item.dataset.category !== targetName) item.classList.remove('active')
  })
}

updateProduction();
