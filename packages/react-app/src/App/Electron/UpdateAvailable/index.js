import { identity } from '@karsegard/composite-js';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { LayoutFlexColumn,LayoutFlex } from '@karsegard/react-core-layout';
import Button from '@/bia-layout/components/Form/Button';


export const Component = ({t,download,close,updateMessage}) => (<LayoutFlexColumn justCenter alignCenter>
    <h2>{t('Mise à jour disponible')}</h2>
    <div dangerouslySetInnerHTML={{ __html: updateMessage.releaseNotes }}></div>
    <LayoutFlex style={{ width: '100%' }} justBetween>
        <Button onClick={_ => download()}>{t('Installer')}</Button>
        <Button onClick={_ => close(false)}>{t('Fermer')}</Button>
    </LayoutFlex>
</LayoutFlexColumn>)


Component.defaultProps ={
    t: identity,
    updateMessage:{
        releaseNotes:''
    }
}


export default  withTranslation('translation')(Component)