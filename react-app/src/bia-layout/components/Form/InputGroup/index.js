import React from 'react';

import './style.scss';
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx } from '@karsegard/react-compose'

import LayoutFlex from 'bia-layout/layouts/Flex';


const InputGroup = compose (
    withBaseClass('input-group'),
    applyModifiers({column:true,justBetween:true})
)(LayoutFlex);
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
