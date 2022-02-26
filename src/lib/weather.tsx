import {http} from "./http";
import {
    Coordinates, Daily, DailyForecastResponse, WeatherCoordinatesResponse,
} from "../models/weatherApi.interface";

const OPEN_WEATHER = {
    apiKey: '818ee64b41517259790fb824a5e74bd2',  // obviously there shouldn't be an api key as part of the source code..
    urls: {
        base: 'https://api.openweathermap.org/',
        geo: 'geo/1.0/direct',
        forecast: 'data/2.5/onecall',
    },
}
const DEFAULT_COORDINATES: Coordinates = {lat: 0, lon: 0};

export const getDailyForecastByCityName = async (cityName: string): Promise<{daily: Daily[], coordinates: Coordinates}> => {
    try {
        const {lat, lon} = await getCoordsByCityName(cityName);
        const params = {
            appid: OPEN_WEATHER.apiKey, lat, lon, exclude: 'current,minutely,hourly,alerts', units: 'imperial'
        };
        const forecastResponse = await http.get<DailyForecastResponse>(`${OPEN_WEATHER.urls.base}${OPEN_WEATHER.urls.forecast}`, params);

        const {data} = forecastResponse;
        const {daily} = data;
        return {daily, coordinates: {lat, lon}};
    } catch (e) {
        return {daily: [], coordinates: DEFAULT_COORDINATES};
    }
}

const getCoordsByCityName = async (cityName: string): Promise<Coordinates> => {
    try {
        const params = {
            appid: OPEN_WEATHER.apiKey, q: cityName
        };
        const geoResponse = await http.get<WeatherCoordinatesResponse[]>(`${OPEN_WEATHER.urls.base}${OPEN_WEATHER.urls.geo}`, params);

        const {data} = geoResponse;
        return {lat: data[0].lat, lon: data[0].lat}
    } catch (e) {
        return DEFAULT_COORDINATES;
    }
}
