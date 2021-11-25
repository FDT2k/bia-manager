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
        handleDelete,
        handleMesureCreate: _handleMesureCreate,
        handleMesureOpen: _handleMesureOpen } = _handlers
    const dispatch = useDispatch();
    const patient = useSelector(selectors.select_edited_patient);
    const mesure = useSelector(selectors.select_edited_mesure);
    const current_mesure_id = useSelector(selectors.select_current_mesure_id);
    const current_mesures = useSelector(selectors.select_mesures)

    const [should_save, setShouldSave] = useState(false);

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
        _handleMesureCreate(patient_id);
        dispatch(actions.create_mesure(patient_id))

    }

    const handleClickSave = _ => {

        dispatch(actions.save())
        setShouldSave(true) // it's mandatory since useSelector will not be updated until next render

    }


    /* save effect */
    useEffect(() => {
        if (should_save) {
            if (handleSave) {
                handleSave(patient)
            } else {
                console.warn('handleSave not set');
            }
            setShouldSave(false);
        }
    }, [should_save]);


    const handleMesureOpen = (value, idx) => {
        if (idx < current_mesures.length) {
            dispatch(actions.edit_mesure(patient_id, idx));
            _handleMesureOpen(patient_id, idx)
        } else {
            return _handleMesureCreate()
        }
    }


    const handleMesureDelete = async (idx) => {

        Promise.resolve(handleDelete(patient, idx)).then(res => {
            if (res !== false) {
                dispatch(actions.delete_mesure(patient.id, idx));
            }
        })
    }


    const handleChange = (values, changed_field) => {

        dispatch(actions.change_mesure(values, changed_field))
    }

    const handlers = {
        ..._handlers,

        handleClickSave,
        handleMesureCreate,
        handleMesureOpen,
        handleMesureDelete,
        handleChange
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