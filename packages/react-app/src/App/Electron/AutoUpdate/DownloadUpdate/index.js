import { identity } from '@karsegard/composite-js';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { LayoutFlexColumn } from '@karsegard/react-core-layout';


export const Component = ({t,download,updateMessage}) => (<LayoutFlexColumn justCenter alignCenter>
    <h2>{t('Téléchargement de la version')} {updateMessage.version}</h2>
    {download && Math.round(download.percent)}%
</LayoutFlexColumn>)


Component.defaultProps ={
    t: identity,
    updateMessage: {version:'0.0.0'},
    download:{percent:-1}
}


export default  withTranslation('translation')(Component)