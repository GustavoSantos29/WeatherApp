const apiKey = "e03c844533c4af73ba91c0ff800cac0d";
const apiContryURL = "https://flagsapi.com/US/flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

//Elements
const weatherContainer = document.querySelector("#weather-data");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const countryElement = document.querySelector("#country");
const errorElement = document.querySelector("#error");
const errorContainer = document.querySelector("#error-container");
//Functions

const getWeatherData = async (city) => {
  try {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    if (res.status === 404) {
      throw new Error(
        "Ops ! Localização invalida"
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
};

const showWeather = async (city) => {
  try {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute(
      "src",
      `https://flagsapi.com/${data.sys.country}/flat/64.png`
    );
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}Km/h`;

    weatherContainer.classList.remove("hide");
    errorContainer.classList.add("hide");
  } catch (error) {
    console.log("deu erro", error);
    errorElement.innerText = error.message;
    console.log(error.innerText);
    errorContainer.classList.remove("hide");
    weatherContainer.classList.add("hide");
  }
};

//Events

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeather(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeather(city);
  }
});
