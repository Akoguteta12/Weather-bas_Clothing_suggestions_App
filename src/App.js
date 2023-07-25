import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = "d32c2faf3cb8c4b5ad7bd07a7453a479"; 
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [cityName, setCityName] = useState(" ");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(WEATHER_API_URL, {
        params: {
          q: cityName,
          appid: WEATHER_API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setWeatherData(null);
    }
  };

  const getClothingSuggestions = (weatherData) => {
    const weatherCondition = weatherData.weather[0].main;
    const temperature = weatherData.main.temp;

    // Implement the clothing suggestion logic based on weather conditions and temperature
    let clothingSuggestion = "Wear appropriate clothing based on weather conditions.";

    // if (weatherCondition === "Clear") {
      if (temperature >= 30) {
        clothingSuggestion = "Hot weather! Wear light and breathable clothing, and don't forget sunscreen!";
      } else if (temperature >= 20) {
        clothingSuggestion = "Sunny day! Wear a t-shirt and shorts or a summer dress.";
      } else if (temperature >= 10) {
        clothingSuggestion = "Warm day! Consider wearing a light jacket or sweater.";
      } else {
        clothingSuggestion = "It's chilly! Wear a warm jacket and layers.";
      }
    // } else if (weatherCondition === "Rain") {
      // if (temperature >= 10) {
      //   clothingSuggestion = "Rainy day! Bring an umbrella and wear a raincoat or waterproof jacket.";
      // } else {
      //   clothingSuggestion = "Cold and rainy! Wear a raincoat and warm layers.";
      // }
    //  if (weatherCondition === "Snow") {
    //   clothingSuggestion = "Cold day with snow! Bundle up with a heavy coat, hat, scarf, and gloves.";
    // } else {
    //   // For other weather conditions not handled above, provide a generic suggestion
    //   clothingSuggestion = "Weather condition is not specified. Wear suitable clothing.";
    // }

    return clothingSuggestion;
  };

  return (
    <div>
      <h1>Weather-Based Clothing Suggestions</h1>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData ? (
        <div>
          <h2>Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>{getClothingSuggestions(weatherData)}</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}

export default App;
