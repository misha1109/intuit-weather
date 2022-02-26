import React, {useState} from "react";
import {ForecastsViewerData, WeatherUnits} from "../../models/weatherComponents.interface";
import FeaturedTodayWeather from "../FeaturedTodayWeather/FeaturedTodayWeather";
import WeeklyWeather from "../WeeklyWeather/WeeklyWeather";
import UnitsBtn from "../UnitsBtn/UnitsBtn";

const ForecastViewer: React.FC<{weatherData: ForecastsViewerData}> = ({weatherData}) => {
    const [units, setUnits] = useState<WeatherUnits>('fahrenheit');

    return (
        <div>
            <h2 className="coordinates">Latitude: {weatherData.coordinates.lat} Longitude: {weatherData.coordinates.lon}</h2>
            <UnitsBtn
                units={units}
                onChange={(e) => setUnits(e.target.value as WeatherUnits)}
            />
            <FeaturedTodayWeather dailyWeather={weatherData.forecasts.today} units={units}/>
            <WeeklyWeather weeklyWeather={weatherData.forecasts.weekly} units={units}/>
        </div>
    )
}

export default ForecastViewer;
