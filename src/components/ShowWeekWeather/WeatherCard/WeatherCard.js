import React from 'react';
import './WeatherCard.css'

function WeatherCard({ico, temp, weather, date}) {
    return (
        <section className="card">
            <img className="card__ico" src={ico} alt={`${weather}-ico`}/>
            <p className="card__text">Avg Temp:</p>
            <p className="card__text">{temp}&deg;C</p>
            <p className="card__text">{weather}</p>
            <p className="card__text-date">{date}</p>
        </section>
    );
}

export default WeatherCard;