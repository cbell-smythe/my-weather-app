function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  let amPm = date.getHours() >= 12 ? "PM" : "AM";

  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} ${amPm}`;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector(
    "#current-weather-description"
  );
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let feelslikeElement = document.querySelector("#feels-like-temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  sunriseElement.innerHTML = sunPosition(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = sunPosition(response.data.sys.sunset * 1000);
  feelslikeElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function sunPosition(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours > 12) {
    hours = date.getHours() - 12;
  }
  let amPm = date.getHours() >= 12 ? "PM" : "AM";

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes} ${amPm}`;
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Paris");
