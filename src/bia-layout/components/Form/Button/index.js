import React from 'react';

import './style.scss';
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx } from 'bia-layout/utils'


const Button = props => {


    const [formProps, rest ] = filterPropPresentIn(['id','name','checked'],props);

    const {onChange, ...rest2} = rest;

    return (<button>button</button>
    )

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

export default Button;
