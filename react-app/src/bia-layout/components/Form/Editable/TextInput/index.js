import React, { useMemo, useState, forwardRef, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useFieldValues, useKeypress, useFocus } from '@karsegard/react-hooks';
import { bem, compose, withModifiers, applyModifiers, withVariables, divElement,withRemovedProps, withBaseClass, getClasseNames, cEx } from 'bia-layout/utils'



const EditableTextInput = withBaseClass('editable-field')(props => {

    const [editable, setEditable] = useState(false);
    const enterPressed = useKeypress('Enter');
    const ref = useRef()
    const { hasFocus } = useFocus({ ref, debug: true });

    useEffect(() => {
        if (ref.current && enterPressed && hasFocus) {
            setEditable(false);
        }
    }, [enterPressed, hasFocus])


    useEffect(() => {
        if (editable && ref.current) {
            ref.current.focus();
        }
    }, [editable])

    return (<>
        {editable && <input ref={ref} onBlur={_ => setEditable(false)} type="text" {...props} />}
        {!editable && <div className={props.className} onClick={_ => setEditable(true)}>{props.value}</div>}
    </>
    )

})


export default EditableTextInput