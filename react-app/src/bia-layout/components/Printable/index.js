import React,{forwardRef} from 'react'

import {compose,applyModifiers,withBaseClass,divElement} from '@karsegard/react-compose';

import './printable.scss';


export default forwardRef((props,ref)=>{

    return (
        <div className="printable" ref={ref}>{props.children}</div>
    )
});