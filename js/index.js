const baseURL = "https://api.internationalshowtimes.com/v4/";
const API_KEY = "&apikey=5xiCFSSuCw4M8xsqcUviXJrp69gzzgEp";
const topSliderMovies = document.querySelector(".cs-hidden");
const popularMovieHolder = document.querySelector('.select-movie');
const genreSelector = document.querySelector('.genra-selector');
const styleSelection = document.querySelector('.header-top-selection');
const allMovieIds = [];
const allMovies = [];
const genres = [];
let int = 0;
let block = true;
fetchMovieData();

async function fetchMovieData() {
  const nowPlayingMovies = await fetch(`${baseURL}cinemas/?countries=CA${API_KEY}`);
  const nowPlayingMoviesResponse = await nowPlayingMovies.json();
  const upComingMovies = await fetch(`${baseURL}movies?include_upcomings=true&countries=CA&release_date_from=${moment().add(1, "day")}${API_KEY}`);
  const upComingMoviesResponse = await upComingMovies.json();

  await Promise.all(upComingMoviesResponse.movies.map(async (movie) => {
    //await getAllUpcoming(movie.id);
  }));

  await Promise.all(nowPlayingMoviesResponse.cinemas.map(async (cinema) => {
    await getAllCinemaInMoviesId(cinema.id);
  }));

  await getAllMoviesUsingID();
  await getAndDisplayGenres();
  
  //await makeSlideShow();
}


async function getAllCinemaInMoviesId(cinemaId) {
  const cinema = await fetch(`${baseURL}movies/?cinema_id=${cinemaId}${API_KEY}`);
  const cinemaResponse = await cinema.json();

  cinemaResponse.movies.forEach((movie) => {
    if(allMovieIds.find(element => element === movie.id) === undefined){
      allMovieIds.push(movie.id);
    }
  });
}

async function getAllMoviesUsingID(){
  await Promise.all(allMovieIds.map(async (movieId) => {
    const movie = await fetch(`${baseURL}movies/${movieId}?fields=id,title,original_title,release_dates,imdb_id,poster_image,scene_images,synopsis,genres,crew,keywords,preview_id${API_KEY}`);
    const movieResponse = await movie.json();
    allMovies.push(movieResponse.movie);
  }));

  allMovies.forEach(movie => {
    displayMovie(movie, block, popularMovieHolder);
  })
}

function getAndDisplayGenres(){
  allMovies.forEach(element => {
    element.genres.forEach(genre => {
      if(genres.find(element => element === genre.name) === undefined){
        genres.push(genre.name);
      }
    });
  });
  
  genres.forEach(genre => {
    genreSelector.insertAdjacentHTML('beforeend', `
      <option value="${genre}">${genre}</option>
    `);
  });
}

async function displayMovie(movie, block, location){
  if(block){
    location.insertAdjacentHTML('beforeend',  `
      <li class='holder-movie'>
        <img src="${movie.poster_image.image_files[movie.scene_images[0].image_files.length - 1].url}" width="280">
        <ul>
          <p class="rating"><i class="fab fa-imdb"></i>&nbsp;9/10</p>
        </ul>
        <h3>${movie.title}</h3>
        </div>
      </li>
    `);
  } else {
    location.insertAdjacentHTML('beforeend',  `
      <li class='list-style'>
        <ul>
          <img src="${movie.poster_image.image_files[movie.scene_images[0].image_files.length - 1].url}" width="280">
          <ul>
            <p class="rating"><i class="fab fa-imdb"></i>&nbsp;9/10</p>
          </ul>
        </ul>
        <ul>
          <h1>${movie.title}</h1>
          <p>${movie.synopsis}</p>
          <p>Director - ${movie.crew[0].name}</p>
          <button>Order Tickets</butto>
        </ul>
      </li>
    `);
  }
}

// function makeSlideShow(){
//   $(document).ready(function() {
//     $('#autoWidth').lightSlider({
//         autoWidth:true,
//         loop:true,
//         enableTouch: true,
//         currentPagerPosition: "left",
//         keyPress: true,
//         freeMove: true,
//         onSliderLoad: function() {
//             $('#autoWidth').removeClass('cS-hidden');
//         } 
//     });  
//     $('.lSPager').remove();
//   });
// }

genreSelector.addEventListener('change', e => {
  popularMovieHolder.innerHTML = ``;
  if(e.target.value === "Genra"){
    allMovies.forEach(movie => {
      displayMovie(movie, block, popularMovieHolder);
    });
  } else {
    allMovies.forEach(movie => {
      movie.genres.forEach(genre => {
        if(genre.name === e.target.value){
          console.log(genre.name);
          displayMovie(movie, block, popularMovieHolder);
        }
      })
    });
  }
});

styleSelection.addEventListener('click', e => {
  const button = e.target.closest("Button");
  if(button.classList.contains('block') && !button.classList.contains('active')){
    document.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });
    button.className = 'active block';
    block = true;
    popularMovieHolder.innerHTML = ``;
    allMovies.forEach(movie => {
      displayMovie(movie, block, popularMovieHolder);
    });

  } else if(button.classList.contains('list') && !button.classList.contains('active')){
    document.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });
    button.className = 'active list';
    block = false;
    popularMovieHolder.innerHTML = ``;
    allMovies.forEach(movie => {
      displayMovie(movie, block, popularMovieHolder);
    });
  }
})