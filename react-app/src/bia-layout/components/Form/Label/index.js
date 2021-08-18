import { filterPropPresentIn } from '@karsegard/react-compose';
import React from 'react';
import './style.scss';



const Button = props => {


    const [formProps, rest ] = filterPropPresentIn(['id','name','checked'],props);

    const {onChange, ...rest2} = rest;

    return (<label>{props.children}</label>)

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
