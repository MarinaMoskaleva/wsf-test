import React, { useState } from 'react';
import './Search.css'

function Search({onClick}) {
    const [city, setCity] = useState('');
    function handleCityChange(e){
        setCity(e.target.value);
    }
    function handleButtonSearch(e){
        e.preventDefault();
        onClick(city);
    }
    return (
        <section className="search">
            <form className="search__form">
                <input 
                    className="search__input" 
                    placeholder='Enter the city name'
                    onChange={handleCityChange}
                    value={city}
                ></input>
                <button className="search__button" onClick={handleButtonSearch} type="submit"></button>
            </form>
        </section>
    );
}

export default Search;