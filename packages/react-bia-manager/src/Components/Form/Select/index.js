import { is_nil } from '@karsegard/composite-js';
import React from 'react'
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { is_type_object } from '@karsegard/composite-js';

export default props => {
    const { forwardedRef: ref,children, options,value,...rest } = props
    const renderChildren = is_nil(options);

    debugger;

    return (<select ref={ref}  value={value||''} {...rest} >
        {renderChildren && children}
        {!renderChildren && options.map((option, idx) => {
    debugger;

            let value = option;
            let label = option; 
            if (is_type_object(option) && !is_nil(option.id)) {
               // [value, label] = keyval(option);
               value = option.id,
               label = option.name
            }else if(is_type_object(option)){
                [value, label] = keyval(option);
            }

            if(value==null || label ==null){
                value=''
            }
            return (<option key={idx} value={value}>{label}</option>)
        }
        )}
    </select>)
}