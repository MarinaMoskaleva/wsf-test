import {baseUrl, apiId} from './constants.js';

class Api {
    constructor(baseUrl, apiId) {
        this._baseUrl = baseUrl;
        this._apiId = apiId;
    }

    _getResponseData(res) {
      if (res.ok) {
       return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getCoordsByCityName(city){
      return fetch(`${this._baseUrl}/geo/1.0/direct?q=${city}&appid=${this._apiId}`)
      .then(this._getResponseData);
    }
    getWeather(city){
      return this.getCoordsByCityName(city)
      .then((data)=>{
        return fetch(`${this._baseUrl}/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=${this._apiId}`).then(this._getResponseData);
      })
      .catch((err)=>{
          console.log(err);
      });
    }

}

const api = new Api(baseUrl, apiId);

export default api;