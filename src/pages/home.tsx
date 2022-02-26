import React, {useState, useEffect} from "react";
import { useParams, useHistory} from 'react-router-dom';

import {ForecastsViewerData} from "../models/weatherComponents.interface";
import {getDailyForecastByCityName} from "../lib/weather";
import CityInput from "../components/CityInput/CityInput";
import ForecastViewer from '../components/ForecastViewer/ForecastsViewer';

function Home() {
    const {cityParam} = useParams<{cityParam: string}>();
    const history = useHistory();

    useEffect(() => {
        if (cityParam) initForecasts(cityName);
    }, [])

    const [cityName, setCityName] = useState(cityParam || '');
    const [weatherData, setForecasts] = useState<ForecastsViewerData>();
    const [apiErrorMessage, setApiError] = useState<string>('');

    const initForecasts = async (city: string): Promise<void> => {
        const forecasts = await getDailyForecastByCityName(city);

        const {daily, coordinates} = forecasts;
        if (daily.length) {
            setForecasts({
                forecasts: {
                    today: daily[0],
                    weekly: daily.slice(1)
                },
                coordinates
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
            </div>
            <div className="forecasts-container">
                {
                    apiErrorMessage
                    ? <div>{apiErrorMessage}</div>
                    : weatherData
                    ? <ForecastViewer weatherData={weatherData}/>
                    : <div>Enter city name and submit to view forecast</div>
                }
            </div>
        </div>
    );
}

export default Home;
