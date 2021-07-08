import React from 'react';

import './style.scss';
import { bem, compose, kebabize,filterPropPresentIn, baseElement, applyModifiers, withVariables, withModifiers, wrapComponent, asideElement, divElement, withBaseClass, cEx } from 'bia-layout/utils'

import InputGroup from 'bia-layout/components/Form/InputGroup';
import Input from 'bia-layout/components/Form/Input';
import Label from 'bia-layout/components/Form/Label';
import Button from 'bia-layout/components/Form/Button';
import LayoutFlex from 'bia-layout/layouts/Flex';
import {useFieldValues} from '@geekagency/use-fields-value'


const LoginForm = props => {

    const {className,handleSubmit, ...rest} = props
    const {inputProps,values} = useFieldValues({username:'',password:''})
    const classes = cEx(["login-form",className]);
    const _handleSubmit = e=>{
        handleSubmit && handleSubmit(values);
    }
    return (
        <LayoutFlex className={classes} column justCenter {...rest}>
            <InputGroup>
                <Label>Login</Label>
                <Input/>
            </InputGroup>
            <InputGroup>
                <Label>Password</Label>
                <Input/>
            </InputGroup>
            <LayoutFlex justEnd>
                <Button onClick={_handleSubmit}>Se connecter</Button>
            </LayoutFlex>
        </LayoutFlex>
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

export default LoginForm;
