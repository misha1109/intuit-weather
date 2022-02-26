import React, {useState, useEffect} from "react";
import { useParams, useHistory} from 'react-router-dom';

import {Forecasts, WeatherUnits} from "../models/weatherComponents.interface";
import {getDailyForecastByCityName} from "../lib/weather";
import CityInput from "../components/CityInput/CityInput";
import UnitsBtn from "../components/UnitsBtn/UnitsBtn";
import FeaturedTodayWeather from "../components/FeaturedTodayWeather/FeaturedTodayWeather";
import WeeklyWeather from "../components/WeeklyWeather/WeeklyWeather";

function Home() {
    const {cityParam} = useParams<{cityParam: string}>();
    const history = useHistory();

    useEffect(() => {
        if (cityParam) initForecasts(cityName);
    }, [])

    const [cityName, setCityName] = useState(cityParam || '');
    const [forecasts, setForecasts] = useState<Forecasts>();
    const [units, setUnits] = useState<WeatherUnits>('fahrenheit');
    const [apiErrorMessage, setApiError] = useState<string>('');

    const initForecasts = async (city: string): Promise<void> => {
        const forecasts = await getDailyForecastByCityName(city);

        if (forecasts.length) {
            setForecasts({
                today: forecasts[0],
                weekly: forecasts.slice(1)
            })
            setApiError('');
        } else {
            setApiError('Weather api error occurred. Please try again later');
        }
    }

    return (
        <div>
            <div className="search-container">
                <CityInput
                    city={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    onSubmit={ async (e) => {
                        e.preventDefault();
                        history.push(`/${cityName}`);
                        initForecasts(cityName);
                    }}
                />
                <UnitsBtn
                    units={units}
                    onChange={(e) => setUnits(e.target.value as WeatherUnits)}
                />
            </div>
            <div className="forecasts-container">
                {
                    apiErrorMessage
                    ? <div>{apiErrorMessage}</div>
                    : forecasts
                    ? <div>
                        <FeaturedTodayWeather dailyWeather={forecasts.today} units={units}/>
                        <WeeklyWeather weeklyWeather={forecasts.weekly} units={units}/>
                      </div>
                    : <div>Enter city name and submit to view forecast</div>
                }
            </div>
        </div>
    );
}

export default Home;
