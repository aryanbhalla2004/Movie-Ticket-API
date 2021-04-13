//const key = "pk.eyJ1IjoiaGlyYWRhYmJhc2kiLCJhIjoiY2ttbWJjNzJqMDh3aDJ3bzQ4eXp6cWJjZCJ9.PB8mTgztoMbR3VCzuKUYfQ";

// let map;
// let options = {
//   enableHighAccuracy: true,
//   timeout: 7000,
//   maximumAge: 0,
// };

// function success(pos) {
//   let crd = pos.coords;
  
//   mapboxgl.accessToken ="pk.eyJ1IjoiaGlyYWRhYmJhc2kiLCJhIjoiY2ttbWJjNzJqMDh3aDJ3bzQ4eXp6cWJjZCJ9.PB8mTgztoMbR3VCzuKUYfQ";
//   var map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/hiradabbasi/ckn7tgwm30qgt17lbsuwymd2c",
//     center: [-96, 37.8],
//     zoom: 3,
//   });
  
//   map.on("load", function () {
//     map.loadImage("https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
//       function (error, image) {
//         if (error) throw error;
//         map.addImage("custom-marker", image);
//         map.addSource("points", {
//           type: "geojson",
//           data: {
//             type: "FeatureCollection",
//             features: [
//               // {
//               //   type: "Feature",
//               //   geometry: {
//               //     type: "Point",
//               //     coordinates: [-77.03238901390978, 38.913188059745586],
//               //   },
//               //   properties: {
//               //     title: "Mapbox DC",
//               //   },
//               // },
//               // {
//               //   type: "Feature",
//               //   geometry: {
//               //     type: "Point",
//               //     coordinates: [-122.414, 37.776],
//               //   },
//               //   properties: {
//               //     title: "Mapbox SF",
//               //   },
//               // },
//             ],
//           },
//         });
        
//         map.addLayer({
//           id: "points",
//           type: "symbol",
//           source: "points",
//           layout: {
//             "icon-image": "custom-marker",
//             "text-field": ["get", "title"],
//             "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//             "text-offset": [0, 1.25],
//             "text-anchor": "top",
//           },
//         });
//       }
//     );
//   });
  
//   //new mapboxgl.Marker().setLngLat([crd.longitude, crd.latitude]).addTo(map);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

// async function addAndMove(lng, lat) {
//     destinationLoc = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
//     const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${defaultLng},${defaultLat};${lng},${lat}?alternatives=true&geometries=geojson&steps=true&access_token=${key}`);
//     const JSON = await response.json();
//     addLines(JSON.routes[0].geometry.coordinates);
//   }
  
//   function addLines(coordinate) {
//     let geojson = {
//       'type': 'FeatureCollection',
//       'features': [{
//         'type': 'Feature',
//         'geometry': {
//           'type': 'LineString',
//           'properties': {},
//           'coordinates': coordinate
//         }
//       }]
//     };
  
//     map.addSource('LineString', {
//       'type': 'geojson',
//       'data': geojson
//     });
//     map.addLayer({
//       'id': 'LineString',
//       'type': 'line',
//       'source': 'LineString',
//       'layout': {
//         'line-join': 'round',
//         'line-cap': 'round'
//       },
//       'paint': {
//         'line-color': '#BF93E4',
//         'line-width': 5
//       }
//     });
  
//     let coordinates = geojson.features[0].geometry.coordinates;
//     let bounds = coordinates.reduce(function(bounds, coord) {
//       return bounds.extend(coord);
//     }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  
//     map.fitBounds(bounds, {
//       padding: 150
//     });
//   }
  
//   if (areThereAnyMarkers.length < 2) {
//     addAndMove(loc.dataset.long, loc.dataset.lat);
//   } else {
//     destinationLoc.remove();
//     map.removeLayer('LineString');
//     map.removeSource('LineString');
//     addAndMove(loc.dataset.long, loc.dataset.lat);
//   }