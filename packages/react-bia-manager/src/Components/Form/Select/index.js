import { is_nil } from '@karsegard/composite-js';
import React from 'react'
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { is_type_object } from '@karsegard/composite-js';

export default props => {
    const { forwardedRef: ref,children, options,value,placeholder,...rest } = props
    const renderChildren = is_nil(options);


    return (<select ref={ref}  value={value||''} {...rest} >
        {renderChildren && children}
        {!renderChildren && placeholder && <option value=''>{placeholder}</option>}
        {!renderChildren && options.map((option, idx) => {

            let value = option;
            let label = option; 
            if (is_type_object(option) && !is_nil(option.id)) {
               // [value, label] = keyval(option);
               value = option.id,
               label = option.name || option.value || '__not__found__'
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