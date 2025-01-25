const collectTeamObj = {
  blockEl: document.querySelector('.collect-team'),
  orderEl: document.querySelector('.collect-team__team-order'),
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

collectTeamObj.managerCardEls.forEach((managerCardEl) => {
  managerCardEl.addEventListener('click', (event) => {
    const isAddButton = event.target.classList.contains('collect-team__card-add-button');
    if (isAddButton) addManager(managerCardEl);
  });
});

collectTeamObj.employeCardEls.forEach((employeCardEl) => {
  employeCardEl.addEventListener('click', (event) => {
    const isAddButton = event.target.classList.contains('collect-team__card-add-button');
    if (isAddButton) addEmploye(event.currentTarget);
  });
});

function updateCollectTeam() {
  if (collectTeamObj.managersEl && collectTeamObj.employeesEl) {
    if (collectTeamObj.manager === null) {
      collectTeamObj.managersEl.classList.add('active');
      collectTeamObj.employeesEl.classList.remove('active');
    } else {
      collectTeamObj.managersEl.classList.remove('active');
      collectTeamObj.employeesEl.classList.add('active');
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

function updateTeamCards() {
  const { manager, employees } = collectTeamObj;

  const cards = manager === null ? employees : [manager, ...employees];

  const teamCards = [...cards].map((card) => {
    const cardData = {
      imageEl: card.querySelector('.collect-team__card-photo-image'),
      nameEl: card.querySelector('.collect-team__card-info-name'),
      roleEl: card.querySelector('.collect-team__card-info-role'),
      speedEl: card.querySelector('.collect-team__card-info-details-speed'),
      qualityEl: card.querySelector('.collect-team__card-info-details-quality'),
      priceEl: card.querySelector('.collect-team__card-info-details-price'),
      getImageSrc() {
        return this.imageEl ? this.imageEl.getAttribute('src') : '';
      },
      getName() {
        return this.nameEl ? this.nameEl.innerText : '';
      },
      getRole() {
        return this.roleEl ? this.roleEl.innerText : '';
      },
      getSpeed() {
        return this.speedEl ? this.speedEl.dataset.rating : '';
      },
      getQuality() {
        return this.qualityEl ? this.qualityEl.dataset.rating : '';
      },
      getPrice() {
        return this.priceEl ? this.priceEl.dataset.rating : '';
      },
    };

    const cardId = card.dataset.id || 'unknown';

    const teamCard = document.createElement('div');
    teamCard.classList.add('collect-team__team-employe');
    teamCard.setAttribute('data-id', cardId);
    teamCard.innerHTML = `
      <div class="collect-team__team-employe-details">
        <figure class="collect-team__team-employe-details-photo">
          <img
            class="collect-team__team-employe-details-photo-image"
            src="${cardData.getImageSrc()}"
            alt="avatar"
          />
        </figure>
        <div class="collect-team__team-employe-details-block">
          <h3 class="collect-team__team-employe-details-block-title">
            ${cardData.getName()}
          </h3>
          <div class="collect-team__team-employe-details-block-info">
            ${cardData.getRole()} 
          </div>
        </div>
      </div>

      <ul class="collect-team__team-employe-info">
        <li
          class="collect-team__team-employe-info-item collect-team__team-employe-info-item_speed"
          data-rating="${cardData.getSpeed()}"
        >
          <div class="collect-team__team-employe-info-item-text">Скорость: ${cardData.getSpeed()}/10</div>
        </li>
        <li
          class="collect-team__team-employe-info-item collect-team__team-employe-info-item_experience"
          data-rating="${cardData.getQuality()}"
        >
          <div class="collect-team__team-employe-info-item-text">Опыт: ${cardData.getQuality()}/10</div>
        </li>
        <li
          class="collect-team__team-employe-info-item collect-team__team-employe-info-item_price"
          data-rating="${cardData.getPrice()}"
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
      const isManager =
        collectTeamObj.manager == null ? false : card.id === collectTeamObj.manager.id;
      if (isCloseButton && isManager) deleteManager(card);
      if (isCloseButton && !isManager) deleteEmploye(card);
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

function addManager(managerCardEl) {
  if (!managerCardEl) return;
  if (collectTeamObj.stepManagerEl) collectTeamObj.stepManagerEl.classList.add('active');
  collectTeamObj.manager = managerCardEl;
  collectTeamObj.managersEl.classList.remove('active');
  collectTeamObj.employeesEl.classList.add('active');
  updateCollectTeam();
}

function deleteManager(managerCardEl) {
  if (!managerCardEl) return;
  if (collectTeamObj.stepManagerEl) collectTeamObj.stepManagerEl.classList.remove('active');
  collectTeamObj.manager = null;
  collectTeamObj.managersEl.classList.add('active');
  collectTeamObj.employeesEl.classList.remove('active');
  updateCollectTeam();
}

function addEmploye(employeCardEl) {
  if (!employeCardEl) return;
  const employeesLimit = 4;
  employeCardEl.classList.add('active');
  if (employeCardEl && collectTeamObj.employees.length < employeesLimit) {
    collectTeamObj.employees = [...collectTeamObj.employees, employeCardEl];
  }
  if (collectTeamObj.employees.length === employeesLimit) {
    collectTeamObj.orderEl.classList.add('active');
    collectTeamObj.teamEmployeesEl.classList.add('hidden');
  }
  updateCollectTeam();
}

function deleteEmploye(employeCardEl) {
  if (!employeCardEl) return;
  employeCardEl.classList.remove('active');
  collectTeamObj.employees = [
    ...collectTeamObj.employees.filter((employe) => employe !== employeCardEl),
  ];
  updateCollectTeam();
}

updateCollectTeam();
