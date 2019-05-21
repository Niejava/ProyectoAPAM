var plants = [];
var registers = [];
var elPlant;
var elRegister;
var el;
var modal;
var tableRegister;
var onForm;
var selectedRegister;

function load() {
  init();
};

function init() {
  el = document.querySelector('.plant');
  modal = document.querySelector('.modal');
  tableRegister = document.querySelector('.table-registers');
  onForm = document.forms[0];
  loadPlants(loadRegisters, changeUrl);

  if (el) {
    document.querySelector('.update-register').addEventListener('click', function (event) {
      modal.classList.add('d-block');
    });
    document.querySelector('.cancel-modal').addEventListener('click', function (event) {
      modal.classList.remove('d-block');
      modal.classList.add('d-none');
    });
    document.querySelector('.save-modal').addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      onSubmit();

      modal.classList.remove('d-block');
      modal.classList.add('d-none');
    })
  }
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
            <a href="/?plant=${p.id}">
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

      var elRegisterTable = document.querySelector('.tbody-registers');
      if (elRegisterTable) {
        registers.forEach(function(p, index) {
          var col = document.createElement('tr');
          col.classList.add('d-flex');
          col.innerHTML = `
            <td scope="row" class="col">${p.plantId}</td>
              <td scope="row" class="col">${new Date(p.time).toLocaleString()}</td>
              <td scope="row" class="col">${p.weather}</td>
              <td scope="row" class="col">${p.temperature}</td>
              <td scope="row" class="col">${p.humidity}</td>
              <td scope="row" class="col">${p.brightness}</td>
              <td scope="row" class="col-3"><button type="button" class="btn bg-primary btn-block" id="btn-${p.plantId}-${index}" style="color: white"><b>Seleccionar</b></button></td>
          `;
          elRegisterTable.appendChild(col);
          document.querySelector('#btn-' + p.plantId + '-' + index).addEventListener('click', function(b) {
            window.location.href = '/?plant=' + p.plantId + '&register=' + p.id;
          });
        });
      }
      callback();
    }
  };
  xmlhttpRegisters.open("GET", urlRegisters, true);
  xmlhttpRegisters.send();
}

function changeUrl() {
  if (el) {
    var query = new URLSearchParams(window.location.search);
    var queryPlant = query.get('plant');
    var queryRegister= query.get('register');
    if (queryPlant) {
      elPlant = plants.find(x => x.id === queryPlant);
      if (queryRegister) {
        elRegister = registers.find(x => x.id === queryRegister);
      } else {
        elRegister = registers[0];
      }
      el.src = 'assets/img/' + elPlant.img;
      el.classList.remove('d-none');
      el.classList.add('d-block');

      tableRegister.classList.remove('d-none');
      tableRegister.classList.add('d-block');

      tableRegister.querySelector('.temperature-optimal').innerHTML = elPlant.properties.temperature.min + elPlant.properties.temperature.unit + '-' + elPlant.properties.temperature.max + elPlant.properties.temperature.unit;
      tableRegister.querySelector('.brightness-optimal').innerHTML = elPlant.properties.brightness.min + elPlant.properties.brightness.unit + '-' + elPlant.properties.brightness.max + elPlant.properties.brightness.unit;
      tableRegister.querySelector('.humidity-optimal').innerHTML = elPlant.properties.humidity.min + elPlant.properties.humidity.unit + '-' + elPlant.properties.humidity.max + elPlant.properties.humidity.unit;

     updateRegister();

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

function updateRegister () {
  tableRegister.querySelector('.temperature-current').innerHTML = elRegister.temperature + elPlant.properties.temperature.unit;
  tableRegister.querySelector('.brightness-current').innerHTML = elRegister.brightness + elPlant.properties.brightness.unit;
  tableRegister.querySelector('.humidity-current').innerHTML = elRegister.humidity + elPlant.properties.humidity.unit;

  onForm.elements["temperature"].value = elRegister.temperature;
  onForm.elements["brightness"].value =  elRegister.brightness;
  onForm.elements["humidity"].value = elRegister.humidity;

  if (elRegister.temperature < elPlant.properties.temperature.min || elRegister.temperature > elPlant.properties.temperature.max) {
    tableRegister.querySelector('.temperature-current').classList.add('red');
    tableRegister.querySelector('.temperature-current').classList.remove('green');
  } else {
    tableRegister.querySelector('.temperature-current').classList.add('green');
    tableRegister.querySelector('.temperature-current').classList.remove('red');
  }
  if (elRegister.humidity < elPlant.properties.humidity.min || elRegister.humidity > elPlant.properties.humidity.max) {
    tableRegister.querySelector('.humidity-current').classList.add('red');
    tableRegister.querySelector('.humidity-current').classList.remove('green');
  } else {
    tableRegister.querySelector('.humidity-current').classList.add('green');
    tableRegister.querySelector('.humidity-current').classList.remove('red');
  }
  if (elRegister.brightness < elPlant.properties.brightness.min || elRegister.brightness > elPlant.properties.brightness.max) {
    tableRegister.querySelector('.brightness-current').classList.add('red');
    tableRegister.querySelector('.brightness-current').classList.remove('green');
  } else {
    tableRegister.querySelector('.brightness-current').classList.add('green');
    tableRegister.querySelector('.brightness-current').classList.remove('red');
  }
}

function onSubmit () {
  newTemperature = onForm.elements["temperature"].value;
  newBrightness = onForm.elements["brightness"].value;
  newHumidity = onForm.elements["humidity"].value;

  elRegister.temperature = newTemperature || 0;
  elRegister.brightness = newBrightness || 0;
  elRegister.humidity = newHumidity || 0;

  updateRegister();
}

function onSelectRegister (register) {
  console.log('r', register)
}

window.onload = load;
