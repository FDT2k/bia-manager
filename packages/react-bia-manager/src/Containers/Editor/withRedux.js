import React, { useEffect } from 'react';
import { is_nil ,is_empty} from '@karsegard/composite-js'


import { useDispatch, useSelector } from '@karsegard/react-redux';

import { useLocation, useRoute } from "wouter";



import EditorModule from '@/Redux/Editor'


export const Module = EditorModule(state => state.editor, 'editor', {});
export const { actions, selectors } = Module;


export const Container = ({ selectors, actions }) => Component => props => {
    const [location, setLocation] = useLocation();


    const {  patient_id, mesure_id, handlers: _handlers, ...rest } = props;

    const { handleFetch,
        handleMesureCreate:_handleMesureCreate,
        handleMesureOpen:_handleMesureOpen } = _handlers
    const dispatch = useDispatch();
    const patient = useSelector(selectors.select_edited_patient);
    const mesure = useSelector(selectors.select_edited_mesure);
    const current_mesure_id =  useSelector(selectors.select_current_mesure_id);
    const current_mesures = useSelector(selectors.select_mesures)

    useEffect(() => {
        dispatch(actions.fetch_normes());
    }, []);


    useEffect(() => {
        if (!is_nil(patient_id) && ((patient && patient_id != patient.id) || !is_empty(patient))) {
            handleFetch(patient_id).then(patient => {
                dispatch(actions.edit_patient(patient));
            }).catch(err=> {
                console.error(err)
            })
        }
    }, [patient_id]);




    useEffect(() => {
        //  console.log('ba', mesure_id,patient)
        if (!is_empty(patient)) {
            if (!is_nil(mesure_id) && mesure_id < current_mesures.length) {
                dispatch(actions.edit_mesure(patient_id, mesure_id));
                dispatch(actions.recompute_current_mesure())
            } else {
                dispatch(actions.create_mesure(patient_id))
            }

        }
    }, [mesure_id, patient]);


    const handleMesureCreate = _ => {
        _handleMesureCreate(patient_id);
        dispatch(actions.create_mesure(patient_id))

    }

    const handleMesureOpen = (value, idx) => {
        if (idx < current_mesures.length) {
            dispatch(actions.edit_mesure(patient_id, idx));
            _handleMesureOpen(patient_id, idx)
        } else {
            return _handleMesureCreate()
        }
    }

  
    const handleChange = (values, changed_field) => {
        dispatch(actions.change_mesure(values,changed_field))
    }

    const handlers = {
        ..._handlers,
        handleMesureCreate,
        handleMesureOpen,
        handleChange
    }
    return (

        <Component
            {...props}

            handlers={handlers}
            data={patient}
            selectedMesureIndex={current_mesure_id}
            mesure={mesure}
            
        />
    )
}


export default store => {

    store.manager.addModule(Module);

    return Container(Module)
}