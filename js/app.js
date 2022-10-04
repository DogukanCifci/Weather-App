//get the infos
let cityName;
const button = document.querySelector(".btn");
const display = document.querySelector(".kapsayici-div");
const getInfos = (cityName) => {
  console.log(cityName);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d9b53b6af071e91297e071e6ffc3e133`
  )
    .then((response) => response.json())
    .then((data) => pressDisplay(data));
};

button.onclick = () => {
  cityName = document.querySelector(".inp-text").value;
  getInfos(cityName);
};

document.querySelector(".inp-text").onkeydown = (tus) => {
  if (tus.keyCode === 13) {
    button.onclick();
  }
};

const pressDisplay = (city) => {
  console.log(city);
  display.innerHTML += `<div class="bg-light">
  <p class="sehirAdi">${city.name}</p>
  <h3 class="derece">${Math.ceil(
    city.main.temp - 273.15
  )}<sup class="celcius">°C</sup></h3>
  <p><i class="fa-solid fa-cloud"></i></p>
  <p class="situation">${Object.values(city.weather)[0].description}</p>
</div>`;
  console.log(Object.values(city.weather)[0]["description"]);
};
