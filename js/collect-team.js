const employeesLimit = 3;

const collectTeamObj = {
  manager: null,
  analytic: null,
  employees: [],
  blockEl: document.querySelector('.collect-team'),
  orderEl: document.querySelector('.collect-team__team-order'),
  orderFormEl: document.querySelector('.collect-team__team-order-form'),
  orderFormTeamInputEl: document.querySelector('.collect-team__team-order-form-ids'),
  collectBtnEl: document.querySelector('.collect-team__collect-button'),
  stepsWrapperEl: document.querySelector('.collect-team__steps'),
  unitsEl: document.querySelector('.collect-team__units'),
  stepEls: document.querySelectorAll('.collect-team__step'),
  teamEmployeesEl: document.querySelector('.collect-team__team-employees'),
  managersEl: document.querySelector('.collect-team__managers'),
  analyticsEl: document.querySelector('.collect-team__analytics'),
  employeesEl: document.querySelector('.collect-team__employees'),
  managerCardEls: document.querySelectorAll('.collect-team__managers .collect-team__card'),
  analyticCardEls: document.querySelectorAll('.collect-team__analytics .collect-team__card'),
  employeCardEls: document.querySelectorAll('.collect-team__employees .collect-team__card'),
  totalEl: document.querySelector('.collect-team__team-employe_total'),
  totalInfo: document.querySelector('.collect-team__team-employe-details-block-info'),
  totalResetEl: document.querySelector('.collect-team__team-employe-delete-button_reset'),
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

collectTeamObj.analyticCardEls.forEach((analyticCardEl) => {
  analyticCardEl.addEventListener('click', (event) => {
    const isAddButton = event.target.classList.contains('collect-team__card-add-button');
    if (isAddButton) {
      const analytic = getCollectTeamCardData(event.currentTarget);
      addAnalytic(analytic);
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

function showElement(element) {
  if (element) element.style.display = null;
}

function hideElement(element) {
  if (element) element.style.display = 'none';
}

function activateElement(element) {
  if (element) element.classList.add('active');
}

function disactivateElement(element) {
  if (element) element.classList.remove('active');
}

function getCollectTeamCardData(employeCardEl) {
  if (!employeCardEl) return null;

  const elements = {
    card: employeCardEl,
    name: employeCardEl.querySelector('.collect-team__card-info-name'),
    role: employeCardEl.querySelector('.collect-team__card-info-role'),
    image: employeCardEl.querySelector('.collect-team__card-photo-image'),
  };

  const data = {
    id: elements.card ? elements.card.id : '',
    name: elements.name ? elements.name.dataset.name : '',
    role: elements.role ? elements.role.dataset.role : '',
    imageSrc: elements.image ? elements.image.dataset.image : '',
    message1: elements.card.dataset.message1 || '',
    message2: elements.card.dataset.message2 || '',
    message3: elements.card.dataset.message3 || '',
  };

  return data;
}

function updateCollectTeam() {
  if (collectTeamObj.managersEl && collectTeamObj.employeesEl && collectTeamObj.analyticsEl) {
    if (collectTeamObj.manager === null) {
      collectTeamObj.managersEl.classList.add('active');
      collectTeamObj.analyticsEl.classList.remove('active');
      collectTeamObj.employeesEl.classList.remove('active');
    } else if (collectTeamObj.manager !== null && collectTeamObj.analytic === null) {
      collectTeamObj.managersEl.classList.remove('active');
      collectTeamObj.analyticsEl.classList.add('active');
      collectTeamObj.employeesEl.classList.remove('active');
    } else if (
      collectTeamObj.manager !== null &&
      collectTeamObj.analytic !== null &&
      collectTeamObj.employees.length === employeesLimit
    ) {
      collectTeamObj.managersEl.classList.remove('active');
      collectTeamObj.analyticsEl.classList.remove('active');
      collectTeamObj.employeesEl.classList.remove('active');
    } else {
      collectTeamObj.managersEl.classList.remove('active');
      collectTeamObj.analyticsEl.classList.remove('active');
      collectTeamObj.employeesEl.classList.add('active');
    }
  }

  [...collectTeamObj.stepEls].forEach((stepEl, index) => {
    if (collectTeamObj.manager === null && collectTeamObj.manager === null) {
      if (index <= 0) {
        stepEl.classList.remove('active');
      } else {
        hideElement(stepEl);
      }
    } else if (collectTeamObj.manager !== null && collectTeamObj.analytic === null) {
      if (index === 0) {
        stepEl.classList.add('active');
        showElement(stepEl);
      } else if (index === 1) {
        stepEl.classList.remove('active');
        showElement(stepEl);
      } else {
        stepEl.classList.remove('active');
        hideElement(stepEl);
      }
    } else if (collectTeamObj.manager !== null && collectTeamObj.analytic !== null) {
      const activeTeamMateIndex = collectTeamObj.employees.length + 2;

      if (index < activeTeamMateIndex) {
        stepEl.classList.add('active');
        showElement(stepEl);
      } else if (index === activeTeamMateIndex) {
        stepEl.classList.remove('active');
        showElement(stepEl);
      } else {
        stepEl.classList.remove('active');
        hideElement(stepEl);
      }
    }
  });

  if (
    collectTeamObj.manager === null &&
    collectTeamObj.analytic === null &&
    collectTeamObj.employees.length === 0
  ) {
    hideElement(collectTeamObj.totalEl);
  } else {
    showElement(collectTeamObj.totalEl);
  }

  updateTeamCards();
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

  const { manager, analytic, employees, totalInfo, orderFormTeamInputEl } = collectTeamObj;

  const teamData = [manager, analytic, ...employees].filter((item) => item !== null);

  if (orderFormTeamInputEl)
    orderFormTeamInputEl.value = JSON.stringify(teamData.map((item) => item.id));

  if (totalInfo) totalInfo.innerText = updateTotalInfo(teamData.length);

  if (teamData.length >= employeesLimit + 2) {
    collectTeamObj.orderEl.classList.add('active');
    hideElement(collectTeamObj.teamEmployeesEl);
    hideElement(collectTeamObj.stepsWrapperEl);
    activateElement(collectTeamObj.unitsEl);
  }

  const teamCards = [...teamData].map((teamItemData) => {
    const { id, name, role, imageSrc } = teamItemData;
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

      <div class="collect-team__team-employe-delete">
        <button class="collect-team__team-employe-delete-button"></button>
      </div>
    `;

    teamCard.addEventListener('click', (event) => {
      const isCloseButton = event.target.classList.contains(
        'collect-team__team-employe-delete-button'
      );
      const isManager = role === 'Менеджер';
      const isAnalytic = role === 'Аналитик';
      const isEmploye = role === 'Специалист';
      if (isCloseButton && isManager) deleteManager(teamItemData);
      if (isCloseButton && isAnalytic) deleteAnalytic(teamItemData);
      if (isCloseButton && isEmploye) deleteEmploye(teamItemData);
    });

    return teamCard;
  });

  if (collectTeamObj.teamEmployeesEl) {
    collectTeamObj.teamEmployeesEl.innerHTML = null;
    collectTeamObj.teamEmployeesEl.append(...teamCards);
  }

  const teamUnits = [...teamData].map((teamItemData) => {
    const { message1, message2, message3, imageSrc } = teamItemData;
    const messages = [message1, message2, message3];

    const message = messages[Math.floor(Math.random() * messages.length)];

    const teamUnit = document.createElement('div');
    teamUnit.classList.add('collect-team__units-item');
    teamUnit.innerHTML = `
      <figure class="collect-team__units-item-photo">
        <img
          class="collect-team__units-item-photo-image"
          src="${imageSrc}"
          alt="avatar"
        />
      </figure>

      <div class="collect-team__units-item-message">
        ${message}
      </div>
    `;

    return teamUnit;
  });

  if (collectTeamObj.unitsEl) {
    collectTeamObj.unitsEl.innerHTML = null;
    collectTeamObj.unitsEl.append(...teamUnits);
  }
}

function addManager(managerData) {
  if (managerData === null) return;
  collectTeamObj.manager = managerData;
  updateCollectTeam();
}

function deleteManager(managerData) {
  if (managerData === null) return;
  collectTeamObj.manager = null;
  updateCollectTeam();
}

function addAnalytic(analyticData) {
  if (analyticData === null) return;
  collectTeamObj.analytic = analyticData;
  updateCollectTeam();
}

function deleteAnalytic(analyticData) {
  if (analyticData === null) return;
  collectTeamObj.analytic = null;
  updateCollectTeam();
}

function addEmploye(employeData) {
  const emloyeIds = collectTeamObj.employees.map((employe) => employe.id);
  if (employeData === null) return;
  if (emloyeIds.find((emloyeId) => emloyeId === employeData.id)) return;
  if (collectTeamObj.employees.length === employeesLimit) {
    collectTeamObj.orderEl.classList.add('active');
    showElement(collectTeamObj.teamEmployeesEl);
    showElement(collectTeamObj.stepsWrapperEl);
    disactivateElement(collectTeamObj.unitsEl);
    return;
  }
  const employeCardEl = document.querySelector(`#${employeData.id}`);
  if (employeCardEl) employeCardEl.classList.add('active');
  if (collectTeamObj.employees.length < employeesLimit) {
    collectTeamObj.employees = [...collectTeamObj.employees, employeData];
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
  collectTeamObj.analytic = null;
  collectTeamObj.employees = [];
  collectTeamObj.employeCardEls.forEach((cardEl) => cardEl.classList.remove('active'));
  collectTeamObj.orderEl.classList.remove('active');
  showElement(collectTeamObj.teamEmployeesEl);
  showElement(collectTeamObj.stepsWrapperEl);
  disactivateElement(collectTeamObj.unitsEl);
  updateLocalStorage();
  updateCollectTeam();
}

function updateLocalStorage() {
  window.localStorage.setItem('collectTeamManager', JSON.stringify(collectTeamObj.manager));
  window.localStorage.setItem('collectTeamAnalytic', JSON.stringify(collectTeamObj.analytic));
  window.localStorage.setItem('collectTeamEmployees', JSON.stringify(collectTeamObj.employees));
}

function checkLocalStorage() {
  const manager = window.localStorage.getItem('collectTeamManager');
  const analytic = window.localStorage.getItem('collectTeamAnalytic');
  const employees = window.localStorage.getItem('collectTeamEmployees');

  if (manager !== null) collectTeamObj.manager = JSON.parse(manager);
  if (analytic !== null) collectTeamObj.analytic = JSON.parse(analytic);
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
