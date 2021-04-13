const ticket = document.querySelector('.ticket-color');
const adultDOM = document.querySelector('.adult-amount');
const childDOM = document.querySelector('.child-amount');
const elderDOM = document.querySelector('.elder-amount');
const continueButton = document.querySelector('.continue-button');
const noTicket = document.querySelector(`.no-tickets`);
const ticketAdder = document.querySelector('.ticket-color');
const adultTickets = document.querySelector(`.adult-ticket`);
const elderTickets = document.querySelector(`.elder-ticket`);
const childTickets = document.querySelector(`.child-ticket`);
const seatInfo = document.querySelector(`.seat-info`);
const selSeatsButton = document.querySelector(`.sel-seats`);
const main = document.querySelector('main');

let info = JSON.parse(localStorage.getItem('info'));
addParsedInfoToDOM();

function addParsedInfoToDOM(){
  main.insertAdjacentHTML('afterbegin',`
    <div class="movie-overlay">
      <div class="movie-summary">
        <div class="wrapper">
          <div class="summary-flex">
            <div class="summary-img">
              <img src="${info.moviePoster}" alt="noimage">
            </div>
            <div class="summary-info">
              <h2 class="h2-movie-name">${info.movieName} (${info.movieReleaseYear})</h2>
              <div class="summary-info-bottom">
              <p class="p-movie-address">${info.cinemaAddress}</p>
              <p class="covid-warning"><i class="fas fa-shield-virus"></i>COVID-19 Warning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="info-summary">
      <div class="wrapper">
        <div class="info-sum-card">
          <h2>${info.cinemaDayOfWeek}, ${info.cinemaMonth} ${info.cinemaDate} at ${info.cinemaTime}</h2>
          <div class="info-card-flex">
            <p>Reserved Seating</p>
            <p>&#183;</p>
            <p>No Passes</p>
            <p>&#183;</p>
            <p>Closed Caption</p>
          </div>
        </div>
      </div>
    </div>`
    )
}

document.querySelector('.movie-overlay').style.background =  `${info.movieScenePoster}`;
document.querySelector('.movie-overlay').style.backgroundRepeat = `no-repeat`;
document.querySelector('.movie-overlay').style.backgroundPosition = `top`;
document.querySelector('.movie-overlay').style.backgroundSize = `cover`;

let adult = 0;
let child = 0;
let elder = 0;

let totalTickets = adult + child + elder;
ticket.addEventListener('click', e => {
  if(e.target.classList.contains('adult-add')){
    adult++;
  } else if(e.target.classList.contains('adult-minus') && adult > 0){
    adult--;
  } else if(e.target.classList.contains('elder-add')){
    elder++;
  } else if(e.target.classList.contains('elder-minus') && elder > 0){
    elder--;
  } else if(e.target.classList.contains('child-add')){
    child++;
  } else if(e.target.classList.contains('child-minus') && child > 0){
    child--;
  }
  updateDOM();
})

function updateDOM(){
  adultDOM.textContent = adult;
  childDOM.textContent = child;
  elderDOM.textContent = elder;
  totalTickets = adult + child + elder;
  let Subtotal = ((12.99 * adult) + (9.99 * child) + (11.49 * elder)).toFixed(2);
    
  const ticketInformation = {
    ticketLimit: totalTickets,
    adultTicket: adult,
    childTicket: child,
    elderTicket: elder,
  };
  
  localStorage.setItem('user', JSON.stringify(ticketInformation));
}

continueButton.onclick = function() {
  if (totalTickets !== 0) {
    seatInfo.style.display = "block";
    noTicket.style.display = "none";
    ticketAdder.style.display = "none";
  } else {
    noTicket.style.display = "block";
  } 
}

document.querySelector('.sel-seats').onclick = (e) => {
  window.location.href='seats.html';
}

let seatsName = localStorage.getItem('seatsName');
let userTest = JSON.parse(localStorage.getItem('user'));

if(seatsName !== null){
  seatInfo.style.display = "block";
  document.querySelector('.seat-info p').style.display = "none";
  document.querySelector('.button-flex').style.display = "none";
  document.querySelector('.payment-info').style.display = "block";
  document.querySelector('.seat-selec').style.display = "block";
  document.querySelector('.payment').style.display = "block";
  document.querySelector('.user').style.display = "block";
    
  document.querySelector('.child-amount').textContent = userTest.childTicket;
  document.querySelector('.adult-amount').textContent = userTest.adultTicket;
  document.querySelector('.elder-amount').textContent = userTest.elderTicket;
  
  continueButton.style.display = "none";
  document.querySelector('.payment-button-css').style.display = "block";
  
  seatsName.split(",").forEach(element => {
    document.querySelector('.seat-selec-flex').insertAdjacentHTML('afterbegin',
      `<p>${element}</p>`
    )    
  });
} else {
  document.querySelector('.seat-selec').style.display = "none";
}



