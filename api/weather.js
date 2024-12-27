import { apiKey } from "@/constants";

// Endpoint for weather forecast
const forecastEndpoint = ({ cityName, days }) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=${days}&aqi=no&alerts=no`;

// Endpoint for location search
const locationsEndpoint = ({ cityName }) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}`;

// Generic API call
const apiCall = async (endpoint) => {
  try {
    const response = await fetch(endpoint, { method: "GET" });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error.message);
    return null;
  }
};

export const fetchWeatherForecast = (params) => {
  const forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchLocations = (params) => {
  const locationUrl = locationsEndpoint(params);
  return apiCall(locationUrl);
};
