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
            ethnological_groups:[
                {'unkown':'Inconnu'},
                {'moderate':'Modéré'},
                {'high':'Normal'},
                {'average':'Elevé'},
            ],
            pathological_groups:[
                {'unkown':'Inconnu'},
                {'moderate':'Modéré'},
                {'high':'Normal'},
                {'average':'Elevé'},
            ],
            physical_activity_rate:[
                {'unkown':'Inconnu'},
                {'moderate':'Modéré'},
                {'high':'Normal'},
                {'average':'Elevé'},
            ],
            physical_activity_type:[
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
        }} forms={{
            "create_subject": [
                { list_key: 'pathological_groups', path: 'groups.patho' },
                { list_key: 'ethnological_groups', path: 'groups.ethno' },
                { list_key: 'genders', path: 'gender' },
            ],
            "edit_subject": [
                { list_key: 'pathological_groups', path: 'groups.patho' },
                { list_key: 'genders', path: 'gender' },
            ],
            "mesure": [
                { list_key: 'physical_activity_type', path: 'sport.type' },
                { list_key: 'physical_activity_rate', path: 'sport.rate' },
                { list_key: 'machines', path: 'machines' },
            ]
        }}>
            {props.children}
        </CustomListProvider>)
}

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