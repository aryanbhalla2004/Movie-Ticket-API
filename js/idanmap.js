const key = "pk.eyJ1IjoiaGlyYWRhYmJhc2kiLCJhIjoiY2ttbWJjNzJqMDh3aDJ3bzQ4eXp6cWJjZCJ9.PB8mTgztoMbR3VCzuKUYfQ";
let defaultLng;
let defaultLat;
let cinemaLng = localStorage.getItem('cinemaLongitude');
let cinemaLat = localStorage.getItem('cinemaLatitude');
let geojson;
let cinemaName = "Cinema Name";

let map;
let options = {
  enableHighAccuracy: true,
  timeout: 7000,
  maximumAge: 0,
};

function success(pos) {
  let crd = pos.coords;
  defaultLng = crd.longitude;
  defaultLat = crd.latitude;
  
  mapboxgl.accessToken ="pk.eyJ1IjoiaGlyYWRhYmJhc2kiLCJhIjoiY2ttbWJjNzJqMDh3aDJ3bzQ4eXp6cWJjZCJ9.PB8mTgztoMbR3VCzuKUYfQ";
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-96, 37.8],
    zoom: 3,
  });
  
  map.on("load", function () {
    map.loadImage("https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("custom-marker", image);
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [defaultLng, defaultLat],
                },
                properties: {
                  title: "Your Location",
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [cinemaLng, cinemaLat],
                },
                properties: {
                  title: cinemaName,
                },
              },
            ],
          },
        });
        
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "custom-marker",
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.25],
            "text-anchor": "top",
          },
        });
      }
    );
  });
  
  addAndMove(defaultLng, defaultLat);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

async function addAndMove(defaultLng, defaultLat) {
    // destinationLoc = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${defaultLng},${defaultLat};${cinemaLng},${cinemaLat}?alternatives=true&geometries=geojson&steps=true&access_token=${key}`);
    const JSON = await response.json();
    console.log(JSON.routes[0].geometry.coordinates);
    addLines(JSON.routes[0].geometry.coordinates);
  }
  
  function addLines(coordinate) {
    geojson = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'properties': {},
          'coordinates': coordinate
        }
      }]
    };
  
    map.addSource('LineString', {
      'type': 'geojson',
      'data': geojson
    });
    map.addLayer({
      'id': 'LineString',
      'type': 'line',
      'source': 'LineString',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': 'skyblue',
        'line-width': 5
      }
    });

    let coordinates = geojson.features[0].geometry.coordinates;
    let bounds = coordinates.reduce(function(bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  
    map.fitBounds(bounds, {
      padding: 150
    });
  }
  
//   if (areThereAnyMarkers.length < 2) {
//     addAndMove(loc.dataset.long, loc.dataset.lat);
//   } else {
//     destinationLoc.remove();
//     map.removeLayer('LineString');
//     map.removeSource('LineString');
//     addAndMove(loc.dataset.long, loc.dataset.lat);
//   }
