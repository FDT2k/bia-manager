import React from 'react';
import Modal from '@/Components/Modal';
import { identity, is_nil } from '@karsegard/composite-js';
import {LayoutFlexColumn,LayoutFlex} from '@karsegard/react-core-layout';
import Button from '@/Components/Form/Button';
import { useTranslation,useConfirm } from '@';


export const Component = props => {

    const { 
        prompt = "",
        isOpen = false,
        proceed,
        cancel 
      } = useConfirm();
    

    const {t} =useTranslation()


    return (<>
        <Modal type="confirm" visible={isOpen}>
            <LayoutFlexColumn style={{gap:'10px'}} justCenter alignCenter>
                <h2>{t('Confirm')}</h2>
                {prompt}
                <LayoutFlex style={{gap:'10px'}}><Button onClick={proceed}>{t('proceed')}</Button>
                <Button onClick={cancel}>{t('cancel')}</Button></LayoutFlex>
            </LayoutFlexColumn>
        </Modal>
    </>)

}

export default Component