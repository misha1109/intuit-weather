import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import DayWeather from "../components/DayWeather/DayWeather";

const mock = {
    "dt": 1645779600,
    "sunrise": 1645762416,
    "sunset": 1645803344,
    "moonrise": 1645746420,
    "moonset": 1645782720,
    "moon_phase": 0.8,
    "temp": {
        "day": 55.47,
        "min": 54.68,
        "max": 57.22,
        "night": 57.06,
        "eve": 56.84,
        "morn": 54.73
    },
    "feels_like": {
        "day": 54.52,
        "night": 56.12,
        "eve": 55.8,
        "morn": 53.44
    },
    "pressure": 1013,
    "humidity": 81,
    "dew_point": 49.75,
    "wind_speed": 28.25,
    "wind_deg": 238,
    "wind_gust": 33.44,
    "weather": [
        {
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10d"
        }
    ],
    "clouds": 94,
    "pop": 0.96,
    "rain": 6.81,
    "uvi": 4.13
}


test('Valid date html', async () => {
    const {container} = render(<DayWeather dailyWeather={mock} units='fahrenheit'/>);
    expect(container.firstChild).toContainHTML(`<p>Friday</p><p>2/25/2022</p>`)
})

test('Valid weather image loaded', async () => {
    const {container} = render(<DayWeather dailyWeather={mock} units='fahrenheit'/>);
    expect(container.firstChild).toContainHTML(`http://openweathermap.org/img/wn/10d@2x.png`)
})
