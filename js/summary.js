const continueBut = document.querySelector('.continue-button');
const test = document.querySelector('.testings');
const ticketAmount = document.querySelectorAll('.ticket-amount-num');
//const ticketNum = parseInt(ticketAmount.textContent);
// let ticketArray = [];
// ticketArray += ticketNum;

// continueBut.onclick = function() {
//   for(const ticket of ticketArray) {
//       if(ticket != 0) {
//         console.log("Not 0");
//     } else {
//       test.style.display = "block";
//       console.log("Works");
//     }
//   }
// }

let total = 0;

ticketAmount.forEach(element => {
  total += parseInt(element.textContent);
});

console.log(total);
