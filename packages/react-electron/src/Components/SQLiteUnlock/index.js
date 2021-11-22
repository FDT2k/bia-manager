
import React, { useEffect,useState } from 'react';

import {Modal,Button} from '@karsegard/react-bia-manager';
import { LayoutFlexColumn } from '@karsegard/react-core-layout';
import { useFieldValues } from '@karsegard/react-hooks';

import { useTranslation } from '@karsegard/react-bia-manager';
import { useFileProvider } from '@/Context/File';
import {Field,Input} from '@karsegard/react-bia-manager'

export default (props)=> {

    const {t} = useTranslation();
    const {actions:{unlock,close_file},selectors:{type,locked}} = useFileProvider();
    const {values,inputProps,replaceValues} = useFieldValues({});

    const [visible,setVisible] = useState(false)
    useEffect(()=>{
        if(type==="sqlite" && locked === true){
            replaceValues({key:''})
            setVisible(true)
        }else {
            setVisible(false)
        }
    },[type,locked])
    return (
        <>
        <Modal type="dialog" visible={visible}>
            <LayoutFlexColumn>
                <Field label={t('La base requiert un mot de passe:')}>
            
                    <Input  {...inputProps('key')} type="password"/>
                </Field>
            </LayoutFlexColumn>
            <Button onClick={_=>unlock(values.key)}>Déverouiller</Button>
            <Button onClick={_=>close_file()}>Annuler</Button>
        </Modal>
        </>
    )
}