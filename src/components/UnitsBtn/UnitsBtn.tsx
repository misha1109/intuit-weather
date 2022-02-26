import React, {ChangeEvent} from "react";
import {WeatherUnits} from "../../models/weatherComponents.interface";
import './UnitsBtn.scss';

const UnitsBtn: React.FC<{units: WeatherUnits, onChange:  (e: ChangeEvent<HTMLInputElement>) => void}> = ({units, onChange}) => {
    const availableUnits = ['celsius', 'fahrenheit'];

    return (
        <div className="units-btn-container">
            {availableUnits.map(unit => {
                return (
                    <span key={`unit-btn-${unit}`}>
                        <input onChange={onChange} type="radio" value={unit} checked={units === unit}/> {unit}
                    </span>
                )
            })}
        </div>
    )
}

export default UnitsBtn;
