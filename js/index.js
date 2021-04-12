const baseURL = "https://api.internationalshowtimes.com/v4/";
const API_KEY = "&apikey=5xiCFSSuCw4M8xsqcUviXJrp69gzzgEp";
const topSliderMovies = document.querySelector(".cs-hidden");
const popularMovieHolder = document.querySelector('.select-movie');
const genreSelector = document.querySelector('.genra-selector');
const styleSelection = document.querySelector('.header-top-selection');
const searchBar = document.querySelector('#search-bar');
const searchResults = document.querySelector('.results');
const searchName = document.querySelector('.search-name');
const movieResultsHolder = document.querySelector('.movie-results');
const searchButton = document.querySelector('.search-button');
const allMovieIds = [];
const allMovies = [];
const genres = [];
let int = 0;
let block = true;
fetchMovieData();

async function fetchMovieData() {
  const nowPlayingMovies = await fetch(`${baseURL}cinemas/?countries=CA${API_KEY}`);
  const nowPlayingMoviesResponse = await nowPlayingMovies.json();
  const upComingMovies = await fetch(`${baseURL}movies?include_upcomings=true&countries=CA&release_date_from=${moment().add(1, `days`)}${API_KEY}`);
  const upComingMoviesResponse = await upComingMovies.json();

  await Promise.all(upComingMoviesResponse.movies.map(async (movie) => {
    await getAllUpcoming(movie.id);
  }));

  await Promise.all(nowPlayingMoviesResponse.cinemas.map(async (cinema) => {
    await getAllCinemaInMoviesId(cinema.id);
  }));

  await getAllMoviesUsingID();
  await getAndDisplayGenres();
  
  await makeSlideShow();
  loader();
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
    const movie = await fetch(`${baseURL}movies/${movieId}?fields=id,title,imdb_id,poster_image,scene_images,synopsis,genres,crew,ratings${API_KEY}`);
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
  let poster = '';
  if(movie.scene_images === null){
    poster = 'images/placeholder.jpeg';
  } else {
    poster = `${movie.scene_images[0].image_files[movie.scene_images[0].image_files.length - 1].url}`;
  }

  if(block === true){
    location.insertAdjacentHTML('beforeend',  `
      <li class='holder-movie' data-movieid="${movie.id}" data-movieimbd="${movie.imdb_id}">
        <img src="${movie.poster_image.image_files[movie.scene_images[0].image_files.length - 1].url}" width="300">
        <ul>
          <p class="rating"><i class="fab fa-imdb"></i>&nbsp;${movie.ratings.imdb.value}/10</p>
        </ul>
        <h3>${movie.title}</h3>
        </div>
      </li>
    `);
  } else if(block === false){
    location.insertAdjacentHTML('beforeend',  `
      <li class='list-style' data-movieid="${movie.id}" data-movieimbd="${movie.imdb_id}">
        <ul>
          <img src="${movie.poster_image.image_files[movie.scene_images[0].image_files.length - 1].url}" width="280">
          <ul>
            <p class="rating"><i class="fab fa-imdb"></i>&nbsp;${movie.ratings.imdb.value}/10</p>
          </ul>
        </ul>
        <ul>
          <h1>${movie.title}</h1>
          <p>${movie.synopsis}</p>
          <p>Director - ${movie.crew[0].name}</p>
          <button>Order Tickets</button>
        </ul>
      </li>
    `);
  } else if(block === 'top-style') {
    location.insertAdjacentHTML('beforeend',  `
      <li>
        <div class="showcase-box">
          <img src="${poster}" width="650" height="366.66">
          <ul>
            <h1>${movie.title}</h1>
            <p>${movie.synopsis}</p>
            <h3>COMING SOON</h3>
          </ul>
        </div>
      </li>
    `);
  }
}

async function getAllUpcoming(movieId){
  const movie = await fetch(`${baseURL}movies/${movieId}?fields=id,title,original_title,release_dates,imdb_id,poster_image,scene_images,synopsis,genres,crew,keywords,preview_id${API_KEY}`);
  const movieResponse = await movie.json();
  displayMovie(movieResponse.movie, 'top-style', topSliderMovies);
}

