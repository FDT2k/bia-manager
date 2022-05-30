
import React from 'react';
import { TranslationProvider } from '@karsegard/react-bia-manager'

import I18Next from '@/Features/Electron/i18Next';
import { useTranslation } from 'react-i18next';

const BIATranslation = ({ children }) => {
    const {t} = useTranslation('translation')
    const _t = key => {
        let res =  t(key)
        return res;
    }
    return ( <TranslationProvider value={{t:_t}}>
            {children}
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