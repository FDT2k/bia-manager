import React from 'react';

import { BIARouter, ViewProvider, TranslationProvider,CustomListProvider } from '@'

import {Fullscreen} from '@karsegard/react-core-layout'

import Editor from '@/Features/Editor';
import { useTranslation } from '@';
import {ErrorMessage,Modal,Loading} from '@'


const TestEditor = props => {
    const {t}= useTranslation()
    return (
        <CustomListProvider value={{
            
            sport_rate:[
                {'unkown':'Inconnu'},
                {'moderate':'Modéré'},
                {'high':'Normal'},
                {'average':'Elevé'},
            ],
            sport_type:[
                {'unkown':'Inconnu'},
                {'moderate':'Modéré'},
                {'high':'Normal'},
                {'average':'Elevé'},
            ],
            machines:[
                { id: '', name: t('- Choose a value -') },
                {'unkown':'Inconnu'},
                {'moderate':'Modéré'},
                {'high':'Normal'},
                {'average':'Elevé'},
            ],
            ethno:[
                'europeen',
                'europeen',
                'europeen',
                'europeen',
            ]
        }}>
            <Editor
                patient={{}}
                handlers={{

                }}
                mesure={{ date: '2012-01-21', data: {}, left_side: true }}></Editor>
        </CustomListProvider>)
}

export default props => {

    return (
        <TranslationProvider>
            <Fullscreen>
           <TestEditor/>
         </Fullscreen>
           
        </TranslationProvider>
    )

}