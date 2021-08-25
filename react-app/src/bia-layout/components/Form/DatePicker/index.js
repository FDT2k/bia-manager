import { is_nil } from '@karsegard/composite-js';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="editable-field" onClick={onClick} ref={ref}>
        {value}
    </div>
));

const SafeDatePicker = ({ selected, handleChange,tabIndex,CustomInputComponent }) => {


    const _handleChange = date=>{
        handleChange(format(date,'yyyy-MM-dd'))
    };
    
    let val = selected;

    if (is_nil(selected) || selected =="") {
        val = new Date();
    }

    if (!(val instanceof Date)) {
        val = new Date(val);
    }

    const attrs = {}

    if (!is_nil(CustomInputComponent)){
        attrs.customInput = CustomInputComponent;
    }


    return (
        <DatePicker
            selected={val}
            tabIndex={tabIndex}
            onChange={_handleChange}
            dateFormat="dd/MM/yyyy"
            {...attrs}
        />
    )
}


export default SafeDatePicker;