function makeSlideShow(){
  $(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth:true,
        loop:true,
        enableTouch: true,
        currentPagerPosition: "left",
        keyPress: true,
        freeMove: true,
        autoWidth: true,
        item: 2,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        } 
    });  
    $('.lSPager').remove();
  });
}

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
  if(button.classList.contains('block') && !button.classList.contains('active-btn')){
    document.querySelectorAll('.active-btn').forEach(element => {
      element.classList.remove('active-btn');
    });

    button.className = 'active-btn block';
    block = true;
    popularMovieHolder.innerHTML = ``;
    allMovies.forEach(movie => {
      displayMovie(movie, block, popularMovieHolder);
    });

  } else if(button.classList.contains('list') && !button.classList.contains('active-btn')){
    document.querySelectorAll('.active-btn').forEach(element => {
      element.classList.remove('active-btn');
    });
    button.className = 'active-btn list';
    block = false;
    popularMovieHolder.innerHTML = ``;
    allMovies.forEach(movie => {
      displayMovie(movie, block, popularMovieHolder);
    });
  }
});

searchBar.addEventListener('keyup', e => {
  if(e.target.value !== ""){
    searchResults.style.display = "flex";
    searchName.textContent = `${e.target.value}`;
    searchMovies(e.target.value);
  } else {
    searchResults.style.display = "none";
    searchName.textContent = '';
  }
});


async function searchMovies(name){
  const movies = await fetch(`${baseURL}movies?search_query=${name}&search_field=title&lang=en${API_KEY}`);
  const JSON = await movies.json();
  movieResultsHolder.innerHTML = ``;
  JSON.movies.forEach(async (element) => {
    movieResultsHolder.insertAdjacentHTML('beforeend', `
      <li data-movieid="${element.id}" ><a>${element.title}</a></li>
    `);
  })
}


searchButton.addEventListener('click', e => {
  console.log(searchBar.style.display === "block");
  if(searchBar.style.display === "block"){
    searchBar.style.animation = 'out 1s';
    searchButton.style.backgroundColor = "#e70914";
    searchButton.style.color = "#fff";
    searchButton.innerHTML = `<i class="fas fa-search"></i>`;
    searchResults.style.display = "none";
    setTimeout(() => {
      searchBar.style.display = "none";
      searchBar.style.width = "0px";
      searchButton.style.borderTopLeftRadius = "50%";
      searchButton.style.borderBottomLeftRadius = "50%";
    }, 1000);
  } else {
    searchBar.style.display = "block";
    searchBar.style.animation = 'in 1s';
    searchBar.style.width = "500px";
    searchResults.style.display = "flex";
    searchButton.style.borderTopLeftRadius = 0;
    searchButton.style.borderBottomLeftRadius = 0;
    searchButton.innerHTML = `<i class="far fa-times-circle"></i>`;
    searchBar.focus();
  }
});


movieResultsHolder.addEventListener('click', async (e) => {
  let id = e.target.closest('li').dataset.movieid;
  const movies = await fetch(`${baseURL}movies/${id}?fields=id,title,original_title,release_dates,imdb_id,poster_image,scene_images,synopsis,genres,crew,keywords,preview_id${API_KEY}`);
  const movieResponse = await movies.json();
  let imbd = movieResponse.movie.imdb_id;
  let movie = {movieId: id, imbdId: imbd}
  localStorage.setItem('movie', JSON.stringify(movie));
  window.location.href = "details.html";
})

popularMovieHolder.addEventListener('click', e => {
  let id = e.target.closest('li').dataset.movieid;
  let imbd = e.target.closest('li').dataset.movieimbd;
  let movie = {movieId: id, imbdId: imbd}
  localStorage.setItem('movie', JSON.stringify(movie));
  window.location.href = "details.html";
});

function loader(){
  document.querySelector('.loader').style.display = "none";
  document.querySelector('.real-content').style.display = "block";
}