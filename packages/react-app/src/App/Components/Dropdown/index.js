import { cEx } from '@karsegard/react-compose';
import { LayoutFlex, Container } from '@karsegard/react-core-layout';
import React, { useEffect, useRef, useState } from 'react';
import {useBoolean} from '@karsegard/react-hooks'

import './dropdown.scss'
export const DropDown =  props => {

    const { label, icon, className } = props;
    const [visible, toggleVisible,setVisible,setHidden] = useBoolean(false);
    const [childStyle, setStyle] = useState({});
    const ref = useRef();
    const refToggle= useRef();

    const classe = cEx([
        'dropdown',
        className
    ])

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setHidden();
        }else  if (refToggle.current.contains(event.target)) {
            toggleVisible()
        }
    };

    useEffect(()=>{
        if(ref.current){
            setStyle({
                top: ref.current.offsetHeight+props.offset,
                minWidth: ref.current.offsetWidth,
            })
        }
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    },[])



    return (<>

        <div ref={ref} className={classe}>
            <div ref={refToggle}>
                <LayoutFlex alignCenter>
                    <div className="dropdown__label">{label}</div>
                    {icon}
                </LayoutFlex>
            </div>
            <div style={childStyle} className={cEx([
                'dropdown__content',
                _ => visible ? 'dropdown__content--visible' : 'dropdown__content--hidden'
            ])}>
                {props.children}
            </div>
        </div>
        </>
    )
}


DropDown.defaultProps= {
  offset:0
}

export default DropDown
