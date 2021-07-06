import React from 'react';

import './style.scss';
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx ,e} from 'bia-layout/utils'


const Component = props => {



    return (<button {...props}>{props.children}</button>)

}

const Button = compose(
    withBaseClass('.button')
)(Component);

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
