// Initialize leaflet.js
// var L = require("leaflet");

async function initializeMap(pet_id) {
  // Initialize the base layer
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  get_pet_position(pet_id);
}

async function get_pet_position(pet_id) {
  fetch(`/user/pet-position/${pet_id}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);

      // Target's GPS coordinates
      let target = L.latLng(
        json.gpsData.latitude.reverse()[0].$numberDecimal,
        json.gpsData.longitude.reverse()[0].$numberDecimal
      );

      // Remove all markers from the map
      console.log(map._layers);
      map.removeLayer(map._layers);

      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Place a marker
      L.marker(target).addTo(map);

      // Set map's center to target with zoom 14
      map.setView(target, 17);
    });
}
