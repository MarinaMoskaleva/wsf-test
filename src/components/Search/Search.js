import React, { useState, useEffect } from 'react';
import './Search.css'

function Search({onClick}) {
    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState('The input field must not be empty.');
    const [cityDirty, setCityDirty] = useState(false);
    const [formValid, setFormValid] = useState(false);
    function handleCityChange(e){
        setCity(e.target.value);
        if (e.target.value.length < 2){
            setCityError('The field must be filled with at least 2 characters.');
        } else {
            setCityError('');
        }
    }
    function handleButtonSearch(e){
        e.preventDefault();
        
        onClick(city);
    }
    function blurHandler(e) {
        if (e.target.name === 'name') {
            setCityDirty(true);
        }
    }
    useEffect(()=>{
        setFormValid(!cityError);
    }, [cityError]);
    return (
        <section className="search">
            <form className="search__form">
            <label className="search__form-field">
                    <input
                        type="text"
                        className="search__input"
                        name="name"
                        required
                        placeholder="Enter the city name"
                        minLength="2"
                        onChange={handleCityChange}
                        value={city}
                        onBlur={blurHandler}
                    />
                    <span className={`search__error ${(cityDirty && cityError) && 'search__error_show'}`}>{cityError}</span>
                </label>
                <button className="search__button" onClick={handleButtonSearch} type="submit" disabled={!formValid}></button>
            </form>
        </section>
    );
}

export default Search;