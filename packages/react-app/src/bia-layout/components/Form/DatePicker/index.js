import { is_nil } from '@karsegard/composite-js';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'
import MaskedTextInput from "react-text-mask";

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="editable-field" onClick={onClick} ref={ref}>
        {value}
    </div>
));

const SafeDatePicker = ({ allow_null,masked_input,mask,dateFormat, selected, handleChange, tabIndex, CustomInputComponent }) => {


    const _handleChange = date => {
        handleChange(format(date, 'yyyy-MM-dd'))
    };

    let val = selected;

    if (!allow_null && is_nil(selected) || selected == "") {
        val = new Date();
    }

    if (val !="" && !is_nil(val) && !(val instanceof Date)) {
        val = new Date(val);
    }

    const attrs = {}

    if (!is_nil(CustomInputComponent)) {
        attrs.customInput = CustomInputComponent;
    }else if(masked_input){
        attrs.customInput = (<MaskedTextInput
            type="text"
            guide={true}
            keepCharPositions={true}
            showMask={true}
            mask={mask}
          />)
    }


    return (
        <DatePicker
            selected={val}
            tabIndex={tabIndex}
            onChange={_handleChange}
            dateFormat={dateFormat}
            {...attrs}
        />
    )
}

SafeDatePicker.defaultProps = {
    allow_null: false,
    masked_input:false,
    dateFormat:"dd.MM.yyyy",
    mask:[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/],
}

export default SafeDatePicker;