import { withBaseClass,withForwardedRef,withPropsTrace,compose } from '@karsegard/react-compose';
import { useFocus, useKeypress } from '@karsegard/react-hooks';
import React, { forwardRef,useEffect, useState } from 'react';


const EditableTextInput = (props) => {
    const {forwardedRef:ref, ...rest} = props;
    const [editable, setEditable] = useState(false);
    const enterPressed = useKeypress('Enter');
 //   const ref = useRef()

    const _disableEditable = _ => {
        setEditable(false)
    }
    const { hasFocus } = useFocus({ ref, debug: true, handleOnBlur: _disableEditable });

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
        {editable && <input ref={ref} onBlur={_disableEditable} type="text" {...rest} />}
        {!editable && <div className={props.className} onClick={_ => setEditable(true)}>{props.value}</div>}
    </>
    )

}


const enhancer = compose(forwardRef,withForwardedRef,withBaseClass('editable-field'))

export default enhancer(EditableTextInput)