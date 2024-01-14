import axios from "axios";
import React, { useState } from "react";


function App() {

  const [data, setData] = useState({});
  const [cityName, setCity] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter" && cityName) {
      
      axios.get(url).then((response) => {
        setData(response.data);
        /* console.log("data: ", response.data); */
      }, (error) => {
        console.error("Can't get weather: " , error)
      });

      setCity("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter location..."
          onKeyDown={searchLocation}
          value={cityName}
          type="text"
        />
      </div>
      {data.main && <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            <div className="temp">
              <h1>{data.main.temp.toFixed()}°c</h1>
            </div>
          </div>

          <div className="description">
            <p>{data.weather[0].main}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{data.main.feels_like.toFixed()}°c</p>
            <p>Feels Like</p>
          </div>
          <div className="humudity">
            <p className="bold">{data.main.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{data.wind.speed} MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default App;
