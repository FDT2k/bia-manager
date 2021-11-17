import { compose, withBaseClass,withModifiers } from '@karsegard/react-compose';
import React from 'react';



const Component = props => {



    return (<button {...props}>{props.children}</button>)

}

Component.defaultProps={
    type:"button"
}

const Button = compose(
    withModifiers((x)=>`button--${x}`,['small','big']),
    withBaseClass('button')
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
