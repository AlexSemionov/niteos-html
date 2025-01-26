const employeesLimit = 4;

const collectTeamObj = {
  blockEl: document.querySelector('.collect-team'),
  orderEl: document.querySelector('.collect-team__team-order'),
  orderFormEl: document.querySelector('.collect-team__team-order-form'),
  orderFormTeamInputEl: document.querySelector('.collect-team__team-order-form-ids'),
  collectBtnEl: document.querySelector('.collect-team__collect-button'),
  stepManagerEl: document.querySelector('.collect-team__step_manager'),
  stepWorkerEls: document.querySelectorAll('.collect-team__step_worker'),
  teamEmployeesEl: document.querySelector('.collect-team__team-employees'),
  managersEl: document.querySelector('.collect-team__managers'),
  employeesEl: document.querySelector('.collect-team__employees'),
  managerCardEls: document.querySelectorAll('.collect-team__managers .collect-team__card'),
  employeCardEls: document.querySelectorAll('.collect-team__employees .collect-team__card'),
  manager: null,
  employees: [],
  totalInfo: document.querySelector('.collect-team__team-employe-details-block-info'),
  totalResetEl: document.querySelector('.collect-team__team-employe-delete-button_reset'),
  totalSpeedEl: document.querySelector(
    '.collect-team__team-employe_total .collect-team__team-employe-info-item_speed'
  ),
  totalQualityEl: document.querySelector(
    '.collect-team__team-employe_total .collect-team__team-employe-info-item_experience'
  ),
  totalPriceEl: document.querySelector(
    '.collect-team__team-employe_total .collect-team__team-employe-info-item_price'
  ),
};

if (collectTeamObj.blockEl) {
  collectTeamObj.blockEl.addEventListener('click', (event) => {
    const isCollectButton = event.target === collectTeamObj.collectBtnEl;
    if (isCollectButton) event.currentTarget.classList.add('active');
  });
}

if (collectTeamObj.totalResetEl) {
  collectTeamObj.totalResetEl.addEventListener('click', () => {
    resetCollectTeam();
  });
}

collectTeamObj.managerCardEls.forEach((managerCardEl) => {
  managerCardEl.addEventListener('click', (event) => {
    const isAddButton = event.target.classList.contains('collect-team__card-add-button');
    if (isAddButton) {
      const manager = getCollectTeamCardData(event.currentTarget);
      addManager(manager);
    }
  });
});

collectTeamObj.employeCardEls.forEach((employeCardEl) => {
  employeCardEl.addEventListener('click', (event) => {
    const isAddButton = event.target.classList.contains('collect-team__card-add-button');
    if (isAddButton) {
      const employe = getCollectTeamCardData(event.currentTarget);
      addEmploye(employe);
    }
  });
});

if (collectTeamObj.orderFormEl) {
  collectTeamObj.orderFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    let formData = new FormData(collectTeamObj.orderFormEl);
    console.log(formData.get('name'));
    console.log(formData.get('phone'));
    console.log(formData.get('team'));
    event.currentTarget.reset();
    collectTeamObj.orderEl.classList.remove('active');
    collectTeamObj.employeCardEls.forEach((cardEl) => cardEl.classList.remove('active'));
    resetCollectTeam();
  });
}

function getCollectTeamCardData(employeCardEl) {
  if (!employeCardEl) return null;

  const elements = {
    card: employeCardEl,
    name: employeCardEl.querySelector('.collect-team__card-info-name'),
    role: employeCardEl.querySelector('.collect-team__card-info-role'),
    image: employeCardEl.querySelector('.collect-team__card-photo-image'),
    speed: employeCardEl.querySelector('.collect-team__card-info-details-speed'),
    experience: employeCardEl.querySelector('.collect-team__card-info-details-experience'),
    price: employeCardEl.querySelector('.collect-team__card-info-details-price'),
  };

  const data = {
    id: elements.card ? elements.card.id : '',
    name: elements.name ? elements.name.dataset.name : '',
    role: elements.role ? elements.role.dataset.role : '',
    imageSrc: elements.image ? elements.image.dataset.image : '',
    speed: elements.speed ? elements.speed.dataset.rating : '',
    experience: elements.experience ? elements.experience.dataset.rating : '',
    price: elements.price ? elements.price.dataset.rating : '',
  };

  return data;
}

function getEmployePageData(employeCardEl) {
  if (!employeCardEl) return null;

  const elements = {
    card: employeCardEl,
    name: employeCardEl.querySelector('.employe__title'),
    image: employeCardEl.querySelector('.employe__photo-image'),
    speed: employeCardEl.querySelector('.employe__details-speed'),
    experience: employeCardEl.querySelector('.employe__details-experience'),
    price: employeCardEl.querySelector('.employe__details-price'),
  };

  const data = {
    id: elements.card ? elements.card.dataset.id : '',
    name: elements.name ? elements.name.dataset.name : '',
    role: elements.card ? elements.card.dataset.role : '',
    imageSrc: elements.image ? elements.image.dataset.image : '',
    speed: elements.speed ? elements.speed.dataset.rating : '',
    experience: elements.experience ? elements.experience.dataset.rating : '',
    price: elements.price ? elements.price.dataset.rating : '',
  };

  return data;
}

