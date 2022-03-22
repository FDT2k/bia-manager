import React, { forwardRef } from 'react';
import './printable.scss'



export default forwardRef((props,ref)=>{

    let className = props.hasHeader ?  'printable with-headers': 'printable'; 
    return (
        <div className={className} ref={ref}>{props.children}</div>
    )
});