
import React from 'react';

import Modal from '@/App/Components/Modal';
import Button from '@/bia-layout/components/Form/Button';
import { LayoutFlex } from '@karsegard/react-core-layout';


export default ({visible,unlock,cancel})=> {

    return (
        <>
        <Modal visible={visible}>
            <LayoutFlex>
            <div>La base requiert un mot de passe:</div> <input  type="password"/>
            </LayoutFlex>
            <Button onClick={_=>unlock}>Déverouiller</Button>
            <Button onClick={_=>cancel}>Annuler</Button>
        </Modal>
        </>
    )
}