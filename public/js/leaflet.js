// Initialize leaflet.js
// var L = require("leaflet");

async function get_pet_position(pet_id) {
  var element = document.getElementById("map");

  // Initialize the map
  var map = L.map(element);

  // Initialize the base layer
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  fetch(`/pet-position/${pet_id}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      // console.log(json.latitude.reverse()[0]);
      // console.log(json.latitude.reverse()[0].$numberDecimal);
      // console.log(json.longitude.reverse()[0].$numberDecimal);

      // Target's GPS coordinates.
      let target = L.latLng(
        json.latitude.reverse()[0].$numberDecimal,
        json.longitude.reverse()[0].$numberDecimal
      );

      // Place a marker on the same location.
      L.marker(target).addTo(map);

      // Set map's center to target with zoom 14.
      map.setView(target, 17);
    });
}
