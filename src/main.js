var plants = [];
var registers = [];

function load() {
  init();
};

function init() {
  loadPlants();
  loadRegisters();
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


window.onload = load;
