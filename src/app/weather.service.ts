import { Injectable, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '3ee8e251cd9d4311a8e251cd9d7311fc';
  url;

  constructor(public http: Http) { 
    //console.log('Hello WeatherService ');
    this.url = 'https://api.weather.com/v3/wx/forecast/daily/5day?geocode=-33.0151602%2C-71.5552889&format=json&units=m&language=es-UN&apiKey=' + this.apiKey;

  }

  getWeather(){
    return this.http.get(this.url)
      .pipe(map(res => res.json()));      
  }
}