function updateCollectTeam() {
  if (collectTeamObj.managersEl && collectTeamObj.employeesEl) {
    if (collectTeamObj.manager === null) {
      collectTeamObj.managersEl.classList.add('active');
      collectTeamObj.employeesEl.classList.remove('active');
      if (collectTeamObj.stepManagerEl) collectTeamObj.stepManagerEl.classList.remove('active');
    } else {
      collectTeamObj.managersEl.classList.remove('active');
      collectTeamObj.employeesEl.classList.add('active');
      if (collectTeamObj.stepManagerEl) collectTeamObj.stepManagerEl.classList.add('active');
    }
  }

  [...collectTeamObj.stepWorkerEls].forEach((stepEl, index) => {
    if (collectTeamObj.manager === null) {
      stepEl.classList.remove('active');
      stepEl.classList.add('hidden');
    } else if (index > collectTeamObj.employees.length) {
      stepEl.classList.remove('active');
      stepEl.classList.add('hidden');
    } else if (index === collectTeamObj.employees.length) {
      stepEl.classList.remove('active');
      stepEl.classList.remove('hidden');
    } else {
      stepEl.classList.add('active');
      stepEl.classList.remove('hidden');
    }
  });

  updateTeamCards();
  updateTotal();
}

function updateTotalInfo(number) {
  let ending = '';
  if (number === 0 || number >= 5) ending = 'ов';
  if (number === 1) ending = '';
  if (number > 1 && number < 5) ending = 'a';
  return `${number} сотрудник${ending}`;
}

function updateTeamCards() {
  updateLocalStorage();

  const { manager, employees, totalInfo, orderFormTeamInputEl } = collectTeamObj;

  const teamData = manager === null ? employees : [manager, ...employees];

  if (orderFormTeamInputEl)
    orderFormTeamInputEl.value = JSON.stringify(teamData.map((item) => item.id));

  if (totalInfo) totalInfo.innerText = updateTotalInfo(teamData.length);

  if (teamData.length >= employeesLimit + 1) {
    collectTeamObj.orderEl.classList.add('active');
    collectTeamObj.teamEmployeesEl.classList.add('hidden');
  }

  const teamCards = [...teamData].map((teamItemData) => {
    const { id, name, role, imageSrc, speed, experience, price } = teamItemData;

    const teamCard = document.createElement('div');
    teamCard.classList.add('collect-team__team-employe');
    teamCard.setAttribute('data-id', id);
    teamCard.innerHTML = `
      <div class="collect-team__team-employe-details">
        <figure class="collect-team__team-employe-details-photo">
          <img
            class="collect-team__team-employe-details-photo-image"
            src="${imageSrc}"
            alt="avatar"
          />
        </figure>
        <div class="collect-team__team-employe-details-block">
          <h3 class="collect-team__team-employe-details-block-title">
            ${name}
          </h3>
          <div class="collect-team__team-employe-details-block-info">
            ${role} 
          </div>
        </div>
      </div>

      <ul class="collect-team__team-employe-info">
        <li
          class="collect-team__team-employe-info-item collect-team__team-employe-info-item_speed"
          data-rating="${speed}"
        >
          <div class="collect-team__team-employe-info-item-text">Скорость: ${speed}/10</div>
        </li>
        <li
          class="collect-team__team-employe-info-item collect-team__team-employe-info-item_experience"
          data-rating="${experience}"
        >
          <div class="collect-team__team-employe-info-item-text">Опыт: ${experience}/10</div>
        </li>
        <li
          class="collect-team__team-employe-info-item collect-team__team-employe-info-item_price"
          data-rating="${price}"
        >
          <div class="collect-team__team-employe-info-item-text">Цена:</div>
          <div class="collect-team__team-employe-info-item-rating">
            <span class="collect-team__team-employe-info-item-rating-point"></span>
            <span class="collect-team__team-employe-info-item-rating-point"></span>
            <span class="collect-team__team-employe-info-item-rating-point"></span>
          </div>
        </li>
      </ul>

      <div class="collect-team__team-employe-delete">
        <button class="collect-team__team-employe-delete-button"></button>
      </div>
    `;
    teamCard.addEventListener('click', (event) => {
      const isCloseButton = event.target.classList.contains(
        'collect-team__team-employe-delete-button'
      );
      const isManager = collectTeamObj.manager == null ? false : id === collectTeamObj.manager.id;
      if (isCloseButton && isManager) deleteManager(teamItemData);
      if (isCloseButton && !isManager) deleteEmploye(teamItemData);
    });

    return teamCard;
  });

  if (collectTeamObj.teamEmployeesEl) {
    collectTeamObj.teamEmployeesEl.innerHTML = null;
    collectTeamObj.teamEmployeesEl.append(...teamCards);
  }
}

