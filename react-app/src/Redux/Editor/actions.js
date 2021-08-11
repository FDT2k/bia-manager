
import create from 'Redux/utils/make-action'
import { is_nil, compose } from '@karsegard/composite-js';
import { bmi, ideal_weight, mostAccurateFormula } from 'references';

import { createAction } from '@reduxjs/toolkit'
import { compare, item_prop_is_equal } from '@karsegard/composite-js/List'
import createAsyncAction, { makePromiseDispatcher } from 'Redux/utils/async-dispatch'

import { formulas, calculate } from 'references/formulas';
import { spec } from '@karsegard/composite-js/ObjectUtils';
import EMPTY_MESURE from 'references/mesure-schema'
import { patient } from './reducer';

import {generate_recap_header, recap_to_bar_chart,normalize_mesure,bia_to_recap,formula_result_to_bia_summary,recompute} from 'references/Mesure'


export const EDIT_PATIENT = 'EDIT_PATIENT';
export const EDIT_MESURE = 'EDIT_MESURE';
export const SELECT_MESURE = 'SELECT_MESURE';
export const CREATE_MESURE = 'CREATE_MESURE';
export const RECOMPUTE_MESURE = 'RECOMPUTE_MESURE';
export const UPDATE_RECAP = 'UPDATE_RECAP';
export const CHANGE_MESURE = 'CHANGE_MESURE';



const normes = {

    'pct_water': [55.0, 67.6],
    'pct_ffm': [73.2, 89.0],
    'pct_dffm': [19.7, 23.3],
    'pct_fm': [11.0, 26.8],
    'fmi': [2.2, 7.0],
    'ffmi': [16.8, 21.1],

}


export const edit_patient = create(EDIT_PATIENT);
export const select_mesure = createAction(SELECT_MESURE, arg => {
    return {
        payload: {
            mesure_id: arg
        }
    }
});


export const make_create_mesure = baseSelector => (patient_id) => {
    if (patient_id) {
        return (dispatch, getState) => {
            let state = baseSelector(getState());
            let new_mesure = Object.assign({}, EMPTY_MESURE, {
                date: new Date(),
                weight: '',
                height: '',
                bmi_ref: '',
                left_side: false
            });
            console.log(state.patient[patient_id], state, new_mesure);

            dispatch(select_mesure(state.patient[patient_id].mesures.length))

            return dispatch({
                type: CREATE_MESURE,
                payload: {
                    id: patient_id,
                    mesure: new_mesure,
                    mesure_id: state.patient[patient_id].mesures.length
                }
            })

        }
    } else {
        return { type: 'ERROR_CREATE_MESURE' }
    }
};


export const make_edit_mesure = baseSelector => (patient_id, mesure_id) => {

    return (dispatch, getState) => {
        let state = baseSelector(getState());



        return dispatch({
            type: EDIT_MESURE,
            payload: {
                id: patient_id,
                mesure: state.patient[patient_id].mesures[mesure_id],
                mesure_id
            }
        })

    }
};



export const make_change_mesure = baseSelector => (patient, mesure) => {
    const recompute_mesure = make_recompute_mesure(baseSelector);
    if (!patient || !mesure) {
        return {
            type: 'GENERAL_ERROR'
        }
    }
    return (dispatch, getState) => {
        let state = baseSelector(getState());


        const { mesure: normalized_mesure } = normalize_mesure({ patient, mesure })
        const new_mesure = { ...mesure, ...normalized_mesure };
        dispatch({
            type: CHANGE_MESURE,
            payload: {
                id: patient.id,
                mesure: new_mesure,
            }
        })
        return dispatch(recompute_mesure(patient.id, new_mesure));
    }
};



export const make_refresh_recap = baseSelector => (patient_id, mesure_id) => {
    return (dispatch, getState) => {
        dispatch({ type: 'ATTEMPT_REFRESH_RECAP', patient_id, mesure_id });
        if (patient_id && mesure_id) {
            let state = baseSelector(getState());

            let edited_mesure;

            let patient = state.patient[patient_id]
            let mesures = [...patient.mesures];

            edited_mesure = state.mesure[patient_id].mesure || null;
            let edited_mesure_id = state.mesure[patient_id].mesure_id || null;
            const bia_report_columns = state.report_settings.bia_report_columns;
            const bia_report_chart_columns = state.report_settings.bia_report_chart_columns;


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
                type: UPDATE_RECAP,
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



export const make_recompute_mesure = baseSelector => (patient_id, values) => {

    return (dispatch, getState) => {
        let state = baseSelector(getState());

        const patient = state.patient[patient_id];

        const bia_result_columns = state.report_settings.bia_result_columns;


        return dispatch({
            type: RECOMPUTE_MESURE,
            payload: {
                id: patient_id,
                bia: recompute(patient, values, bia_result_columns, normes),
            }
        })

    }
}



export const make_actions = spec({
    edit_mesure: make_edit_mesure,
    recompute_mesure: make_recompute_mesure,
    create_mesure: make_create_mesure,
    change_mesure: make_change_mesure,
    refresh_recap: make_refresh_recap
})


