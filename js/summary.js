const ticket = document.querySelector('.ticket-color');
const adultDOM = document.querySelector('.adult-amount');
const childDOM = document.querySelector('.child-amount');
const seniorDOM = document.querySelector('.elder-amount');
const continueButton = document.querySelector('.continue-button');
const testing = document.querySelector(`.testings`);
let adult = 0;
let child = 0;
let senior = 0;
let totalTickets = adult + child + senior;
ticket.addEventListener('click', e => {
  if(e.target.classList.contains('adult-add')){
    adult++;
  } else if(e.target.classList.contains('adult-minus') && adult > 0){
    adult--;
  } else if(e.target.classList.contains('elder-add')){
    senior++;
  } else if(e.target.classList.contains('elder-minus') && senior > 0){
    senior--;
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
  seniorDOM.textContent = senior;
  let Subtotal = ((12.99 * adult) + (9.99 * child) + (11.49 * senior)).toFixed(2);
  localStorage.setItem('ticketLimit', totalTickets);
  localStorage.setItem('adultTicket', adult);
  localStorage.setItem('child', child);
  localStorage.setItem('senior', senior);
}

continueButton.onclick = function() {
  if (totalTickets === 0) {
    console.log('data');
    testing.style.display = "block";
  }
}

