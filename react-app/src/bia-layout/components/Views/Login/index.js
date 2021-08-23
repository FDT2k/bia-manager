import { cEx } from '@karsegard/react-compose';
import { useFieldValues } from '@karsegard/react-hooks';
import Button from 'bia-layout/components/Form/Button';
import Input from 'bia-layout/components/Form/Input';
import InputGroup from 'bia-layout/components/Form/InputGroup';
import Label from 'bia-layout/components/Form/Label';
import {LayoutFlex} from '@karsegard/react-core-layout'

import React from 'react';
import './style.scss';




const LoginForm = props => {

    const {className,handleSubmit, t,...rest} = props
    const {inputProps,values} = useFieldValues({username:'',password:''})
    const classes = cEx(["login-form",className]);
    const _handleSubmit = e=>{
        handleSubmit && handleSubmit(values);
    }
    return (
        <LayoutFlex className={classes} column justCenter {...rest}>
            <h2>{t(`Se connecter`)}</h2>
            <InputGroup>
                <Label>{t(`Nom d'utilisateur`)}</Label>
                <Input placeholder={t(`Nom d'utilisateur`)} />
            </InputGroup>
            <InputGroup>
                <Label>{t(`Mot de passe`)}</Label>
                <Input placeholder={t(`Mot de passe`)} />
            </InputGroup>
            <LayoutFlex justEnd>
                <Button onClick={_handleSubmit}>{t(`Se connecter`)}</Button>
            </LayoutFlex>
        </LayoutFlex>
    )

}
LoginForm.defaultProps = {
  t: x=>x
}

export default LoginForm;
