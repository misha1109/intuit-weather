import './DayWeather.scss';
import React from "react";
import {WeatherUnits} from "../../models/weatherComponents.interface";
import {Daily} from "../../models/weatherApi.interface";

const DayWeather: React.FC<{dailyWeather: Daily, units: WeatherUnits}> = ({dailyWeather, units}) => {
    const {dt, temp, weather} = dailyWeather;
    const {day, calendar} = unixToDateDictionary(dt);
    const calculatedTemp = convertTemperature(temp.day, units);
    const icon = weather[0].icon;
    const unitSign = units === 'celsius' ? 'C' : 'F'

    return (
        <div className="weather-card">
            <p>{day}</p>
            <p>{calendar}</p>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
            <div className="weather-temp">{calculatedTemp}<span>°{unitSign}</span></div>
        </div>
    );
}

const unixToDateDictionary = (dt: number) => {
    const date = new Date(dt * 1000);
    return {
        day: date.toLocaleDateString('en', { weekday: 'long'}),
        calendar: date.toLocaleDateString()
    }
}

const convertTemperature = (temp: number, unit: WeatherUnits) => {
    const convertedTemp = unit === 'celsius' ? (temp - 32) / 1.8 : temp;
    return convertedTemp.toFixed(0);
}

export default DayWeather;
