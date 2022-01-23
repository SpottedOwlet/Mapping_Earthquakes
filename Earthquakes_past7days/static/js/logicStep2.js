// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create the tile layer for the dark map
// We create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a basy layer that holds both maps above
let baseMaps = {
    "Streets": streets,
    "Satellite" : satelliteStreets
};

// Create the map object with a center and a zoom level: Method 2
let map = L.map("mapid",{
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// define your style
function styleInfo(feature) {
    return{
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        color: "purple",
        weight: 0.5
    }
}

// define getRadius function
function getRadius(magnitude){
    if (magnitude === 0){
        return 1;
    }
    return magnitude * 4;

};

// grabbing geoJSON data
d3.json(earthquakeData).then(function(data){
    console.log(data);
    // creating a geoJSON layer with the retrieved data
    L.geoJSON(data, {
        style: styleInfo,
        pointToLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        }
    }).addTo(map);
});


// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);


// ,{
//     style: myStyle,
//     onEachFeature: function(feature, layer){
//         layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
//     }
// }