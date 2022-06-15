import React, { useState } from 'react';

import Database from '@/Features/DatabaseExport'

import { TranslationProvider, CustomListProvider } from '@';


const translate = key => {
    // console.warn('translator',key)
    return key
}
export default props => {


    return (
        <TranslationProvider value={{ t: translate }}>
            <Database handleExport={values=> alert(JSON.stringify(values))}/>
        </TranslationProvider>
    )


}