function orbit () {
    const form = document.querySelector("launchForm");
    const pilotName = document.getElementById("input[name=pilotName]");
    const btn = document.getElementById("formSubmit")


    // window.addEventListener("load", function() {


    btn.addEventListener("click", function() { //form validation
    
    if (pilotName.value === "" || pilotName.value === null || pilotName.value === undefined) {
       alert("All fields are required!");
    }
    else {
        alert("button pushed! congrats!")
    }
//  });


   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse;
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   })
   
});
}
window.addEventListener("load", orbit);