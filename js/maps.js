const API_KEY = `Dh4moGRBVb2XMce2oeGDE77orRDGfDlo3h27Falv`;
const baseURL = `https://api-gate2.movieglu.com/`;
const container = document.querySelector('.titles-wrapper');

// container.onclick = e => {
//   const movie = e.target.closest('.movie')
  
//   if (movie !== null) {
//     test(movie.id);
//   }
// }

async function test(id) {

  
  const JSON = await response.json();
  // console.log(JSON);
  localStorage.setItem('movieJSON', JSON);
}

//const testingConst = localStorage.getItem('movieJSON');
//console.log(testingConst)