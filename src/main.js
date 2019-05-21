var plants = [];
var registers = [];
var elPlant;
var elRegister;
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
  loadPlants(loadRegisters, changeUrl);
}

function loadPlants(callback, callback2) {
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

      callback(callback2);
    }
  };
  xmlhttpPlants.open("GET", urlPlants, true);
  xmlhttpPlants.send();
}

function loadRegisters(callback) {
  var xmlhttpRegisters = new XMLHttpRequest();
  var urlRegisters = "/assets/db/registers.json";

  xmlhttpRegisters.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      registers = JSON.parse(this.responseText);
      callback();
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
      elPlant = plants.find(x => x.type === query);
      elRegister = registers[0];
      el.src = 'assets/img/' + elPlant.img;
      el.classList.remove('d-none');
      el.classList.add('d-block');

      tableRegister.classList.remove('d-none');
      tableRegister.classList.add('d-block');

      tableRegister.querySelector('.temperature-optimal').innerHTML = elPlant.properties.temperature.min + elPlant.properties.temperature.unit + '-' + elPlant.properties.temperature.max + elPlant.properties.temperature.unit;
      tableRegister.querySelector('.brightness-optimal').innerHTML = elPlant.properties.brightness.min + elPlant.properties.brightness.unit + '-' + elPlant.properties.brightness.max + elPlant.properties.brightness.unit;
      tableRegister.querySelector('.humidity-optimal').innerHTML = elPlant.properties.humidity.min + elPlant.properties.humidity.unit + '-' + elPlant.properties.humidity.max + elPlant.properties.humidity.unit;

      tableRegister.querySelector('.temperature-current').innerHTML = elRegister.temperature + elPlant.properties.temperature.unit;
      tableRegister.querySelector('.brightness-current').innerHTML = elRegister.brightness + elPlant.properties.brightness.unit;
      tableRegister.querySelector('.humidity-current').innerHTML = elRegister.humidity + elPlant.properties.humidity.unit;

      if (elRegister.temperature < elPlant.properties.temperature.min || elRegister.temperature > elPlant.properties.temperature.max) {
        tableRegister.querySelector('.temperature-current').classList.add('red');
      } else {
        tableRegister.querySelector('.temperature-current').classList.add('green');
      }
      if (elRegister.humidity < elPlant.properties.humidity.min || elRegister.humidity > elPlant.properties.humidity.max) {
        tableRegister.querySelector('.humidity-current').classList.add('red');
      } else {
        tableRegister.querySelector('.humidity-current').classList.add('green');
      }
      if (elRegister.brightness < elPlant.properties.brightness.min || elRegister.brightness > elPlant.properties.brightness.max) {
        tableRegister.querySelector('.brightness-current').classList.add('red');
      } else {
        tableRegister.querySelector('.brightness-current').classList.add('green');
      }

    } else {
      el.src = '';
      el.classList.remove('d-block');
      el.classList.add('d-none');

      tableRegister.classList.remove('d-block');
      tableRegister.classList.add('d-none');

      tableRegister.querySelector('.temperature-optimal').innerHTML = '';
      tableRegister.querySelector('.brightness-optimal').innerHTML = '';
      tableRegister.querySelector('.humidity-optimal').innerHTML = '';
      tableRegister.querySelector('.temperature-current').innerHTML = '';
      tableRegister.querySelector('.brightness-current').innerHTML = '';
      tableRegister.querySelector('.humidity-current').innerHTML = '';
    }
  }
}

window.onload = load;