function updateTotal() {
  const teamRating = {
    speedEls: document.querySelectorAll(
      '.collect-team__team-employees .collect-team__team-employe-info-item_speed'
    ),
    qualityEls: document.querySelectorAll(
      '.collect-team__team-employees .collect-team__team-employe-info-item_experience'
    ),
    priceEls: document.querySelectorAll(
      '.collect-team__team-employees .collect-team__team-employe-info-item_price'
    ),
    getAvgSpeed() {
      if (this.speedEls.length === 0) return 10;
      const total = [...this.speedEls]
        .map((el) => (el.dataset.rating ? Number(el.dataset.rating) : 0))
        .reduce((acc, rating) => acc + rating, 0);
      return Math.round(total / this.speedEls.length);
    },
    getAvgQuality() {
      if (this.qualityEls.length === 0) return 10;
      const total = [...this.qualityEls]
        .map((el) => (el.dataset.rating ? Number(el.dataset.rating) : 0))
        .reduce((acc, rating) => acc + rating, 0);
      return Math.round(total / this.qualityEls.length);
    },
    getAvgPrice() {
      if (this.priceEls.length === 0) return 3;
      const total = [...this.priceEls]
        .map((el) => (el.dataset.rating ? Number(el.dataset.rating) : 0))
        .reduce((acc, rating) => acc + rating, 0);
      return Math.round(total / this.priceEls.length);
    },
  };

  if (collectTeamObj.totalSpeedEl) {
    collectTeamObj.totalSpeedEl.dataset.rating = teamRating.getAvgSpeed();
    collectTeamObj.totalSpeedEl.innerText = `Скорость: ${teamRating.getAvgSpeed()}/10`;
  }
  if (collectTeamObj.totalQualityEl) {
    collectTeamObj.totalQualityEl.dataset.rating = teamRating.getAvgQuality();
    collectTeamObj.totalQualityEl.innerText = `Опыт: ${teamRating.getAvgQuality()}/10`;
  }
  if (collectTeamObj.totalPriceEl)
    collectTeamObj.totalPriceEl.dataset.rating = teamRating.getAvgPrice();
}

function addManager(managerData) {
  if (managerData === null) return;
  collectTeamObj.manager = managerData;
  collectTeamObj.managersEl.classList.remove('active');
  collectTeamObj.employeesEl.classList.add('active');
  updateCollectTeam();
}

function deleteManager(managerData) {
  if (managerData === null) return;
  collectTeamObj.manager = null;
  collectTeamObj.managersEl.classList.add('active');
  collectTeamObj.employeesEl.classList.remove('active');
  updateCollectTeam();
}

function addEmploye(employeData) {
  if (employeData === null) return;
  const employeCardEl = document.querySelector(`#${employeData.id}`);
  if (employeCardEl) employeCardEl.classList.add('active');
  if (collectTeamObj.employees.length < employeesLimit) {
    collectTeamObj.employees = [...collectTeamObj.employees, employeData];
  }
  if (collectTeamObj.employees.length === employeesLimit) {
    collectTeamObj.orderEl.classList.add('active');
    collectTeamObj.teamEmployeesEl.classList.add('hidden');
  }
  updateCollectTeam();
}

function deleteEmploye(employeData) {
  if (employeData === null) return;
  const employeCardEl = document.querySelector(`#${employeData.id}`);
  if (employeCardEl) employeCardEl.classList.remove('active');
  collectTeamObj.employees = [
    ...collectTeamObj.employees.filter((employe) => employe.id !== employeData.id),
  ];
  updateCollectTeam();
}

function resetCollectTeam() {
  collectTeamObj.manager = null;
  collectTeamObj.employees = [];
  collectTeamObj.employeCardEls.forEach((cardEl) => cardEl.classList.remove('active'));
  updateLocalStorage();
  updateCollectTeam();
}

function updateLocalStorage() {
  window.localStorage.setItem('collectTeamManager', JSON.stringify(collectTeamObj.manager));
  window.localStorage.setItem('collectTeamEmployees', JSON.stringify(collectTeamObj.employees));
}

function checkLocalStorage() {
  const manager = window.localStorage.getItem('collectTeamManager');
  const employees = window.localStorage.getItem('collectTeamEmployees');

  if (manager !== null) collectTeamObj.manager = JSON.parse(manager);
  if (employees !== null) {
    collectTeamObj.employees = JSON.parse(employees);
    const activeEmployeIds = collectTeamObj.employees.map((employe) => employe.id);
    collectTeamObj.employeCardEls.forEach((el) => {
      const isIdActive = activeEmployeIds.includes(el.id);
      if (isIdActive) el.classList.add('active');
    });
  }
}

checkLocalStorage();
updateCollectTeam();

const employePageEls = document.querySelectorAll('.employe');

employePageEls.forEach((employePageEl) => {
  employePageEl.addEventListener('click', (event) => {
    const isAddButton = event.target.classList.contains('employe__add-button');

    if (isAddButton) {
      collectTeamObj.blockEl.classList.add('active');
      const employeData = getEmployePageData(event.currentTarget);

      if (String(employeData.role).toLowerCase() === 'менеджер') {
        addManager(employeData);
      } else {
        addEmploye(employeData);
      }
    }
  });
});
