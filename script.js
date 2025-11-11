// ----- Static data (used before API call) -----
const weatherData = {
  location: { name: "Mississauga", country: "Canada" },
  current: {
    temperature: 8,
    feelslike: 4,
    humidity: 91,
    weather_descriptions: ["Moderate or heavy rain shower"],
    weather_icons: [
      "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0010_heavy_rain_showers.png"
    ]
  }
};

// ----- Function to update DOM -----
function displayWeather(data) {
  console.log(data)
  document.getElementById("cityName").textContent = data.location.name;
  document.getElementById("temperature").textContent = `${data.current.temperature}°C`;
  document.getElementById("feelslike").textContent = `${data.current.feelslike}°C`;
  document.getElementById("humidity").textContent = `${data.current.humidity}%`;
  document.getElementById("weatherDesc").textContent = data.current.weather_descriptions[0];
  document.getElementById("weatherIcon").src = data.current.weather_icons[0];
}


// ----- Modern way: Fetch API -----
async function getWeather() {
  const city = document.getElementById("cityInput").value || "Mississauga";
  const errorMsg = document.getElementById("errorMsg");

    fetch(`http://api.weatherstack.com/current?access_key=717854740b78b1565f435b3ce0d2eada&query=${city}`)
    .then(response => response.json()) //unwrap the evelope and give us a JS object
    .then(displayData => displayWeather(displayData))
    .catch(error => console.log(error)) //call the display weather with newly received info from ap

  }

// ----- (Old way) XMLHttpRequest Example -----
function getWeatherXMLHTTP(city) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.weatherapi.com/...&q=${city}`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayWeather(data);
    } else {
      console.error("Error fetching weather data");
    }
  };
  xhr.send();
}
// NOTE: We won’t call this. It’s just to show the old AJAX technique.