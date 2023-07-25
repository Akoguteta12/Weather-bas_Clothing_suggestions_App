const axios = require('axios');

const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "430adb4fdbmshd6a23c1be12cf3cp15d213jsn40b9d1fbea48",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "d32c2faf3cb8c4b5ad7bd07a7453a479"; 

// Function to get weather data
async function getWeatherData(cityName) {
  try {
    const response = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        q: cityName,
        appid: WEATHER_API_KEY,
        units: 'metric', // You can change this to 'imperial' for Fahrenheit.
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
}

// Function to get clothing suggestions based on weather conditions
function getClothingSuggestions(weatherData) {
  // ... The same clothing suggestion logic as mentioned in the previous example ...
}

// Usage example
(async () => {
  try {
    const cityName = "YourCityName"; // Replace with the city name you want to get weather data for.
    const weatherData = await getWeatherData(cityName);

    if (weatherData) {
      const clothingSuggestions = getClothingSuggestions(weatherData);
      console.log("Weather Data:", weatherData);
      console.log("Clothing Suggestions:", clothingSuggestions);
    } else {
      console.log("Weather data not available.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
