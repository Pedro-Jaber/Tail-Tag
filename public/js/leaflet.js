// Initialize leaflet.js
// var L = require("leaflet");

var element = document.getElementById("map");

// Initialize the map
var map = L.map(element);

// Initialize the base layer
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

fetch("/pet-position")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // Target's GPS coordinates.
    let target = L.latLng(json.lat, json.lgn);

    // Place a marker on the same location.
    L.marker(target).addTo(map);

    // Set map's center to target with zoom 14.
    map.setView(target, 14);
  });
