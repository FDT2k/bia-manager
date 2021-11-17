import React, { forwardRef } from 'react';




export default forwardRef((props,ref)=>{

    return (
        <div className="printable" ref={ref}>{props.children}</div>
    )
});