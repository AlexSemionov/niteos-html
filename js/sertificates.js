const sertificatesTogglerButtons = document.querySelectorAll('.sertificates__toggler-button');
const sertificatesContentItems = document.querySelectorAll('.sertificates__content-item');
const sertificatesContent = document.querySelector('.sertificates__content');
const sertificatesContentMoreButton = document.querySelector('.sertificates__content-more-button');

sertificatesTogglerButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    sertificatesTogglerButtons.forEach((button) => button.classList.remove('active'));
    event.currentTarget.classList.add('active');
    updateSertificates();
  });
});

if (sertificatesContentMoreButton) {
  sertificatesContentMoreButton.addEventListener('click', () => {
    sertificatesContentItems.forEach((contentItem) => contentItem.classList.toggle('visible'));
  });
}

function updateSertificates() {
  const activeButton = document.querySelector('.sertificates__toggler-button.active');
  if (!activeButton) return;
  const activeClassName = activeButton.dataset.target;
  if (sertificatesContent) sertificatesContent.dataset.category = activeClassName;
}

updateSertificates();
