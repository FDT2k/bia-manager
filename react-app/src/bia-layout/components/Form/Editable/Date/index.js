import { is_nil } from '@karsegard/composite-js';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'
import EditableTextInput  from '../TextInput';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="editable-field" onClick={onClick} ref={ref}>
        {value}
    </div>
));

const SafeDatePicker = ({ selected, handleChange }) => {


    const _handleChange = date=>{

        handleChange(format(date,'yyyy-MM-dd'))

    };
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
            onChange={_handleChange}
            dateFormat="dd/MM/yyyy"
            customInput={<EditableTextInput tabIndex="-1" />}
        />
    )
}

export default SafeDatePicker;