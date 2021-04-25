addEventListener("load", function() {
    let launchForm = document.getElementById("launchForm");
    let faultyItems = document.getElementById("faultyItems");
    let status = document.getElementById("status");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let missionTarget = document.getElementById("missionTarget");
 
    async function planet() {
       let response = await (await fetch ("https://handlers.education.launchcode.org/static/planets.json")).json();
       return response;
    }
 
    planet().then(data => {
       let ranNum = Math.floor(Math.random() * 6);
       let info = data[ranNum];
       missionTarget.innerHTML = 
          `<h2>Mission Destination</h2>
          <ol>
             <li>Name: ${info.name}</li>
             <li>Diameter: ${info.diameter}</li>
             <li>Star: ${info.star}</li>
             <li>Distance from Earth: ${info.distance}</li>
             <li>Number of Moons: ${info.moons}</li>
          </ol>
          <img src="${info.image}">`;
       })
 
    launchForm.addEventListener("submit", function(event) {
       let pilotName = document.querySelector("input[name=pilotName]");
       let copilotName = document.querySelector("input[name=copilotName]");
       let fuelLevel = document.querySelector("input[name=fuelLevel]");
       let cargoMass = document.querySelector("input[name=cargoMass]");
       pilotStatus.innerHTML = `Pilot Name: ${pilotName.value}`;
       copilotStatus.innerHTML = `Co-Pilot Name: ${copilotName.value}`;
       fuelStatus.innerHTML = `Fuel Level high enough for launch`;
       cargoMass.innerHTML = `Cargo mass low enough for launch`;
 
 
       if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "" ){
          window.alert("All fields are required!");
          event.preventDefault();
          return;
             // stop the form submission
       }
 
       if (!(isNaN(pilotName.value)) || !(isNaN(copilotName.value)) || isNaN(fuelLevel.value) || isNaN(cargoMass.value)){
          window.alert("Make sure to add valid information for each field!");
          event.preventDefault();
          return;
             // stop the form submission
       }
 
       if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
          status
    .style.color = "red";
          status
    .innerHTML = `Shuttle Not Ready For Launch`;
          faultyItems.style.visibility = "visible";
          fuelStatus.innerHTML = `Fuel level too low for launch`;
          cargoStatus.innerHTML = `Cargo mass too high for launch`;
          event.preventDefault();
          return;
       }
 
       else if (fuelLevel.value < 10000) {
          status
    .style.color = "red";
          status
    .innerHTML = `Shuttle Not Ready For Launch`;
          faultyItems.style.visibility = "visible";
          fuelStatus.innerHTML = `Fuel level too low for launch`;
          cargoStatus.innerHTML = `Cargo mass low enough for launch`;
          event.preventDefault();
          return;
       }
 
       else if (cargoMass.value > 10000) {
          status
    .style.color = "red";
          status
    .innerHTML = `Shuttle Not Ready For Launch`;
          faultyItems.style.visibility = "visible";
          fuelStatus.innerHTML = `Fuel level high enough for launch`;
          cargoStatus.innerHTML = `Cargo mass too high for launch`;
          event.preventDefault();
          return;
       }
 
       else {
          status
    .style.color = "green";
          status
    .innerHTML = `Shuttle Ready For Launch`;
          faultyItems.style.visibility = "visible";
          fuelStatus.innerHTML = `Fuel level high enough for launch`;
          cargoStatus.innerHTML = `Cargo mass low enough for launch`;
          event.preventDefault();
          return;
       }  
    });
 });