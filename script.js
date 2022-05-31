const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcBtn = document.getElementById('calculate-wealth');

let data = [];
async function getRandomUser() {
  // fetch random user and add money
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() *1000000)
  }

  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  // Clearing the main element
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach( item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  })
}

function formatMoney(number) {
  return '$' + number;
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);