// Add console.log to check to see if our code is working.
console.log("working");

// // Create the map object with a center and zoom level: method 1
// let map = L.map('mapid').setView([30, 30], 2);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// // Create a geoJSON layer to add above object to the map
// L.geoJSON(sanFranAirport).addTo(map);

//use pointToLayer function to add data to a popup marker
// L.geoJSON(sanFranAirport,{
//     // we turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng){
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h3>" + feature.properties.name + " (" + feature.properties.icao + ") </h3> <hr> <h4>" + feature.properties.city + ", " + feature.properties.country+ "</h4>");
//     }
// }).addTo(map);

// //onEach feature function to add data to a popup marker
// L.geoJSON(sanFranAirport,{
//     onEachFeature: function(feature, layer){
//         layer.bindPopup("<h3>" + feature.properties.name + " (" + feature.properties.icao + ") </h3> <hr> <h4>" + feature.properties.city + ", " + feature.properties.country+ "</h4>");
//     }
// }).addTo(map);


// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create the tile layer for the dark map
// We create the tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a basy layer that holds both maps above
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with a center and a zoom level: Method 2
let map = L.map("mapid",{
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/SpottedOwlet/Mapping_Earthquakes/main/torontoRoutes.json";

// define your style
let myStyle = {
    color: "purple",
    weight: 2
}

// grabbing geoJSON data
d3.json(torontoData).then(function(data){
    console.log(data);
    // creating a geoJSON layer with the retrieved data
    L.geoJSON(data,{
        style: myStyle,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);


