import React from 'react';

import { BIARouter, ViewProvider, TranslationProvider,CustomListProvider } from '@'


import Search,{Page} from '@/Features/Search';
import { useTranslation } from '@';
import {ErrorMessage,Modal,Loading} from '@'


export default props => {

    return (
        <TranslationProvider>
            <Page/>
           
        </TranslationProvider>
    )

}