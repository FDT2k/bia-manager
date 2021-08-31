import React from 'react';
import './style.scss';



const Input = props => {
    return (<input type="text" {...props}/>)
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

export default Input;
