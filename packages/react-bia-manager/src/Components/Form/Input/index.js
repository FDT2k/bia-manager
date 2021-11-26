import React from 'react';



const Input = props => {
    let {forwardedRef, ...rest}= props;
    
    if(forwardedRef){
        rest.ref= forwardedRef
    }
    return (<input type="text" {...rest}/>)
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
