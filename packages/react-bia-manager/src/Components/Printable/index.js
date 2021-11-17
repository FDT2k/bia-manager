import React, { forwardRef } from 'react';
import './printable.scss'



export default forwardRef((props,ref)=>{

    return (
        <div className="printable" ref={ref}>{props.children}</div>
    )
});