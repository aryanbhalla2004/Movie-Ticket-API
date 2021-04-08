const API_KEY = `Dh4moGRBVb2XMce2oeGDE77orRDGfDlo3h27Falv`;
const baseURL = `https://api-gate2.movieglu.com/`;
const container = document.querySelector('.titles-wrapper');

async function fetchMovies() {
  const response = await fetch(`${baseURL}filmsNowShowing/?n=25`, {
    headers: {
      'x-api-key': API_KEY,
      'client': 'ZUWS',
      'Authorization': `Basic WlVXUzo2OUdlOHFLMnlUQVY=`,
      'territory': 'CA',
      'api-version': `v200`,
      'device-datetime': '2021-04-05T20:33:18.851Z',
      'geolocation': '43.6934;-79.4124'
    }
  });
  const JSON = await response.json();

  JSON.films.forEach(movie => {
    if (movie.images.poster[1]) {
      let img = document.createElement("img");
      img = movie.images.poster[1].medium.film_image;
      container.insertAdjacentHTML('beforeend', `
      <div class="movie" id="${movie.film_id}">
        <img src="${img}">
        <div class="overlay">
          <div class="title">${movie.film_name}</div>
          <div class="rating">0/10</div>
          <div class="plot">${movie.synopsis_long}</div>
        </div>
      </div>`)
    }
  });
}
fetchMovies();


container.onclick = e => {
  const movie = e.target.closest('.movie')

  if (movie !== null) {
    test(movie.id);
  }
}

async function test(id) {
  const response = await fetch(`${baseURL}filmDetails/?film_id=${id}`, {
    headers: {
      'x-api-key': API_KEY,
      'client': 'ZUWS',
      'Authorization': `Basic WlVXUzo2OUdlOHFLMnlUQVY=`,
      'territory': 'CA',
      'api-version': `v200`,
      'device-datetime': '2021-04-05T20:33:18.851Z',
      'geolocation': '43.6934;-79.4124'
    }
  });

  const JSON = await response.json();
  // console.log(JSON);
  localStorage.setItem('movieJSON', JSON);
}

//const testingConst = localStorage.getItem('movieJSON');
//console.log(testingConst)