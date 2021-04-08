const span = document.getElementsByTagName(`span`);
const div = document.getElementsByClassName(`movie-card`);

let i = 0;

span[1].onclick = ()=>{
  i++;
  for(let x of div) {
    if(i === 0) {
      x.style.left = "0px";
    }
    if(i === 1) {
      x.style.left = "-740px";
    }
    if(i === 2) {
      x.style.left = "-1480px";
    }
    if(i === 3) {
      x.style.left = "-2220px";
    }
    if(i === 4) {
      x.style.left = "-2960px";
    }
    if(i > 4) {
      i=4;
    }
  }
}

span[0].onclick = ()=>{
  i--;
  for(let x of div) {
    if(i === 0) {
      x.style.left = "0px";
    }
    if(i === 1) {
      x.style.left = "-740px";
    }
    if(i === 2) {
      x.style.left = "-1480px";
    }
    if(i === 3) {
      x.style.left = "-2220px";
    }
    if(i < 0) {
      i=0;
    }
  }
}
