"use strict"
import { getWeatherData } from "./forecast_data.js";

const cityInput = document.querySelector('.weather__search-input');
const cityDisplay = document.querySelector('.weather__localization');
const tempDisplay = document.querySelector('.weather__temperature');
const iconDisplay = document.querySelector('.weather__img');
const descriptionDisplay = document.querySelector('.weather__description');
const weatherDisplay = document.querySelector('.weather__display-container');

weatherDisplay.style.display = 'none';

const updateUI = ((data) => {
  const { clouds, name } = data;
  const { temp: temperature} = data.main;
  const { description: weatherDescription, icon: iconCode } = data.weather[0];
  const temperatureCelsius = (temperature - 273.15).toFixed(2);

  iconDisplay.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  descriptionDisplay.textContent =  weatherDescription.toUpperCase();
  tempDisplay.textContent = `${temperatureCelsius} °C`;
  cityDisplay.textContent = name;
})

cityInput.addEventListener('keypress', (e) => {
  if(e.keyCode === 13 || e.code === 'Enter') {
    e.preventDefault();
    const cityName = cityInput.value;
    
    getWeatherData(cityName)
    .then((data) => {
      cityInput.value = '';
      weatherDisplay.style.display = 'flex';
      updateUI(data);
    })
    .catch((err) => {
      console.log('Error', err.message);
    })
  }
})

