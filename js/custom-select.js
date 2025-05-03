const customSelects = document.querySelectorAll('.custom-select');

customSelects.forEach((customSelect) => {
  initSelect(customSelect);
});

function initSelect(customSelect) {
  const selectElem = customSelect.querySelector('select');
  const placeholder = selectElem.getAttribute('placeholder');
  const options = [...selectElem.options].filter((option) => !option.disabled);

  const selectOverlay = document.createElement('div');
  selectOverlay.setAttribute('class', 'custom-select__overlay custom-select__hide');

  const selectSelected = document.createElement('div');
  selectSelected.classList.add('custom-select__selected');
  selectSelected.innerHTML = `<span class="custom-select__selected-text">${
    selectElem.options[selectElem.selectedIndex].innerHTML
  }</span>`;

  if (placeholder) selectSelected.innerHTML = `<span>${placeholder}</span>`;

  const selectItems = document.createElement('div');
  selectItems.setAttribute('class', 'custom-select__items custom-select__hide');

  [...options].forEach((option, index) => {
    const optionElem = document.createElement('div');
    optionElem.classList.add('custom-select__item');
    optionElem.innerHTML = option.innerHTML;
    if (index === 0) optionElem.classList.add('custom-select__same-as-selected');
    selectItems.append(optionElem);

    optionElem.addEventListener('click', () => {
      const sameAsSelected = selectItems.querySelector('.custom-select__same-as-selected');
      const changeEvent = new Event('change');
      selectSelected.innerHTML = `<span class="custom-select__selected-text">${option.innerHTML}</span>`;
      selectElem.value = option.value;
      customSelect.dataset.value = selectElem.value;
      sameAsSelected.classList.remove('custom-select__same-as-selected');
      optionElem.classList.add('custom-select__same-as-selected');
      selectElem.dispatchEvent(changeEvent);
      closeAllSelect();
    });
  });

  customSelect.append(selectSelected, selectItems, selectOverlay);

  selectSelected.addEventListener('click', function (event) {
    event.stopPropagation();
    closeAllSelect();
    event.currentTarget.classList.add('active');
    selectOverlay.classList.remove('custom-select__hide');
    selectItems.classList.remove('custom-select__hide');
  });

  selectOverlay.addEventListener('click', closeAllSelect);
}

function closeAllSelect() {
  customSelects.forEach((customSelect) => {
    const selectOverlayElement = customSelect.querySelector('.custom-select__overlay');
    const selectItemElement = customSelect.querySelector('.custom-select__items');
    const selectSelectedElement = customSelect.querySelector('.custom-select__selected');

    selectSelectedElement.classList.remove('active');
    selectItemElement.classList.add('custom-select__hide');
    selectOverlayElement.classList.add('custom-select__hide');
  });
}
