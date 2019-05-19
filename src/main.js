var plants = [];
var registers = [];
var elPlant;

function load() {
  init();
};

function init() {
  el = document.querySelector('.plant');
  loadPlants();
  loadRegisters();
  changeUrl();
}

function loadPlants() {
  var xmlhttpPlants = new XMLHttpRequest();
  var urlPlants = "/assets/db/plants.json";

  xmlhttpPlants.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      plants = JSON.parse(this.responseText);

      var elChangePlant = document.querySelector('.container-change-plant .row');

      console.log(elChangePlant)
      plants.forEach(function(p) {
        var col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
          <a href="/?plant=${p.type}">
              <img class="img_${p.type} rounded mx-auto d-block img-thumbnail" src="assets/img/${p.img}" alt="${p.type}">
          </a>
        `;
        elChangePlant.appendChild(col);
      })
    }
  };
  xmlhttpPlants.open("GET", urlPlants, true);
  xmlhttpPlants.send();
}

function loadRegisters() {
  var xmlhttpRegisters = new XMLHttpRequest();
  var urlRegisters = "/assets/db/registers.json";

  xmlhttpRegisters.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      registers = JSON.parse(this.responseText);
      console.log(registers);
    }
  };
  xmlhttpRegisters.open("GET", urlRegisters, true);
  xmlhttpRegisters.send();
}

function changeUrl() {
  if (el) {
    var query = window.location.search;
    query = query.split('=')[1];
    switch (query) {
      case 'girasol':
        el.src = 'assets/img/girasol.svg';
        el.classList.remove('d-none');
        el.classList.add('d-block');
        break;
      case 'helecho':
        el.src = 'assets/img/helecho.svg';
        el.classList.remove('d-none');
        el.classList.add('d-block');
        break;
      case 'cactus':
        el.src = 'assets/img/cactus.svg';
        el.classList.remove('d-none');
        el.classList.add('d-block');
        break;
      default:
        el.src = '';
        el.classList.remove('d-block');
        el.classList.add('d-none');
        break;
  }
  }
}

window.onload = load;
