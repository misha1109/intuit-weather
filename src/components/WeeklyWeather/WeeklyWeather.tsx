import React from "react";
import {Daily} from "../../models/weatherApi.interface";
import {WeatherUnits} from "../../models/weatherComponents.interface";
import DayWeather from "../DayWeather/DayWeather";
import './WeeklyWeather.scss';

const WeeklyWeather: React.FC<{weeklyWeather: Daily[], units: WeatherUnits}> = ({weeklyWeather, units}) => {
    return (
        <div className="weather-cards">
            {weeklyWeather.map((daily, i) => {
                return (
                    <div key={`weather-card-${i}`} className="child-card">
                        <DayWeather dailyWeather={daily} units={units}/>
                    </div>
                )
            })}
        </div>
    );
}

export default WeeklyWeather;
