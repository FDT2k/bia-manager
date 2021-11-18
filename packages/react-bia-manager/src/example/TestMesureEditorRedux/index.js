import { CustomListProvider, TranslationProvider, useTranslation } from '@';
import StoreProvider, { editorModule } from '@/example/Store';
import MesureEditor from '@/Features/Editor/Mesure';
import Editor from '@/Features/Editor';
import React, { useEffect } from 'react';

import patientSample from './patient'


import { useSelector, useDispatch } from '@karsegard/react-redux'



const TestListProvider = props => {
    const { t } = useTranslation()

    return (
        <CustomListProvider value={{
            machines: [],
            sport_rate: [

            ],
            sport_type: [

            ],
            machines: [

            ],
            ethno: [

            ]
        }}>
            {props.children}
        </CustomListProvider>)
}

const ReduxEditor = props => {

    const { select_edited_mesure } = editorModule.selectors

    const { edit_mesure,create_mesure,edit_patient,change_mesure,save } = editorModule.actions;

    const mesure = useSelector(select_edited_mesure)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(edit_patient( patientSample ));
        dispatch(create_mesure());

    }, [])


    const handleChange = (values, changed_field) => {

        dispatch(change_mesure(values,changed_field))
    }

    const handleClickSave=  _=> {
        dispatch(save());

    }


    return (

        <MesureEditor mesure={mesure} handleChange={handleChange} handleClickSave={handleClickSave}></MesureEditor>
    )
}

export default props => {

    return (
        <StoreProvider>
            <TranslationProvider>
                <TestListProvider>
                    <ReduxEditor />
                </TestListProvider>
            </TranslationProvider>

        </StoreProvider>
    )

}