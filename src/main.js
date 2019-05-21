var plants = [];
var registers = [];
var elPlant;
var el;
var modal;
var tableRegister;

function load() {
  init();
};

function init() {
  el = document.querySelector('.plant');
  modal = document.querySelector('.modal');
  tableRegister = document.querySelector('.table-registers');
  loadPlants(changeUrl);
  loadRegisters();
}

function loadPlants(callback) {
  var xmlhttpPlants = new XMLHttpRequest();
  var urlPlants = "/assets/db/plants.json";

  xmlhttpPlants.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      plants = JSON.parse(this.responseText);

      var elChangePlant = document.querySelector('.container-change-plant .row');
      if (elChangePlant) {
        plants.forEach(function(p) {
          var col = document.createElement('div');
          col.classList.add('col');
          col.innerHTML = `
            <a href="/?plant=${p.type}">
                <img class="img_${p.type} rounded mx-auto d-block img-thumbnail" src="assets/img/${p.img}" alt="${p.type}">
            </a>
          `;
          elChangePlant.appendChild(col);
        });
      }

      callback();
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
    query = query.split('plant=')[1];
    if (query) {
      var p = plants.find(x => x.type === query);
      el.src = 'assets/img/' + p.img;
      el.classList.remove('d-none');
      el.classList.add('d-block');

      tableRegister.classList.remove('d-none');
      tableRegister.classList.add('d-block');

      tableRegister.querySelector('.temperature-optimal').innerHTML = p.properties.temperature.min + p.properties.temperature.unit + '-' + p.properties.temperature.max + p.properties.temperature.unit;
      tableRegister.querySelector('.brightness-optimal').innerHTML = p.properties.brightness.min + p.properties.brightness.unit + '-' + p.properties.brightness.max + p.properties.brightness.unit;
      tableRegister.querySelector('.humidity-optimal').innerHTML = p.properties.humidity.min + p.properties.humidity.unit + '-' + p.properties.humidity.max + p.properties.humidity.unit;

    } else {
      el.src = '';
      el.classList.remove('d-block');
      el.classList.add('d-none');

      tableRegister.classList.remove('d-block');
      tableRegister.classList.add('d-none');

      tableRegister.querySelector('.temperature-optimal').innerHTML = '';
      tableRegister.querySelector('.brightness-optimal').innerHTML = '';
      tableRegister.querySelector('.humidity-optimal').innerHTML = '';
    }
  }
}

window.onload = load;
