

import create from 'Redux/utils/make-action'
import {renameActionTypes,createActionTypes} from 'Redux/utils/types'



import { is_nil } from '@karsegard/composite-js';

import { createAction } from '@reduxjs/toolkit'

import EMPTY_MESURE from 'references/mesure-schema'

import {generate_recap_header, recap_to_bar_chart,normalize_mesure,bia_to_recap,formula_result_to_bia_summary,recompute} from 'references/Mesure'
import { select_edited_mesure } from 'Store';


const normes = {

    'pct_water': [55.0, 67.6],
    'pct_ffm': [73.2, 89.0],
    'pct_dffm': [19.7, 23.3],
    'pct_fm': [11.0, 26.8],
    'fmi': [2.2, 7.0],
    'ffmi': [16.8, 21.1],

}

export const ACTIONS_TYPES = createActionTypes(
    'EDIT_PATIENT',
    'EDIT_MESURE',
    'SELECT_MESURE',
    'CREATE_MESURE',
    'RECOMPUTE_MESURE',
    'UPDATE_RECAP',
    'CHANGE_MESURE',
    'ATTEMPT_REFRESH_RECAP',
    'RECAP_PATIENT_NOT_LOADED'
)




export const makeActionTypes = renameActionTypes(ACTIONS_TYPES);


export default (getModule) => {

    const {action_types,selectors} = getModule()
    const actions = {};


    const {select_mesures,select_edited_patient,select_report_columns,select_charts_columns} = selectors;

    actions.real_edit_patient = create(action_types.EDIT_PATIENT);

    actions.edit_patient = patient => {
        return (dispatch,getState)=> {
    
            if(patient){
                return dispatch(actions.real_edit_patient(patient));
            }else{
                return dispatch({
                    type:'ERROR_EDIT_PATIENT_UNDEF'
                });
            }
    
        }
    }
    actions.set_current_mesure = createAction(action_types.SELECT_MESURE, arg => {
        return {
            payload: {
                mesure_id: arg
            }
        }
    });
    
    
    actions.create_mesure =  (patient_id) => {
        if (patient_id) {
            return (dispatch, getState) => {
                let mesures = select_mesures(getState());
                let new_mesure_id = mesures.length;
                let new_mesure = Object.assign({}, EMPTY_MESURE, {
                    date: new Date(),
                    weight: '',
                    height: '',
                    bmi_ref: '',
                    left_side: false
                });
    
                dispatch(actions.set_current_mesure(new_mesure_id))
    
                return dispatch({
                    type: action_types.CREATE_MESURE,
                    payload: {
                        id: patient_id,
                        mesure: new_mesure,
                        mesure_id: new_mesure_id
                    }
                })
    
            }
        } else {
            return { type: 'ERROR_CREATE_MESURE' }
        }
    };
    
    
    actions.edit_mesure = (patient_id, mesure_id) => {
    
        return (dispatch, getState) => {
            let mesures = select_mesures(getState());
            return dispatch({
                type: action_types.EDIT_MESURE,
                payload: {
                    id: patient_id,
                    mesure: mesures[mesure_id],
                    mesure_id
                }
            })
    
        }
    };
    
    
    
    
    
    actions.recompute_mesure = (patient_id, values) => {
    
        return (dispatch, getState) => {
    

            const patient =select_edited_patient(getState());
            const bia_result_columns = select_report_columns(getState());
    
            const results = recompute(patient, values, bia_result_columns, normes);
            
            return dispatch({
                type: action_types.RECOMPUTE_MESURE,
                payload: {
                    id: patient_id,
                    bia: results,
                }
            })
    
        }
    }


    actions.change_mesure = (patient, mesure) => {
      
        if (!patient || !mesure) {
            return {
                type: 'GENERAL_ERROR'
            }
        }

        
        return (dispatch, getState) => {
    
            const { mesure: normalized_mesure } = normalize_mesure({ patient, mesure })
            const new_mesure = { ...mesure, ...normalized_mesure };
            dispatch({
                type: action_types.CHANGE_MESURE,
                payload: {
                    id: patient.id,
                    mesure: new_mesure,
                }
            })
            return dispatch(actions.recompute_mesure(patient.id, new_mesure));
        }
    };
    

    actions.attempt_refresh_recap = create(action_types.ATTEMPT_REFRESH_RECAP)
    actions.recap_error_patient_fail = create(action_types.RECAP_PATIENT_NOT_LOADED)
    
    
    actions.refresh_recap = (patient_id, mesure_id) => {
        return (dispatch, getState) => {
            
            dispatch(actions.attempt_refresh_recap ({ patient_id, mesure_id }));

            if (!is_nil(patient_id) && !is_nil(mesure_id)) {
    
                let edited_mesure;
    
                let patient = select_edited_patient(getState())
            
                if(!patient){
                    return dispatch(actions.recap_error_patient_fail({}))
                }
    
                let mesures = [...patient.mesures];
    
                edited_mesure = select_edited_mesure(getState())
                let edited_mesure_id = select_edited_mesure(getState()).mesure_id
                const bia_report_columns = select_report_columns(getState());
                const bia_report_chart_columns =  select_charts_columns(getState());
    
    
                if (edited_mesure) { // replace edited mesure with the current edited mesure or addit if its a new one
                    if (edited_mesure_id < mesures.length) {
                        mesures = mesures.reduce((carry, item, idx) => {
                            if (idx == mesure_id) {
                                carry.push(edited_mesure)
                            } else {
                                carry.push(item);
                            }
    
                            return carry;
    
                        }, [])
                    }else{
                        mesures.push(edited_mesure);
                    }
                }
    
                const results = mesures.map(mesure => {
    
                    const { mesure: normalized_mesure } = normalize_mesure({ patient, mesure })
                    return {
                        ...normalized_mesure,
                        bia: recompute(patient, normalized_mesure, bia_report_columns, normes)
                    }
    
                })
    
                const recap = bia_to_recap(results, bia_report_columns, normes);
                const dates = generate_recap_header(mesure_id,mesures);
                const chart = recap_to_bar_chart(bia_to_recap(results, bia_report_chart_columns),dates)
                return dispatch({
                    type: action_types.UPDATE_RECAP,
                    payload: {
                        patient_id: patient.id,
                        headers: dates,
                        recap,
                        chart
                    }
                })
            } else {
                dispatch({ type: 'ERROR_REFRESH_RECAP' });
            }
        }
    
    };
    
    return actions;
}



