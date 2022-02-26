import {Coordinates, Daily} from "./weatherApi.interface";

export type WeatherUnits = 'celsius' | 'fahrenheit';

export interface Forecasts {
    today: Daily;
    weekly: Daily[]
}

export interface ForecastsViewerData {
    forecasts: Forecasts,
    coordinates: Coordinates
}
