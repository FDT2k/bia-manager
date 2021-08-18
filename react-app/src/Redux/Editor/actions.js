

import { is_nil } from '@karsegard/composite-js';
import { createAction } from '@reduxjs/toolkit';
import moment from 'moment';
import create from 'Redux/utils/make-action';
import { createActionTypes, createPrefixableActionTypes } from 'Redux/utils/types';
import { bia_to_recap, generate_recap_header, normalize_mesure, recap_to_bar_chart, recompute } from 'references/Mesure';
import EMPTY_MESURE from 'references/mesure-schema';
import normes, { find_norme } from 'references/Normes';
import { normalize as normalize_patient } from 'references/Patient';
import { select_edited_mesure } from 'Store';







export const ACTIONS_TYPES = createActionTypes(
    'EDIT_PATIENT',
    'EDIT_MESURE',
    'SELECT_MESURE',
    'CREATE_MESURE',
    'RECOMPUTE_MESURE',
    'UPDATE_RECAP',
    'CHANGE_MESURE',
    'ATTEMPT_REFRESH_RECAP',
    'RECAP_PATIENT_NOT_LOADED',
    'REFRESH_NORME',
    'FETCHED_NORMES'
)




export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);


export default (getModule) => {

    const { action_types, selectors } = getModule()
    const actions = {};


    const { select_mesures, select_normes_sampling, select_result_columns, select_normes, select_edited_patient, select_report_columns, select_charts_columns } = selectors;

    actions.real_edit_patient = create(action_types.EDIT_PATIENT);
    actions.refresh_norme = create(action_types.REFRESH_NORME)
    actions.fetched_normes = create(action_types.FETCHED_NORMES)

    actions.do_refresh_norme = (key, norme) => (dispatch, getState) => {
        let s = getState();
        const age = select_edited_mesure(getState()).current_age;
        const patient = select_edited_patient(getState());
        let _norme = norme[patient.gender];
        const payload = {
            patient_id: patient.id,
            key,
            values: find_norme(norme, patient.gender, age)
        }
        return dispatch(actions.refresh_norme(payload));
    }

    actions.fetch_normes = () => (dispatch, getState) => {
        const patient = select_edited_patient(getState());

        dispatch(actions.fetched_normes({
            normes,
            genders: ['M', 'F']
        }));


    }

    actions.refresh_normes = () => (dispatch, getState) => {

        Object.keys(normes).map(key => {
            dispatch(actions.do_refresh_norme(key, normes[key]))
        })

    }

    actions.edit_patient = patient => {
        return (dispatch, getState) => {

            if (patient) {
                return dispatch(actions.real_edit_patient(normalize_patient(patient)));

            } else {
                return dispatch({
                    type: 'ERROR_EDIT_PATIENT_UNDEF'
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


    actions.create_mesure = (patient_id) => {
        if (patient_id) {
            return (dispatch, getState) => {
                let mesures = select_mesures(getState());
                const patient = select_edited_patient(getState());
                let new_mesure_id = mesures.length;
                let new_mesure = Object.assign({}, EMPTY_MESURE, {
                    date: moment().format('Y-m-d'),
                    weight: '',
                    height: '',
                    bmi_ref: '',
                    left_side: false
                });

                let { mesure } = normalize_mesure({ patient, new_mesure });
                dispatch(actions.set_current_mesure(new_mesure_id))


                let r = dispatch({
                    type: action_types.CREATE_MESURE,
                    payload: {
                        id: patient_id,
                        mesure: mesure,
                        mesure_id: new_mesure_id
                    }
                })
                dispatch(actions.refresh_normes());

                return r;
            }
        } else {
            return { type: 'ERROR_CREATE_MESURE' }
        }
    };


    actions.edit_mesure = (patient_id, mesure_id) => {

        return (dispatch, getState) => {
            let mesures = select_mesures(getState());
            const patient = select_edited_patient(getState());
            let { mesure } = normalize_mesure({ patient, mesure: mesures[mesure_id] });
            let r = dispatch({
                type: action_types.EDIT_MESURE,
                payload: {
                    id: patient_id,
                    mesure,
                    mesure_id
                }
            })

            dispatch(actions.refresh_normes());

            return r;
        }
    };





    actions.recompute_mesure = (patient_id, values) => {

        return (dispatch, getState) => {


            const patient = select_edited_patient(getState());
            const bia_result_columns = select_result_columns(getState());
            const normes = select_normes(getState())

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

        if (is_nil(patient) || is_nil(mesure)) {
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
            dispatch(actions.refresh_normes());
            return dispatch(actions.recompute_mesure(patient.id, new_mesure));
        }
    };


    actions.attempt_refresh_recap = create(action_types.ATTEMPT_REFRESH_RECAP)
    actions.recap_error_patient_fail = create(action_types.RECAP_PATIENT_NOT_LOADED)


    actions.refresh_recap = (patient_id, mesure_id) => {
        return (dispatch, getState) => {

            dispatch(actions.attempt_refresh_recap({ patient_id, mesure_id }));
            const normes = select_normes(getState())

            if (!is_nil(patient_id) && !is_nil(mesure_id)) {

                let edited_mesure;

                let patient = select_edited_patient(getState())

                if (!patient) {
                    return dispatch(actions.recap_error_patient_fail({}))
                }

                let mesures = [...patient.mesures];

                edited_mesure = select_edited_mesure(getState())
                let edited_mesure_id = edited_mesure.mesure_id
                const bia_report_columns = select_report_columns(getState());
                const bia_report_chart_columns = select_charts_columns(getState());


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
                    } else {
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
                const recap = bia_to_recap(results, bia_report_columns, normes, ['weight', 'ideal_weight', 'pct_ideal_weight', 'height']);
                const dates = generate_recap_header(mesure_id, mesures);
                const chart = recap_to_bar_chart(bia_to_recap(results, bia_report_chart_columns), dates)



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



