
import React from 'react';
import { TranslationProvider } from '@karsegard/react-bia-manager'

import I18Next from '@/Features/Electron/i18Next';
import { useTranslation } from 'react-i18next';

const BIATranslation = ({ children }) => {
    const {t} = useTranslation('translation')
    const _t = (key,args={}) => {
        let res =  t(key);
        if(res == key){ // remove comment for display
            let a = res.split('//');

            Object.keys(args).forEach(k=>{
                res = res.replace(`{${k}}`,args[k])
            })
            return res;
        }
        Object.keys(args).forEach(k=>{
            res = res.replace(`{${k}}`,args[k])
        })
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