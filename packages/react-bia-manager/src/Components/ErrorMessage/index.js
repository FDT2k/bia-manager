import React from 'react';
import Modal from '@/Components/Modal';
import { identity, is_nil } from '@karsegard/composite-js';
import {LayoutFlexColumn,LayoutFlex} from '@karsegard/react-core-layout';
import Button from '@/Components/Form/Button';
import { useTranslation } from '@';


export const Component = props => {

    const { error, dismiss } = props;

    const {t} =useTranslation()


    return (<>
        <Modal type="error" visible={ !is_nil(error) && error !==""}>
            <LayoutFlexColumn justCenter alignCenter>
                <h2>{t('Erreur')}</h2>
                {error}
                <Button onClick={dismiss}>{t('Fermer')}</Button>
            </LayoutFlexColumn>
        </Modal>
    </>)

}

Component.defaultProps = {
    t:identity
}
export default Component