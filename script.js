const apiKey = "7fcb0f048d7ea3bcb3c5759a021b1b28"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const cityElem = document.querySelector(".city");
  const tempElem = document.querySelector(".temp");
  const descElem = document.querySelector(".description");
  const humidityElem = document.querySelector(".humidity");
  const windElem = document.querySelector(".wind");
  const iconElem = document.querySelector(".icon");

  // Show loading
  cityElem.innerText = "Loading...";
  tempElem.innerText = "";
  descElem.innerText = "";
  humidityElem.innerText = "";
  windElem.innerText = "";
  iconElem.style.display = "none";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityElem.innerText = data.name;
    tempElem.innerText = `Temperature: ${data.main.temp}°C`;
    descElem.innerText = `Weather: ${data.weather[0].description}`;
    humidityElem.innerText = `Humidity: ${data.main.humidity}%`;
    windElem.innerText = `Wind: ${data.wind.speed} m/s`;

    // Set icon
    const iconCode = data.weather[0].icon;
    iconElem.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconElem.style.display = "block";
    iconElem.alt = data.weather[0].description;

  } catch (error) {
    cityElem.innerText = "Error: " + error.message;
    tempElem.innerText = "";
    descElem.innerText = "";
    humidityElem.innerText = "";
    windElem.innerText = "";
    iconElem.style.display = "none";
  }
}
