import React from 'react';

import './style.scss';
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx } from 'bia-layout/utils'

import LayoutFlex from 'bia-layout/layouts/Flex';
const InputGroup = props => {


    const [formProps, rest ] = filterPropPresentIn(['id','name','checked'],props);


    return (<LayoutFlex column justBetween {...props}>
            {props.children}
        </LayoutFlex>)

}

/*
ToggleSwitch.defaultProps = {
    onChange: x=>x,
    id: 'toggle'
}



const WithColors =  withVariables(
    compose(x => `--${x}`, kebabize),
    x => `${x}`,
    ['colorYes','colorNo']
);
*/

export default InputGroup;
