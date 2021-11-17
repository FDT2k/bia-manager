
import React, { useEffect } from 'react';

import {Modal,Button} from '@karsegard/react-bia-manager';
import { LayoutFlex } from '@karsegard/react-core-layout';
import { useFieldValues } from '@karsegard/react-hooks';


export default ({visible,unlock,cancel})=> {
    const {values,inputProps,replaceValues} = useFieldValues({});
    useEffect(()=>{
        if(!visible){
            replaceValues({key:''})
        }
    },[visible])
    return (
        <>
        <Modal type="dialog" visible={visible}>
            <LayoutFlex>
            <div>La base requiert un mot de passe:</div> <input  {...inputProps('key')} type="password"/>
            </LayoutFlex>
            <Button onClick={_=>unlock(values.key)}>Déverouiller</Button>
            <Button onClick={_=>cancel()}>Annuler</Button>
        </Modal>
        </>
    )
}