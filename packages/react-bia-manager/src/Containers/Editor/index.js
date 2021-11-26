import React, { useEffect, useState } from 'react';
import { is_nil, is_empty } from '@karsegard/composite-js'
import { useDispatch, useSelector } from '@karsegard/react-redux';
import Mesure from './Mesure'
import { useTranslation } from '@'


export const Container = ({ selectors, actions }) => (Component, MesureEditor) => props => {

    const { t } = useTranslation();
    const { patient_id, mesure_id, handlers: _handlers, ...rest } = props;

    const { handleFetch = _ => console.warn('not implemented'),
        handleSave,
        handleSaveSubject,
        handleMesureDelete: _handleMesureDelete,
        handleMesureCreate: _handleMesureCreate,
        handleMesureOpen: _handleMesureOpen } = _handlers
    const dispatch = useDispatch();
    const patient = useSelector(selectors.select_edited_patient);
    const mesure = useSelector(selectors.select_edited_mesure);
    const current_mesure_id = useSelector(selectors.select_current_mesure_id);
    const current_mesures = useSelector(selectors.select_mesures)
    const is_clean = useSelector(selectors.is_clean)

    const [should_save, setShouldSave] = useState(false);
    const [should_open, setShouldOpen] = useState(false);
    const [should_save_subject, setShouldSaveSubject] = useState(false);

    useEffect(() => {
        dispatch(actions.fetch_normes());
    }, []);


    useEffect(() => {
        if (!is_nil(patient_id) && ((patient && patient_id != patient.id) || !is_empty(patient))) {
            handleFetch(patient_id).then(patient => {
                dispatch(actions.edit_patient(patient));
                dispatch(actions.create_mesure(patient_id))
            }).catch(err => {
                console.error(err)
            })
        }
    }, [patient_id]);


    /*
    
        useEffect(() => {
            if (!is_empty(patient)) {
                if (!is_nil(mesure_id) && mesure_id < current_mesures.length) {
                    dispatch(actions.edit_mesure(patient_id, mesure_id));
                    dispatch(actions.recompute_current_mesure())
                } else {
                    dispatch(actions.create_mesure(patient_id))
                }
    
            }
        }, [mesure_id, patient]);*/


    const handleMesureCreate = _ => {
        Promise.resolve(_handleMesureCreate(patient_id,is_clean)).then(result => {

            if (result !== false) {
                dispatch(actions.create_mesure(patient_id))
            }


        })
        
       

    }

    const handleClickSave = _ => {

        dispatch(actions.save())
        setShouldSave(true) // it's mandatory since useSelector will not be updated until next render

    }


    /* save effect */
    useEffect(() => {
        if (should_save) {
            if (handleSave) {
                Promise.resolve(handleSave(patient,current_mesure_id))
               
            } else {
                console.warn('handleSave not set');
            }
            setShouldSave(false);
        }

        if (should_open !== false) {
            if (should_open < current_mesures.length) {
                dispatch(actions.edit_mesure(patient_id, should_open));

            } else {
               /* debugger;
                dispatch(actions.create_mesure(patient_id))*/
                alert('this should not happen.')
            }

            setShouldOpen(false);
        }
        if(should_save_subject) {
            if(handleSaveSubject){
                handleSaveSubject(patient);
            }else {
                console.warn('handleSaveSubject not set');
            }
            setShouldSaveSubject(false)
        }
    }, [should_save, should_open,should_save_subject]);


    const handleMesureOpen = (value, idx) => {
        Promise.resolve(_handleMesureOpen(patient_id, idx, is_clean)).then(result => {

            if (result !== false) {
                setShouldOpen(idx);
            }


        })

    }


    const handleMesureDelete = async (idx) => {

        Promise.resolve(_handleMesureDelete(patient, idx)).then(res => {
            if (res !== false) {
                dispatch(actions.delete_mesure(patient.id, idx));
            }
        })
    }


    const handleChange = (values, changed_field) => {

        dispatch(actions.change_mesure(values, changed_field))

    }

    const handleSubjectChange = (values) => {
        dispatch(actions.change_subject(patient_id, values));
        setShouldSaveSubject(true)
    }

    const handlers = {
        ..._handlers,

        handleClickSave,
        handleMesureCreate,
        handleMesureOpen,
        handleMesureDelete,
        handleChange,
        handleSubjectChange
    }
    return (

        <Component
            {...props}
            handlers={handlers}
            data={patient}
            selectedMesureIndex={current_mesure_id}
            mesure={mesure}
            MesureEditor={MesureEditor}

        />
    )
}


export default (module, Component) => {

    const MesureEditor = Mesure(module);

    return Container(module)(Component, MesureEditor);

}