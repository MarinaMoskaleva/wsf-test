import React, { useState, useEffect } from 'react';
import './App.css';
import Search from '../Search/Search';
import api from '../../utils/Api'
import { KELVIN, imgUrl } from '../../utils/constants';
import ShowWeather from '../ShowWeather/ShowWeather';
import Navigation from '../Navigation/Navigation';
import ShowWeekWeather from '../ShowWeekWeather/ShowWeekWeather';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [weekWeatherData, setWeekWeatherData] = useState([]);
  const [nameCity, setNameCity] = useState('');
  const [isCurrentActive, setCurrentActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataGet, setDataGet] = useState(false);
  const [error, setError] = useState(false);

  function definePeriod(isCurActive){
    setCurrentActive(isCurActive);
  }

  function getWeekWeatherData(cityName, countryName, dailyArray){
    const weekData = [];
    for (let i = 0; i < 7; i++){
      const fullDate = new Date(dailyArray[i].dt * 1000);
      const weatherUpperCase = dailyArray[i].weather[0].description.charAt(0).toUpperCase() + dailyArray[i].weather[0].description.slice(1);
      const obj = {}
      obj.id = i;
      obj.city = cityName;
      obj.country = countryName;
      obj.date = `${fullDate.getFullYear()}-${fullDate.getMonth()+1 < 10 ? '0':''}${fullDate.getMonth()+1}-${fullDate.getDate() < 10 ? '0':''}${fullDate.getDate()}`;
      obj.icon = `${imgUrl}${dailyArray[i].weather[0].icon}@2x.png`;
      obj.temperature = Math.round(((dailyArray[i].temp.day+dailyArray[i].temp.eve+dailyArray[i].temp.morn+dailyArray[i].temp.night)*0.25 - KELVIN)*10)/10;
      obj.weather = weatherUpperCase;
      weekData.push(obj);
    }
    return weekData;
  }
  function getCity(nameData){
    setError(false);
    setNameCity(nameData);
  }
  useEffect(() => {
    if (nameCity) {
      setLoading(true);
      Promise.all([api.getCoordByCityName(nameCity), api.getWeekWeather(nameCity)])
      .then(([data, weekData])=>{
        const fullCountryName = new Intl.DisplayNames("en", {type: "region"}).of(data[0].country);
        setWeatherData({
          city: data[0].name, 
          country: fullCountryName,
          icon: `${imgUrl}${weekData.daily[0].weather[0].icon}@2x.png`,
          temperature: Math.round((weekData.daily[0].temp.day - KELVIN)*10)/10,
          weather: weekData.daily[0].weather[0].main
        });
        setWeekWeatherData(getWeekWeatherData(data[0].name, fullCountryName, weekData.daily));
        setLoading(false);
      })
      .catch((err)=>{
        setError(true);
        setLoading(true);
        console.log(err);
      });
      setNameCity('');
    }
  }, [nameCity]);
  useEffect(() => {
    if (!(weekWeatherData.lenght === 0) && !(Object.keys(weatherData).length === 0)){
      setDataGet(!loading)
    }
    
  }, [loading, weekWeatherData, weatherData]);

  return (
    <div className="root">
        <Search onClick={getCity}/>
        <Navigation togglePeriod={definePeriod}/>
        {error && <Error />}
        {loading && !error && <Preloader />}
        {isCurrentActive && dataGet && <ShowWeather weatherData={weatherData} />}
        {!isCurrentActive && dataGet && <ShowWeekWeather weekWeatherData={weekWeatherData} />}
    </div>
  );
}

export default App;
