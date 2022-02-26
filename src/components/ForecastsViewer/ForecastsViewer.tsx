import React, {useState} from "react";
import './ForecastsViewer.scss';
import {ForecastsViewerData, WeatherUnits} from "../../models/weatherComponents.interface";
import FeaturedTodayWeather from "../FeaturedTodayWeather/FeaturedTodayWeather";
import WeeklyWeather from "../WeeklyWeather/WeeklyWeather";
import UnitsBtn from "../UnitsBtn/UnitsBtn";

const ForecastViewer: React.FC<{weatherData: ForecastsViewerData}> = ({weatherData}) => {
    const [units, setUnits] = useState<WeatherUnits>('fahrenheit');
    const {coordinates, forecasts} = weatherData;

    return (
        <div>
            <div className="coordinates">
                <h4>Coordinates</h4>
                <p>Latitude: {coordinates.lat.toFixed(2)}</p>
                <p>Longitude: {coordinates.lon.toFixed(2)}</p>
            </div>
            <UnitsBtn
                units={units}
                onChange={(e) => setUnits(e.target.value as WeatherUnits)}
            />
            <FeaturedTodayWeather dailyWeather={forecasts.today} units={units}/>
            <WeeklyWeather weeklyWeather={forecasts.weekly} units={units}/>
        </div>
    )
}

export default ForecastViewer;
