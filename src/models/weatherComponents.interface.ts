import {Daily} from "./weatherApi.interface";

export type WeatherUnits = 'celsius' | 'fahrenheit';

export interface Forecasts {
    today: Daily;
    weekly: Daily[]
}
