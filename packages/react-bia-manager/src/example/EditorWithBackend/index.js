import { TranslationProvider, CustomListProvider } from '@';
import { Fullscreen } from '@karsegard/react-core-layout';
import React from 'react';
import { BackendProvider, ConfirmProvider, ConfirmDialog } from '@';
import { useTranslation } from '@';
import { Provider as StoreProvider, store } from '@/example/Store'
import { useBackend, useConfirm } from '@'

import sample from './patient'

import Editor from '@/example/ReduxEditor'

const translations = {

}

const translate = key => {
    // console.warn('translator',key)
    return translations[key] || key;
}

const TestListProvider = props => {
    const { t } = useTranslation()

    return (
        <CustomListProvider lists={{
            ethnological_groups: [
                { 'unkown': 'Inconnu' },
                { 'moderate': 'Modéré' },
                { 'high': 'Normal' },
                { 'average': 'Elevé' },
            ],
            pathological_groups: [
                { 'unkown': 'Inconnu' },
                { 'moderate': 'Modéré' },
                { 'high': 'Normal' },
                { 'average': 'Elevé' },
            ],
            physical_activity_rate: [
                { 'unkown': 'Inconnu' },
                { 'moderate': 'Modéré' },
                { 'high': 'Normal' },
                { 'average': 'Elevé' },
            ],
            physical_activity_type: [
                { 'unkown': 'Inconnu' },
                { 'moderate': 'Modéré' },
                { 'high': 'Normal' },
                { 'average': 'Elevé' },
            ],
            machines: [
                { id: '', name: t('- Choisissez une valeur -') },
                { 'unkown': 'Inconnu' },
                { 'moderate': 'Modéré' },
                { 'high': 'Normal' },
                { 'average': 'Elevé' },
            ],
            ethno: [
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




export const FakeBackendContainer = Component => (props) => {
    const { get_subject, save_subject, get_mesure } = useBackend();
    const { isConfirmed } = useConfirm();


    const { handlers: _handlers, ...rest } = props;

    const handleFetch = async patient_id => {
        return get_subject(patient_id)
    }


    const handleSave = async (subject,mesure_id) => {
        //alert('saved' +mesure_id)
        return subject.mesures[mesure_id];
    }

    const handleMesureOpen = async (value, idx, editor_status) => {
        if (editor_status === false) {
            return await isConfirmed("The changes you made will not be saved, continue ?")
        }
        return undefined;
    }


    const handleMesureCreate = async (patient_id) => {

    }

    const handleMesureDelete = async (patient_id, idx) => {

    }

    const handlers = {
        ..._handlers,
        handleFetch,
        handleSave,
        handleMesureDelete,
        handleMesureCreate,
        handleMesureOpen,
    }

    return (

        <Component
            {...rest}
            handlers={handlers}
        />
    )
}

const EditorWithBackend = FakeBackendContainer(Editor)

export default props => {
    const lists = {};
    const forms = {};
    const handleMesureOpen = (subject_id, mesure_idx) => {

    }

    const handleMesureCreate = (subject_id) => {

    }

    const handleGoBack = ()=> {
        alert('not implemented sorry')
    }

    const handlers = {
        handleMesureOpen,
        handleMesureCreate,
        handleGoBack,
    }
    return (
        <Fullscreen>
            <StoreProvider>
                <TranslationProvider value={{ t: translate }}>
                    <ConfirmProvider>
                        <ConfirmDialog />
                        <BackendProvider actions={{
                            get_subject: async (id) => {
                                return sample
                            },
                            get_mesure: (subject_id, id) => {

                            },
                            delete_mesure: (patient_id, idx) => { }
                        }}>
                            <TestListProvider >
                                <EditorWithBackend patient_id={1} handlers={handlers} />
                            </TestListProvider>
                        </BackendProvider>
                    </ConfirmProvider>
                </TranslationProvider>
            </StoreProvider>
        </Fullscreen>
    )

}