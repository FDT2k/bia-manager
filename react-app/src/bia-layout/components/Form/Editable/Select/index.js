import { is_nil, is_type_object } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { withBaseClass } from '@karsegard/react-compose';
import { useFocus, useKeypress } from '@karsegard/react-hooks';
import React, { useEffect, useRef, useState } from 'react';



const EditableSelect = withBaseClass('editable-field')(props => {
    const [editable, setEditable] = useState(false);
    const enterPressed = useKeypress('Enter');
    const ref = useRef()
    const { hasFocus } = useFocus({ ref, debug: true });

    const { children, options, ...rest } = props;

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


    const renderChildren = is_nil(options);
    return (<>
        {editable && <select ref={ref} onBlur={_ => setEditable(false)}  {...rest} >
            {renderChildren && children}
            {!renderChildren && options.map((option,idx) => {
                let value = option;
                let label = option;

                if(is_type_object(option)){
                    [value,label] = keyval(option);
                }

                return (<option key={idx} value={value}>{label}</option>)
            }
            )}
        </select>}
        {!editable && <div className={props.className} onClick={_ => setEditable(true)}>{props.value}</div>}
    </>
    )

})


export default EditableSelect