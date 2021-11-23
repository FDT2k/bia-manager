import { TranslationProvider, CustomListProvider } from '@';
import EditorComponent from '@/Features/Editor';
import { Fullscreen } from '@karsegard/react-core-layout';
import React from 'react';

import { BackendProvider } from '@';

import { withReduxModule, withBackend } from '@/Containers/Editor';
import { Provider as StoreProvider, store } from '@/example/Store'

import sample from './patient'

const translations = {

}

const translate = key => {
    return translations[key] || key;
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
                        <CustomListProvider  lists={lists} forms={forms}>
                            <Editor patient_id={1} handlers={handlers}/>
                        </CustomListProvider>
                    </BackendProvider>

                </TranslationProvider>
            </StoreProvider>
        </Fullscreen>
    )

}