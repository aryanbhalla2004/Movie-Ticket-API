async function fetchInfo(){
  const response = await fetch('https://api-gate2.movieglu.com/filmsNowShowing/?n=25', {
    headers: {
      'x-api-key': 'Dh4moGRBVb2XMce2oeGDE77orRDGfDlo3h27Falv',
      'client': 'ZUWS',
      'Authorization': 'Basic WlVXUzo2OUdlOHFLMnlUQVY=',
      'territory': 'CA',
      'api-version': 'v200',
      'device-datetime': '2021-04-05T20:33:18.851Z',
      'geolocation': '43.6934;-79.4124'
    } 
  });

  const json = await response.json();
  //! movies That are playing in the theater
  console.log(json); 
}

fetchInfo();