const seatsHolder = document.querySelector('.seats');
const occupied = document.querySelectorAll('.occupied');
const seatSelected = document.querySelector('#selected-seats');
const titleHeader = document.querySelector('.header-selection');
const seatsSelectedNameFooter = document.querySelector('#seatsHolder');
const continueButton = document.querySelector('#continue-button-seats');
continueButton.disabled = true;
const limit = localStorage.getItem('ticketLimit') - 1;
const alphabets = ['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let selected = 0;
const selectedSeatsNames = [];
titleHeader.textContent = `Select ${limit + 1} seats`;


occupied.forEach(element => {
  element.className = 'occupied inner-data';
  element.innerHTML = '<i class="fas fa-times"></i>';
});

seatsHolder.onclick = function(e){
  const seat = e.target.closest('LI');
  if(seat !== null) {
    const parent = seat.parentNode;
    if(seat.classList.contains('avaible') && !seat.classList.contains('hidden') && !seat.classList.contains('top-number')){
      if(seat.classList.contains('selected')){
        seat.classList.remove('selected');
        let seatNumber = `${seat.closest('ul').dataset.row}${alphabets[Array.prototype.indexOf.call(parent.children, seat)]}`;
        removeElement(selectedSeatsNames, seatNumber)
        selected--;
        updateDOM();
      } else {
        if(document.querySelectorAll('.selected').length <= limit){
          seat.classList.add('selected');
          let seatNumber = `${seat.closest('ul').dataset.row}${alphabets[Array.prototype.indexOf.call(parent.children, seat)]}`;
          selectedSeatsNames.push(seatNumber);
          selected++;
          updateDOM();
        }
      }
    }
  }
}

function updateDOM(){
  seatSelected.textContent = `${selected}`;
  seatsSelectedNameFooter.textContent = ``;
  selectedSeatsNames.forEach(element => {
    seatsSelectedNameFooter.insertAdjacentHTML('beforeend', `
      <li><p>${element}</p></li>
    `);
  });
  localStorage.setItem('seatsName', [selectedSeatsNames]);
  checkSeats();
}

function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
      array.splice(index, 1);
  }
  updateDOM();
}

function checkSeats(){
  if(limit === selected - 1){
    continueButton.disabled = false;
  } else {
    continueButton.disabled = true;
  }
}

continueButton.onclick = function(e) {
  window.location.href = "summary.html";
}
