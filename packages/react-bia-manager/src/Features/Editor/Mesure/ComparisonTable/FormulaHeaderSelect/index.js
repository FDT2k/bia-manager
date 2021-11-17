
import React from 'react';

export default props => {
    const { handleChange, disabled_col, options, idx, defaultValue, t, className,...rest } = props;


    const _onChange = e => {

        handleChange && handleChange(idx, e.target.value);

    }
    return (<select value={defaultValue}  onChange={_onChange} className={className}>
        {
            options.filter(
                item => item.selectable === true)
                .map(
                    option => {
                        let is_disabled = disabled_col.indexOf(option.name) !== -1;
                        return (<option disabled={is_disabled} key={option.name} value={option.name}>{option.label}</option>)
                    })}

    </select>)

}

