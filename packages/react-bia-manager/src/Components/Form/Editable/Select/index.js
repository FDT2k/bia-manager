import { is_nil, is_type_object } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';

import { withForwardedRef,compose,cEx, withBaseClass } from '@karsegard/react-compose';
import { useFocus, useKeypress } from '@karsegard/react-hooks';

import React, {forwardRef, useEffect, useRef, useState } from 'react';
import Select from '@/Components/Form/Select'


export const SelectWithRef = compose(forwardRef, withForwardedRef)(Select);



const EditableSelect = withBaseClass('editable-field')(props => {
    const [editable, setEditable] = useState(false);
    const enterPressed = useKeypress('Enter');
    const ref = useRef()
    const { hasFocus } = useFocus({ ref, debug: true });

    const { children, className, value, ...rest } = props;

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


    const classes = cEx([
        className,
        _=> editable ? 'edited': '',
    ])

   debugger;

    return (<>
        {editable && <SelectWithRef ref={ref} onBlur={_ => setEditable(false)} className={classes}  value={value||''} {...rest} ></SelectWithRef>}
        {!editable && <div className={props.className} onClick={_ => setEditable(true)}>{props.value}</div>}
    </>
    )

})


export default EditableSelect