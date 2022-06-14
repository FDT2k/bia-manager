import { cEx } from '@karsegard/react-compose';
import { LayoutFlex, Container } from '@karsegard/react-core-layout';
import React, { useEffect, useRef, useState } from 'react';
import {useBoolean} from '@karsegard/react-hooks'
import './dropdown.scss'
import { identity } from '@karsegard/composite-js';
export const DropDown =  props => {

    const { label, icon, className,overrideClick } = props;
    const [visible, toggleVisible,setVisible,setHidden] = useBoolean(false);
    const [childStyle, setStyle] = useState({});
    const ref = useRef();
    const refContent = useRef();
    const refToggle= useRef();

    const classe = cEx([
        'dropdown',
        className
    ])

    const handleClick = (event) => {
        //checking if we are outside the element
        if (ref.current && !ref.current.contains(event.target)) {
            setHidden();
        }else  if (refToggle.current.contains(event.target)) {
            //checking if we are on the main dropdown 
            overrideClick ? overrideClick() : toggleVisible()
        }
    };

    useEffect(()=>{
        if(ref.current && refContent.current){
           
            setStyle({
                top: ref.current.offsetHeight+props.offset,
                minWidth: ref.current.offsetWidth,
              
            })
        }
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    },[overrideClick])


    useEffect(()=>{
        if(visible){
            console.log(refContent.current.getBoundingClientRect());
            setStyle(style=>{
                return {
                    ...style,
                    height:refContent.current.getBoundingClientRect().height
                }
            })
        }
    },[visible])

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
                <div ref={refContent}>
                    {props.children}
                </div>
            </div>
        </div>
        </>
    )
}


DropDown.defaultProps= {
  offset:0,
  handleOpen:identity,
  handleClose:identity,
}

export default DropDown
