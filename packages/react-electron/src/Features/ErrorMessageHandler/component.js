import React from 'react';

import { identity, is_nil } from '@karsegard/composite-js';
import {LayoutFlexColumn,LayoutFlex} from '@karsegard/react-core-layout';
import {Modal,Button} from '@karsegard/react-bia-manager';


export const Component = props => {

    const { error, dismiss,t } = props;



    return (<>
        <Modal type="error" visible={ !is_nil(error) && error !==""}>
            <LayoutFlexColumn justCenter alignCenter>
                <h2>{t('Erreur')}</h2>
                {error}
                <Button onClick={dismiss}>Fermer</Button>
            </LayoutFlexColumn>
        </Modal>
    </>)

}

Component.defaultProps = {
    t:identity
}
export default Component