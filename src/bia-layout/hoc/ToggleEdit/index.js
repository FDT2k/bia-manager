import React,{useState} from 'react'
import {withBaseClass,withModifiers,compose, bem,divElement,cEx,getClasseNames} from 'bia-layout/utils'

import './style.scss'

export const ToggleEditField = (EditableComponent,UnEditableComponent)=> props => {
    const {className: _className,editable, ...rest} = getClasseNames('editable-field',props);
    const className = cEx([
        _className,
        {'editable':_=> editable}
    ]);
    console.log(rest);
    return (
        <>
        {editable && <EditableComponent className={className}  {...rest}/>}
        {!editable && <UnEditableComponent className={className} {...rest}/>}
        </>
    )

}


export default ToggleEditField