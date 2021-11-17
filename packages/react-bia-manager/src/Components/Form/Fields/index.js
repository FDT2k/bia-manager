import { bem, withBaseClass } from '@karsegard/react-compose';
import React from 'react';

import { Info } from '@/Components/Icons';


const [__base_class, element, modifer] = bem('field');

const Field = props => {
    const { label, className } = props;
    return (
        <div className={className}>
            <label className={element('label')}>{label}</label>
            <div className={element('field')}>{props.children}</div>
            
        </div>
    )

}


export const wrapField = Component => props => {
    const { label, className, ...rest } = props;
    return (<Field label={label} className={className}><Component {...rest} /></Field>)
}


export default withBaseClass(__base_class)(Field);
