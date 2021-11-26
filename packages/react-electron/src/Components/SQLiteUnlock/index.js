
import React, { useEffect, useState, useRef, forwardRef } from 'react';

import { Modal, Button } from '@karsegard/react-bia-manager';
import { LayoutFlexColumn } from '@karsegard/react-core-layout';
import { useFieldValues } from '@karsegard/react-hooks';

import { useTranslation } from '@karsegard/react-bia-manager';
import { useFileProvider } from '@/Context/File';
import { Field, Input } from '@karsegard/react-bia-manager'
import { useKeypress } from '@karsegard/react-hooks';



import { withForwardedRef, compose, cEx, withBaseClass } from '@karsegard/react-compose';


export const InputWithRef = compose(forwardRef, withForwardedRef)(Input);

export default (props) => {
    const ref = useRef();

    const { t } = useTranslation();
    const { actions: { unlock, close_file }, selectors: { type, locked } } = useFileProvider();
    const { values, inputProps, replaceValues } = useFieldValues({});

    const enterpressed = useKeypress('Enter')

    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (type === "sqlite" && locked === true) {
            replaceValues({ key: '' })
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [type, locked])

    useEffect(()=>{
        if(enterpressed){
            doUnlock()
        }
    },[enterpressed])

    const doUnlock = _=> {
        unlock(values.key)
    }
    return (
        <>
            <Modal type="dialog" visible={visible}>
                <LayoutFlexColumn>
                    <Field label={t('La base requiert un mot de passe:')}>

                        <Input  autoFocus  {...inputProps('key')} type="password" />
                    </Field>
                </LayoutFlexColumn>
                <Button onClick={_ => doUnlock}>Déverouiller</Button>
                <Button onClick={_ => close_file()}>Annuler</Button>
            </Modal>
        </>
    )
}