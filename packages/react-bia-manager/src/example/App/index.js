import React from 'react';

import { BIARouter, ViewProvider,TranslationProvider } from '@'

export default props => {

    return (
        <TranslationProvider>
            <ViewProvider>

                <BIARouter />
            </ViewProvider>
        </TranslationProvider>
    )

}