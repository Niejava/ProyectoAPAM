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
      console.log(plants);
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
