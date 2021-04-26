// First we need to make sure that the javascript loads before the html
window.addEventListener("load" , function() {

   // When the submit button is hit, execute the code below
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {

      // Most of my DOM elements
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      let faultyItems = document.getElementById('faultyItems');
      let fuelStatus = document.getElementById('fuelStatus');
      let launchStatus = document.getElementById('launchStatus');
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');


      // Checking to make sure the form elements have values
      if (pilotName.value === ""|| copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      }

      // Making sure the pilot name and co-pilot name input values are strings
      if (isNaN(pilotName.value) || isNaN(copilotName.value)){
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready`;
      }
      else{
         alert("Pilot & Co-pilot need to be human names, not integers!");
         event.preventDefault();
      }

      // Making sure the fuel level and cargo mass input values are numbers
      if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)){
         alert("Fuel level & cargo mass need to be integers!");
         event.preventDefault();
      }
      else{ // If the fuel level and cargo mass are integers, make these checks below

         if(fuelLevel.value < 10000){ // Is the fuelLevel value below 10,000?
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = `Fuel level too low for the journey!`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = 'red';
         }else{
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
         }

         if(cargoMass.value > 10000){  // Is the cargoMass above 10,000?
            faultyItems.style.visibility = 'visible';
            cargoStatus.innerHTML = `Cargo mass too heavy for the shuttle to take off!`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = 'red';
         }else{
            faultyItems.style.visibility = 'visible';
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
         }

         if(fuelLevel.value >= 10000 && cargoMass.value <= 10000) { // If the fuelLevel is equal to or above 10,000 AND cargoMass is equal to or below 10,000, execute this code 
            faultyItems.style.visibility = 'visible';
            launchStatus.innerHTML = `Shuttle is ready for launch`;
            launchStatus.style.color = 'green';
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
         }

      }

      // Fetching a json
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json){
            const missionTarget = document.getElementById('missionTarget');
            const index = Math.floor(Math.random() * json.length - 1);
            missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
            <li>Name: ${json[index].name}</li>
            <li>Diameter: ${json[index].diameter}</li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">
            `;
         });
     });

      event.preventDefault();

   });

});