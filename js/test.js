const baseURL = "https://api.internationalshowtimes.com/v4/";
const API_KEY = "&apikey=5xiCFSSuCw4M8xsqcUviXJrp69gzzgEp";
const main = document.querySelector("main");

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  //console.log(crd.latitude, crd.longitude);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//navigator.geolocation.getCurrentPosition(success, error, options);

test();
async function test() {
  const response = await fetch(`${baseURL}cinemas/?countries=CA${API_KEY}`);
  const JSON = await response.json();
  JSON.cinemas.forEach((cinema) => {
    getAllCinemaMovies(cinema.id);
  });
}

async function getAllCinemaMovies(cinemaId) {
  const response = await fetch(
    `${baseURL}movies/?cinema_id=${cinemaId}${API_KEY}`
  );
  const JSON = await response.json();
  if (JSON.movies.length > 0) {
    JSON.movies.forEach((movie) => {
      getAllInformationMovie(movie.id);
    });
  }
}

async function getAllInformationMovie(movieId) {
  const response = await fetch(`${baseURL}movies/${movieId}?fields=id,title,original_title,release_dates,imdb_id,poster_image,scene_images,synopsis,genres,crew,keywords,preview_id${API_KEY}`);
  const JSON = await response.json();
  if (JSON.movie.poster_image !== null && JSON.movie.scene_images !== null) {
    let genres = [];
    JSON.movie.genres.forEach((genre) => {
      genres.push(genre.name);
    });
    
    console.log(JSON.movie);

    main.insertAdjacentHTML("afterbegin",`
      <div class="movie_card back bright" data-id ="${JSON.movie.id}" id="${JSON.movie.imdb_id}">
        <div class="info_section">
          <div class="movie_header">
            <img class="locandina" src="${JSON.movie.poster_image.image_files[4].url}" />
            <h1>${JSON.movie.original_title}</h1>
            <h4>${JSON.movie.crew[0].name}</h4>
            <span class="minutes">null min</span>
            <p class="type">${genres}</p>
          </div>
          <div class="movie_desc">
            <p class="text">${JSON.movie.synopsis}</p>
          </div>
        </div>
        <div class="blur_back bright_back"></div>
      </div>`
      );
    document.getElementById(JSON.movie.imdb_id).style.background = `url(${JSON.movie.scene_images[0].image_files[3].url})`;
  }
}

main.onclick = function (e) {
  const movie = e.target.closest('.movie_card');

  if(movie !== null) {
    const movieObject = {
      title: movie.querySelector('.movie_header h1').textContent,
      landscape: movie.style.backgroundImage,
      poster: movie.querySelector('.locandina').src,
      synopsis: movie.querySelector('.movie_desc p').innerHTML,
      id: movie.id,
      director: movie.querySelector('.movie_header h4').textContent,
      testID: movie.dataset.id,
    };
    
    localStorage.setItem('user', JSON.stringify(movieObject));
    // let user = JSON.parse(localStorage.getItem('user'));
    // getShowTime(user.testID);
  }
};


// async function getShowTime(id) {
//   const response = await fetch(`${baseURL}showtime.cinema_movie_title?nobody${API_KEY}`
//   );
//   const JSON = await response.json();
//   console.log(JSON.movie);
// }

