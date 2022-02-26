import {http} from "./http";
import {
    Coordinates, Daily,
} from "../models/weatherApi.interface";

const OPEN_WEATHER = {
    apiKey: '818ee64b41517259790fb824a5e74bd2',  // obviously there shouldn't be an api key as part of the source code..
    urls: {
        base: 'https://api.openweathermap.org/',
        geo: 'geo/1.0/direct',
        forecast: 'data/2.5/onecall',
    },
}

export const getDailyForecastByCityName = async (cityName: string): Promise<Daily[]> => {
    try {
        const {lat, lon} = await getCoordsByCityName(cityName);
        const params = {
            appid: OPEN_WEATHER.apiKey, lat, lon, exclude: 'current,minutely,hourly,alerts', units: 'imperial'
        };
        const forecastResponse = await http.get(`${OPEN_WEATHER.urls.base}${OPEN_WEATHER.urls.forecast}`, params);

        const {data} = forecastResponse;
        const {daily} = data;
        return daily;
    } catch (e) {
        return [];
    }
}

const getCoordsByCityName = async (cityName: string): Promise<Coordinates> => {
    try {
        const params = {
            appid: OPEN_WEATHER.apiKey, q: cityName
        };
        const geoResponse = await http.get(`${OPEN_WEATHER.urls.base}${OPEN_WEATHER.urls.geo}`, params);

        const {data} = geoResponse;
        return {lat: data[0].lat, lon: data[0].lat}
    } catch (e) {
        return {lat: 0, lon: 0}
    }
}
