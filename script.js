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

function doubleMoney(){
  data.map(person => {person.money *= 2});
  updateDOM();
}

// Useful source: https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
function sortByRichest(){
  data.sort(function(a, b){
    return b.money - a.money
  });
  console.log(data);
  updateDOM();
}

/* Useful Source: https://bobbyhadz.com/blog/javascript-filter-array-of-objects-based-on-property */
function showMillionaires(){
  const elites = data.filter(data => {
    return data.money > 1000000;
  });
  data = elites;
  console.log(data);
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

// Useful Source: https://stackoverflow.com/questions/5732043/how-to-call-reduce-on-an-array-of-objects-to-sum-their-properties
function calculateWealth(){
  const total = data.reduce((a, b) => ({money: a.money + b.money}));
  console.log(total);
  const plus = document.createElement('div');
  plus.innerHTML = `<h3><strong>Total wealth:</strong> ${formatMoney(total.money)}</h3>`;
  main.appendChild(plus);
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calcBtn.addEventListener('click', calculateWealth);