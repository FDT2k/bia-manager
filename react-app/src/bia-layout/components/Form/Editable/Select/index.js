import { withBaseClass } from '@karsegard/react-compose';
import { useFocus, useKeypress } from '@karsegard/react-hooks';
import React, { useEffect, useRef, useState } from 'react';



const EditableSelect = withBaseClass('editable-field')(props => {

    const [editable, setEditable] = useState(false);
    const enterPressed = useKeypress('Enter');
    const ref = useRef()
    const { hasFocus } = useFocus({ ref, debug: true });

    const {children,...rest } = props;

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
        {editable && <select ref={ref} onBlur={_ => setEditable(false)}  {...rest} >{children}</select>}
        {!editable && <div className={props.className} onClick={_ => setEditable(true)}>{props.defaultValue}</div>}
    </>
    )

})


export default EditableSelect