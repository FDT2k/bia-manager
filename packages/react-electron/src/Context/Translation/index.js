
import React from 'react';
import { TranslationProvider } from '@karsegard/react-bia-manager'

import I18Next from '@/Features/Electron/i18Next';
import { useTranslation } from 'react-i18next';

const BIATranslation = props => {
    const {t} = useTranslation()
    return ( <TranslationProvider value={{t}}>

        </TranslationProvider>)
}

export default ({ children }) => {

    return (
        <I18Next>
           <BIATranslation>
               {children}
           </BIATranslation>
        </I18Next>
    )


}