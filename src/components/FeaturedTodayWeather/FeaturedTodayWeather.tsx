import React from "react";
import {Daily} from "../../models/weatherApi.interface";
import {WeatherUnits} from "../../models/weatherComponents.interface";
import DayWeather from "../DayWeather/DayWeather";
import './FeaturedTodayWeather.scss';

const FeaturedTodayWeather: React.FC<{dailyWeather: Daily, units: WeatherUnits}> = ({dailyWeather, units}) => {
    return (
        <div className="featured-today-weather">
            <DayWeather dailyWeather={dailyWeather} units={units}/>
        </div>
    )
}

export default FeaturedTodayWeather;
