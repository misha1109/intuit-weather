import React, {ChangeEvent, FormEventHandler} from "react";
import './CityInput.scss';

const CityInput: React.FC<{onSubmit: FormEventHandler<HTMLFormElement>, onChange:  (e: ChangeEvent<HTMLInputElement>) => void, city: string}> = ({onSubmit, onChange, city}) => {
    return (
        <form onSubmit={onSubmit}>
            <input className="city-input" placeholder="City Name" type="text" value={city} onChange={onChange} />
            <input className="submit" disabled={!city} type="submit" value="Submit" />
        </form>
    )
}

export default CityInput;
