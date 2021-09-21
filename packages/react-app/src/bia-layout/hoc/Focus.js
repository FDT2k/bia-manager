import react,{useState,useEffect,useRef} from 'react';
import {withBaseClass,withModifiers,withVariables,compose, bem,divElement,cEx} from '@karsegard/react-compose'
import useFocus from '@/hooks/useFocus';


export const withFocus = Component => props => {
    const ref = useRef();
    const {hasFocus} = useFocus({ref});


    return (<Component ref={ref} hasFocus={hasFocus} {...props}/>)
}


export const makeFocusable = Component => props => {
    const ref = useRef();
    const {hasFocus,handleFocus} = useFocus({ref});


    return (<Component ref={ref} hasFocus={hasFocus} {...props}/>)

    return (
        <>
            <input type="text"  ref={ref} style={{position:"absolute", top:"-100px", left:"-100px"}}/>
            <Component  className={cEx([
                {'focused': hasFocus}
            ])} {...props}>
        </>
    )

}
