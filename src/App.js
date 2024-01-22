import './App.css';
import logo from './logo.png';
import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (city !== '') {
        setLoading(true);
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=05808815743b4fddb6b143830230907&q=${city}&aqi=no`
        );
        const data = await response.json();
        setWeather(data);
        setLoading(false);
        console.log(data);
      }
    };

    fetchWeather();
  }, [city]);

  const search = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCity('');
    }
  };

  return (
    <div className="weather-app">
      <header className="weather-app-header">
        <img src={logo} className="weather-app-logo" alt="logo" />
      </header>

      <div className="right-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={search}
            name="search"
          />
          <button type="submit" form="search">
          </button>
        </div>
        <div className="weather-container">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="weather">
              <div className="weather-date">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })
                }
              </div>
              <div className="line">
              </div>
              <div class="weather-details"> <span>weather details</span>
                <div class="weather-details-item">
                  <div class="weather-details-title">Wind</div>
                  <div class="weather-details-value">{weather.current?.wind_kph} km/h</div>
                </div>
                <div class="weather-details-item">
                  <div class="weather-details-title">Humidity</div>
                  <div class="weather-details-value">{weather.current?.humidity} %</div>
                </div>
                <div class="weather-details-item">
                  <div class="weather-details-title">Precipitation</div>
                  <div class="weather-details-value">{weather.current?.precip_mm} mm</div>
                </div>
                <div class="weather-details-item">
                  <div class="weather-details-title">Pressure</div>
                  <div class="weather-details-value">{weather.current?.pressure_mb} mb</div>
                </div>
                <div class="weather-details-item">
                  <div class="weather-details-title">Visibility</div>
                  <div class="weather-details-value">{weather.current?.vis_km} km</div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div >

      <div className="bottom-container">

        <div className="weather-location">
          {weather.location?.name} <span>{weather.location?.country}</span>
        </div>
        <div className="weather-temperature">
          <span>{weather.current?.temp_c}</span>°C
        </div>
        <div className="weather-condition">
          {weather.current?.condition?.text}
          {weather.current?.condition?.icon && (
            <img
              src={weather.current?.condition?.icon}
              alt="weather icon"
            />
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
