import { identity } from '@karsegard/composite-js';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { LayoutFlexColumn,LayoutFlex } from '@karsegard/react-core-layout';
import {Button} from '@karsegard/react-bia-manager';


export const Component = ({t,download,close,updateMessage}) => (<LayoutFlexColumn justCenter alignCenter>
    <h2>{t('Update Available!')}</h2>
    <div dangerouslySetInnerHTML={{ __html: updateMessage.releaseNotes }}></div>
    <LayoutFlex style={{ width: '100%' }} justBetween>
        <Button onClick={_ => download()}>{t('Install')}</Button>
        <Button onClick={_ => close(false)}>{t('Ignore')}</Button>
    </LayoutFlex>
</LayoutFlexColumn>)


Component.defaultProps ={
    t: identity,
    updateMessage:{
        releaseNotes:''
    }
}


export default  withTranslation('translation')(Component)