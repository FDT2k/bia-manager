import { is_nil } from '@karsegard/composite-js';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';


const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input editable-field" onClick={onClick} ref={ref}>
        {value}
    </div>
));

const SafeDatePicker = ({ selected, handleChange }) => {

    let val = selected;

    if (is_nil(selected)) {

        val = new Date();

    }

    if (!(val instanceof Date)) {
        val = new Date(val);

    }


    return (
        <DatePicker
            selected={val}
            onChange={handleChange}
            customInput={<CustomInput tabindex="-1" />}
        />
    )
}

export default SafeDatePicker;