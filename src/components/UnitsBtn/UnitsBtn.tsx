import React, {ChangeEvent} from "react";
import {WeatherUnits} from "../../models/weatherComponents.interface";
import './UnitsBtn.scss';
import celsiusImg from './celsius.png';
import fahrenheit from './fahrenheit.png';

const UnitsBtn: React.FC<{units: WeatherUnits, onChange:  (e: ChangeEvent<HTMLInputElement>) => void}> = ({units, onChange}) => {
    const unitsConfigMap = {
        celsius: {
            img: celsiusImg
        },
        fahrenheit: {
            img: fahrenheit
        }
    }

    return (
        <div className="units-btn-container">
            {Object.entries(unitsConfigMap).map(([unit, config]) => {
                return (
                    <label key={`unit-btn-${unit}`}>
                        <input onChange={onChange} value={unit} checked={units === unit} type="radio"/>
                        <div className="unit-content">
                            <img src={config.img} alt={unit}/>
                        </div>
                    </label>
                    // <span key={`unit-btn-${unit}`}>
                    //     <input onChange={onChange} type="radio" value={unit} checked={units === unit}/> {unit}
                    // </span>
                )
            })}
        </div>
    )
}

export default UnitsBtn;
