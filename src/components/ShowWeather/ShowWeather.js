import React from 'react';
import './ShowWeather.css'

function ShowWeather({weatherData}) {
    return (
        <section className="show-weather">
            <h2 className="show-weather__name">{weatherData.city}</h2>
            <h3 className="show-weather__country">{weatherData.country}</h3>
            <img className="show-weather__ico" src={weatherData.icon} alt={`${weatherData.weather}-ico`}/>
            <p className="show-weather__text">{weatherData.temperature}&deg;C</p>
            <p className="show-weather__text">{weatherData.weather}</p>
        </section>
    );
}

export default ShowWeather;