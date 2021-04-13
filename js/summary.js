const ticket = document.querySelector('.ticket-color');
const adultDOM = document.querySelector('.adult-amount');
const childDOM = document.querySelector('.child-amount');
const elderDOM = document.querySelector('.elder-amount');
const continueButton = document.querySelector('.continue-button');
const noTicket = document.querySelector(`.no-tickets`);
const ticketAdder = document.querySelector('.ticket-color');
const selectedTickets = document.querySelector(`.selec-tickets`);
const adultTickets = document.querySelector(`.adult-ticket`);
const elderTickets = document.querySelector(`.elder-ticket`);
const childTickets = document.querySelector(`.child-ticket`);
const seatInfo = document.querySelector(`.seat-info`);
const selSeatsButton = document.querySelector(`.sel-seats`);

selectedTickets.style.display = "none";

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
  localStorage.setItem('ticketLimit', totalTickets);
  localStorage.setItem('adultTicket', adult);
  localStorage.setItem('child', child);
  localStorage.setItem('elder', elder);
}

continueButton.onclick = function() {
  if (totalTickets === 0) {
    console.log(totalTickets);
    noTicket.style.display = "block";
  } else {
    selectedTickets.style.display = "block";
    noTicket.style.display = "none";
    ticketAdder.style.display = "none";
    updateAmount();
  } 
}


function updateAmount() {
  if(child === 1) {
  childTickets.innerHTML = `${child} Child Ticket`;
  } else if(child === 0) {
    childTickets.innerHTML = `${child} Child Tickets`
  } else {
    childTickets.innerHTML = `${child} Child Tickets`;
  } 

  if(adult === 1) {
    adultTickets.innerHTML = `${adult} Adult Ticket`;
    } else if(child === 0) {
      adultTickets.innerHTML = `${adult} Adult Tickets`
    } else {
      adultTickets.innerHTML = `${adult} Adult Tickets`;
    } 
  
    if(elder === 1) {
      elderTickets.innerHTML = `${elder} Elder Ticket`;
      } else if(elder === 0) {
        elderTickets.innerHTML = `${elder} Elder Tickets`
      } else {
        elderTickets.innerHTML = `${elder} Elder Tickets`;
    } 

    seatInfo.style.display = "block";
}


