import React from 'react';

import { BIARouter, ViewProvider, TranslationProvider } from '@'


import Editor from '@/Features/Editor';



const TestEditor = props => {

    return (<Editor
        patient={{}}
        handlers={{
           
        }}
        mesure={{ date: '2012-01-21', data: {},left_side:true }}></Editor>)
}

export default props => {

    return (
        <TranslationProvider>
            <ViewProvider views={{ Editor: TestEditor }}>
                <BIARouter />
            </ViewProvider>
        </TranslationProvider>
    )

}