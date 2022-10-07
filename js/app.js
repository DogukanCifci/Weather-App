//get the infos
let cityName;
const button = document.querySelector(".btn");
const display = document.querySelector(".kapsayici-div");
let cities = [];

const getInfos = (cityName) => {
  console.log(cityName);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d9b53b6af071e91297e071e6ffc3e133&units=metric&lang=de&exclude=hourly`
  )
    .then((response) => response.json())
    .then((data) => pressDisplay(data));
  document.querySelector(".inp-text").value = "";
};

button.onclick = () => {
  cityName = document.querySelector(".inp-text").value;
  cityName = cityName.toUpperCase().trim(); //sagdan soldan bosluklu yazilirsa o bosluklari kaldirmasi icin
  if (!cities.includes(cityName)) {
    document.querySelector(".samecity-display").textContent = "";
    cities.push(cityName);
    console.log(cities);
    getInfos(cityName);
  } else {
    document.querySelector(
      ".samecity-display"
    ).textContent = `You already know the weather for ${cityName}. Please search for the
      another city 🌏`;
    setTimeout(() => {
      document.querySelector(".samecity-display").textContent = "";
    }, 3000);
    document.querySelector(".inp-text").value = "";
  }
};

document.querySelector(".inp-text").onkeydown = (tus) => {
  if (tus.keyCode === 13) {
    button.onclick();
  }
};

//ICONS PART
const pressDisplay = (city) => {
  console.log(city);
  if (city.message == "city not found") {
    document.querySelector(
      ".samecity-display"
    ).textContent = `${cityName} not found!`;
    document.querySelector(".inp-text").value = "";
    setTimeout(() => {
      document.querySelector(".samecity-display").textContent = "";
    }, 3000);
  } else {
    weather = Object.values(city.weather)[0]["description"];
    console.log(weather);
    display.innerHTML += `<div class="bg-light">
    <h2 class="sehirAdi">${
      city.name
    } <sup class"country-code" style="background-color:orange;  border-radius:50%;">${
      city.sys.country
    }</sup></h2>
    <h5 class="derece">${Math.ceil(
      city.main.temp //fetchdeki linkte units=metric sayesinde kelvin direk celciusa döndü
    )}<sup class="celcius">°C</sup></h5>
    <p><img src="http://openweathermap.org/img/wn/${
      Object.values(city.weather)[0].icon
    }@4x.png"></p>
    <p class="situation">${Object.values(city.weather)[0].description}</p>
  </div>`;
    console.log(`${Object.values(city.weather)[0].icon}`);
  }
};
