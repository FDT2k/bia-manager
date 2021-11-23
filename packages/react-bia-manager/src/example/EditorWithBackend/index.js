import { TranslationProvider, CustomListProvider } from '@';
import EditorComponent from '@/Features/Editor';
import { Fullscreen } from '@karsegard/react-core-layout';
import React from 'react';

import { BackendProvider } from '@';

import { useTranslation } from '@';
import { withReduxModule, withBackend } from '@/Containers/Editor';
import { Provider as StoreProvider, store } from '@/example/Store'

import sample from './patient'

const translations = {

}

const translate = key => {
    return translations[key] || key;
}

const TestListProvider = props => {
    const { t } = useTranslation()

    return (
        <CustomListProvider lists={{
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
                { id: '', name: t('- Choisissez une valeur -') },
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
            {props.children}
        </CustomListProvider>)
}
//const Editor = withReduxModule(store)(withBackend(EditorComponent))
//const Editor = withReduxModule(store)(EditorComponent)
const Editor = withBackend(withReduxModule(store)(EditorComponent))
export default props => {
    const lists = {};
    const forms = {};
    const handleMesureOpen= (subject_id,mesure_idx)=> {

    }
    const handleMesureCreate= (subject_id)=> {
        
    }

    const handlers= {
        handleMesureOpen,
        handleMesureCreate
    }
    return (
        <Fullscreen>
            <StoreProvider>
                <TranslationProvider value={{ t: translate }}>
                    <BackendProvider actions={{
                        get_subject: async (id)=> {
                            return sample
                        },
                        get_mesure: (subject_id,id)=>{

                        }
                    }}>
                        <TestListProvider >
                            <Editor patient_id={1} handlers={handlers}/>
                        </TestListProvider>
                    </BackendProvider>

                </TranslationProvider>
            </StoreProvider>
        </Fullscreen>
    )

}