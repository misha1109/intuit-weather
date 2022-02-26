import React, {useState, useEffect, ReactElement, FormEvent} from "react";
import { useParams, useHistory} from 'react-router-dom';

import {getDailyForecastByCityName} from "../lib/weather";
import CityInput from "../components/CityInput/CityInput";
import ForecastViewer from '../components/ForecastViewer/ForecastsViewer';

function Home() {
    const {cityParam} = useParams<{cityParam: string}>();
    const history = useHistory();
    const [cityName, setCityName] = useState(cityParam || '');
    const [forecastElement, setForecastElement] = useState<ReactElement>(<div>Enter city name and submit to view forecast</div>);

    useEffect(() => {
        if (cityParam) initForecasts(cityName);
    }, [])

    const initForecasts = async (city: string): Promise<void> => {
        const forecasts = await getDailyForecastByCityName(city);

        const {daily, coordinates} = forecasts;
        if (daily.length) {
            const forecastData = {
                forecasts: {
                    today: daily[0],
                    weekly: daily.slice(1)
                },
                coordinates
            };
            setForecastElement(<ForecastViewer weatherData={forecastData}/>)
        } else {
            setForecastElement(<div>Weather api error occurred. Please try again later</div>)
        }
    }

    const onCityInputSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/${cityName}`);
        initForecasts(cityName);
    };

    return (
        <div>
            <div className="search-container">
                <CityInput
                    city={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    onSubmit={ onCityInputSubmit }
                />
            </div>
            <div className="forecasts-container">
                {forecastElement}
            </div>
        </div>
    );
}

export default Home;
