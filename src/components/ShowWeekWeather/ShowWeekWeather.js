import React from 'react';
import './ShowWeekWeather.css'
import WeatherCard from './WeatherCard/WeatherCard';

function ShowWeekWeather({weekWeatherData}) {
    return (
        <section className="show-week">
            <h2 className="show-week__name">{weekWeatherData[0].city}</h2>
            <h3 className="show-week__country">{weekWeatherData[0].country}</h3>
            <div className="show-week__weather-list">
            {weekWeatherData.map((item) => (
                    <div className="show-week__element" key={item.id}>
                        <WeatherCard ico={item.icon} temp={item.temperature} weather={item.weather} date={item.date}/>
                    </div>
                ))}

            </div>
        </section>
    );
}

export default ShowWeekWeather;