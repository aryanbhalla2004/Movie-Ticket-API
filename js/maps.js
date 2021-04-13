const API_KEY = "&apikey=5xiCFSSuCw4M8xsqcUviXJrp69gzzgEp";
const moviedbAPI_KEY = '00f7b7a847b0f2f4e32b0bc9490b1c45';
const baseURL = `https://api-gate2.movieglu.com/`;
const moviedbBaseURL = 'https://api.themoviedb.org/3/';
const baseURLInternational = "https://api.internationalshowtimes.com/v4/";

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
let genres = [];

let user = JSON.parse(localStorage.getItem('movie'));

getMovieDetails(user.movieId);

async function getMovieDetails(movieId) {
  const response = await fetch(`${baseURLInternational}movies/${movieId}?fields=id,title,original_title,release_dates,imdb_id,poster_image,scene_images,synopsis,genres,crew,keywords,preview_id${API_KEY}`);
  const JSON = await response.json();
  
  if(JSON.movie.genres.length > 1) {
    JSON.movie.genres.forEach(element => {
      genres.push(element.name);   
    });
  }
  
  let description = ``;
  if(JSON.movie.synopsis === null){
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus facilis voluptas, pariatur aliquid iusto ducimus sit, dolorum cumque mollitia perspiciatis minus? Debitis doloribus vitae unde, quis optio voluptas laboriosam repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus facilis voluptas, pariatur aliquid iusto ducimus sit, dolorum cumque mollitia perspiciatis minus? Debitis doloribus vitae unde, quis optio voluptas laboriosam repellat?";
  } else {
    description = JSON.movie.synopsis;
  }
  console.log();

  main.insertAdjacentHTML('beforebegin', `
    <div class="container-fluid p-0">
      <div class="background">
        <div class="background-content">
          <span>${genres.join(' | ')}</span>
          <h1 class="display-2">${JSON.movie.title}</h1>
          <p>${description}</p>
          <span class="details"> <span class="release-date">${JSON.movie.release_dates[Object.keys(JSON.movie.release_dates)[0]][0].date.split('-')[0]}</span> | DIRECTOR: <i class="text-secondary">${JSON.movie.crew[0].name}</i> | RUNTIME <i class="text-secondary">1hr 20mins</i></span>
          <div class="btn-holder">
            <button class="btn watch-trailers">WATCH TRAILER <i class="fa fa-play"></i></button>
            <button class="btn">BUY TICKETS</button>
          </div>
        </div>
      </div>
    </div>`);
  
  document.querySelector('.background').style.background =  `url(${JSON.movie.scene_images[0].image_files[3].url})`;
  document.querySelector('.background').style.backgroundRepeat = `no-repeat`;
  document.querySelector('.background').style.backgroundPosition = `center`;
  document.querySelector('.background').style.backgroundSize = `cover`;
  document.querySelector('.background').style.height = `100vh`;
  
  document.querySelector('.background-content').addEventListener('click', function(e){
    const item = e.target.closest('.watch-trailers');
    if(item !== null) {
      addTrailers();
    };
  });
}

async function addTrailers() {
  const response = await fetch(`${moviedbBaseURL}movie/${user.imbdId}/videos?api_key=${moviedbAPI_KEY}&type="trailer"&language=en-US`);
  const JSON = await response.json();
  main.insertAdjacentHTML('afterbegin',`<iframe width="100%" height=750px" src="https://www.youtube.com/embed/${JSON.results[0].key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
}

getAllShowTimes(user.movieId);
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
          document.getElementById(`${showTime.cinema_id}`).insertAdjacentHTML('beforeend', `
            <div class="showTimes">${new Date(showTime.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          `);
        }   
      });
    });
  }
}

async function testyIRES(cinemaID) {  
  const response = await fetch(`https://api.internationalshowtimes.com/v4/cinemas?cinema_id=${cinemaID}${API_KEY}`);
  const JSON = await response.json();
  JSON.cinemas.forEach(element => {
    if(element.id === cinemaID){
     cinemasContainer.insertAdjacentHTML('beforeend', `
     <div class="cinema-details">
        <h2 class="cinema-name">${element.name}</h2>
        <h4>${element.location.address.display_text}</h4>
        <div class="showTimes-list" id="${element.id}">
        </div>
      </div>`)
    }
  });
} 


cinemasContainer.onclick = (e) => {
  const item = e.target.closest('.showTimes');

  if(item !== null){
    const dataRequired = {
      cinemaName: item.closest('.cinema-details').querySelector("h2").textContent,
      cinemaAddress: item.closest('.cinema-details').querySelector("h4").textContent,
      cinemaTime: item.textContent,
      cinemaDate: document.querySelector('.selectedSelected .showTimeDate').textContent,
      movieName: document.querySelector('.display-2').textContent,
      movieReleaseYear: document.querySelector('.release-date').textContent,
      movieScenePoster: document.querySelector('.background').style.backgroundImage,
    };

    localStorage.setItem('info', JSON.stringify(dataRequired));
    window.location.href='summary.html';
  }
}