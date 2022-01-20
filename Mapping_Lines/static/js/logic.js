// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level: method 1
let map = L.map('mapid').setView([34.0522, -118.2437], 5);

// Create the map object with a center and zoom level: method 2
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

//get data from cities.js
let cityData = cities;

// Loop through each city object and create on marker for each city
cityData.forEach(function(city) {
  console.log(city);
  L.circleMarker(city.location, {
    radius: city.population/100000,
    color: "orange",
    fillColor: "orange"
  })
  .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
});



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


