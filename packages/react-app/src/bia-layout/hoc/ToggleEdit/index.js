import { cEx, getClasseNames } from '@karsegard/react-compose';
import React from 'react';
import './style.scss';


export const ToggleEditField = (EditableComponent,UnEditableComponent)=> props => {
    const {className: _className,editable, ...rest} = getClasseNames('editable-field',props);

    const className = cEx([
        _className,
        {'editable':_=> editable}
    ]);
    


    return (
        <>
        {editable && <EditableComponent className={className}  {...rest}/>}
        {!editable && <UnEditableComponent className={className} {...rest}/>}
        </>
    )

}


export default ToggleEditField