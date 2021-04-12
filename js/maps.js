const key = "pk.eyJ1IjoiaGlyYWRhYmJhc2kiLCJhIjoiY2ttbWJjNzJqMDh3aDJ3bzQ4eXp6cWJjZCJ9.PB8mTgztoMbR3VCzuKUYfQ";
const API_KEY = "&apikey=5xiCFSSuCw4M8xsqcUviXJrp69gzzgEp";
const moviedbAPI_KEY = '00f7b7a847b0f2f4e32b0bc9490b1c45';
const baseURL = `https://api-gate2.movieglu.com/`;
const moviedbBaseURL = 'https://api.themoviedb.org/3/';

const container = document.querySelector('.titles-wrapper');
const main = document.querySelector('main');
const showTimeDate = document.querySelector('.showTimeDate');
const cinemasContainer = document.querySelector('.cinemas');
const showTimesListContainer = document.querySelector('.showTimes-list');
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const allMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
let testArr = [];
let testArr2 = [];
let testArr3 = [];

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

let user = JSON.parse(localStorage.getItem('user'));

main.insertAdjacentHTML('beforebegin', `
<div class="container-fluid p-0">
  <div class="background">
    <div class="background-content">
      <span>THRILLER | HORROR | TEEN PROGRAM</span>
      <h1 class="display-2">${user.title}</h1>
      <p>${user.synopsis}</p>
      <span class="details">2021 | DIRECTOR: <i class="text-secondary">${user.director}</i> | RUNTIME <i class="text-secondary">1hr 20mins</i></span>
      <div class="btn-holder">
        <button class="btn">WATCH TRAILER <i class="fa fa-play"></i></button>
        <button class="btn">BUY TICKETS</button>
      </div>
    </div>
  </div>
</div>`);

document.querySelector('.background').style.background = `${user.landscape}`;
document.querySelector('.background').style.backgroundRepeat = `no-repeat`;
document.querySelector('.background').style.backgroundPosition = `center`;
document.querySelector('.background').style.backgroundSize = `cover`;
document.querySelector('.background').style.height = `100vh`;

addTrailers();
async function addTrailers() {
  const response = await fetch(`${moviedbBaseURL}movie/${user.id}/videos?api_key=${moviedbAPI_KEY}&type="trailer"&language=en-US`);
  const JSON = await response.json();
  main.insertAdjacentHTML('afterbegin',`<iframe width="100%" height=750px" src="https://www.youtube.com/embed/${JSON.results[0].key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
}

getAllShowTimes(user.testID);
async function getAllShowTimes(id) {
  //Aperantly it is all over canada and not specificlly Winnipeg
  const response = await fetch(`https://api.internationalshowtimes.com/v4/showtimes?city_name=winnipeg&movie_id=${id}${API_KEY}`);
  const JSON = await response.json();
  JSON.showtimes.sort((a, b) => new Date(a.start_at).getDate() - new Date(b.start_at).getDate());
  
  JSON.showtimes.forEach(showTime => {
    if(!testArr.includes(new Date(showTime.start_at).getDate())){
      testArr.push(new Date(showTime.start_at).getDate());
      testArr2.push(new Date(showTime.start_at).getMonth());
      testArr3.push(new Date(showTime.start_at).getDay());
    }
  });

  for (let i = 0; i < testArr.length; i++) {
    showTimeDate.insertAdjacentHTML('beforeend', `
      <div class="showTime"> 
        <h3 class="showTimeWeekDay">${weekDays[testArr3[i]]}</h3>
        <h3 class="showTimeMonth">${allMonths[testArr2[i]]}</h3>
        <h3 class="showTimeDate">${testArr[i]}</h3>
      </div>
    `)
  }
  
  let newItems = [];
  showTimeDate.onclick = e => {
    const date = e.target.closest('.showTime');
    const allDates = document.querySelectorAll('.showTime');
    
    allDates.forEach(element => {
      element.classList.remove("selectedSelected");  
    });

    date.classList.toggle("selectedSelected");   
    if (date !== null) {
      newItems = [];
      cinemasContainer.textContent = '';
      JSON.showtimes.forEach(showTime => {
        if(new Date(showTime.start_at).getDate() == date.querySelector('.showTimeDate').textContent){
          if(!newItems.includes(showTime.cinema_id)) {
            newItems.push(showTime.cinema_id);
          }
        }
      });      
    }
    testFunction(date.querySelector('.showTimeDate').textContent);
  }
  
  function testFunction(date) {
    newItems.forEach(async element => {
      await testyIRES(element);
      JSON.showtimes.forEach(showTime => {
        if(showTime.cinema_id == element && new Date(showTime.start_at).getDate() == date){
          console.log(new Date(showTime.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          document.getElementById(`${showTime.cinema_id}`).insertAdjacentHTML('beforeend', `
            <div class="showTimes">${new Date(showTime.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          `);
        } 
      });
    });
  }

async function testyIRES(cinemaID) {  
  const response = await fetch(`https://api.internationalshowtimes.com/v4/cinemas?cinema_id=${cinemaID}${API_KEY}`);
  const JSON = await response.json();
  JSON.cinemas.forEach(element => {
    if(element.id === cinemaID){
     console.log(element.name, element.location.address.display_text);
     cinemasContainer.insertAdjacentHTML('beforeend', `
     <div class="cinema-details">
        <h2>${element.name}</h2>
        <h4>${element.location.address.display_text}</h4>
        <h5><i class="fas fa-map-marker-alt"></i> 0 km</h5> 
        <div id="map" class="mapboxgl-map" style='width: 800px; margin:0 auto; '>
          <div id='map' style='width: 100%; height:500px;'></div>
        </div>
        <div class="showTimes-list" id="${element.id}">
        </div>
      </div>`)
    }
  });
}
  
  // daysArray.forEach(element => {
  //   console.log(weekDays[element]);    
  // });
}











































// async function addAndMove(lng, lat) {
//   destinationLoc = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
//   const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${defaultLng},${defaultLat};${lng},${lat}?alternatives=true&geometries=geojson&steps=true&access_token=${key}`);
//   const JSON = await response.json();
//   addLines(JSON.routes[0].geometry.coordinates);
// }

// function addLines(coordinate) {
//   let geojson = {
//     'type': 'FeatureCollection',
//     'features': [{
//       'type': 'Feature',
//       'geometry': {
//         'type': 'LineString',
//         'properties': {},
//         'coordinates': coordinate
//       }
//     }]
//   };

//   map.addSource('LineString', {
//     'type': 'geojson',
//     'data': geojson
//   });
//   map.addLayer({
//     'id': 'LineString',
//     'type': 'line',
//     'source': 'LineString',
//     'layout': {
//       'line-join': 'round',
//       'line-cap': 'round'
//     },
//     'paint': {
//       'line-color': '#BF93E4',
//       'line-width': 5
//     }
//   });

//   let coordinates = geojson.features[0].geometry.coordinates;
//   let bounds = coordinates.reduce(function(bounds, coord) {
//     return bounds.extend(coord);
//   }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

//   map.fitBounds(bounds, {
//     padding: 150
//   });
// }

// if (areThereAnyMarkers.length < 2) {
//   addAndMove(loc.dataset.long, loc.dataset.lat);
// } else {
//   destinationLoc.remove();
//   map.removeLayer('LineString');
//   map.removeSource('LineString');
//   addAndMove(loc.dataset.long, loc.dataset.lat);
// }