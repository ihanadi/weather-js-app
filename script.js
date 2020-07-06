let api = {
  key: '99212324d7afa248752d9c6c79699ea1',
  base: 'https://api.openweathermap.org/data/2.5/'
}

let searchInput = document.querySelector('.search-input input');

searchInput.addEventListener('keypress', setQuery);

function setQuery(eve){
  if(eve.keyCode == 13){
    getResults(searchInput.value)
  }
}

function getResults(e){
  fetch(`${api.base}weather?q=${e}&units=metric&APPID=${api.key}`)
    .then(weather =>{
      return weather.json();
    }).then(displayResults);
}

function displayResults(e){
  console.log(e);
  let city = document.querySelector('.location .city');
  city.innerText = `${e.name}, ${e.sys.country}`
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerText = `${Math.floor(e.main.temp)}°c`;

  let WeatherMain = document.querySelector('.current .Weather');
  WeatherMain.innerText = `${e.weather[0].main}`;

  let hiLow = document.querySelector('.current .hi-low');
  hiLow.innerText = `${e.main.temp_min}°c / ${e.main.temp_max}°c`;
}

function dateBuilder(d){
  months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}