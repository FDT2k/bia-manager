import { is_nil } from '@karsegard/composite-js';
import React from 'react'
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { is_type_object } from '@karsegard/composite-js';

export default props => {
    const { children, options,value,...rest } = props
    const renderChildren = is_nil(options);

    return (<select   value={value||''} {...rest} >
        {renderChildren && children}
        
        {!renderChildren && options.map((option, idx) => {

            let value = option;
            let label = option; 


            if (is_type_object(option)) {
               // [value, label] = keyval(option);
               value = option.id,
               label = option.name
            }

            if(value==null || label ==null){
                value=''
            }
            return (<option key={idx} value={value}>{label}</option>)
        }
        )}
    </select>)
}