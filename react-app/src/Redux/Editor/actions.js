
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


export const EDIT_PATIENT = 'EDIT_PATIENT';
export const EDIT_MESURE = 'EDIT_MESURE';
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


export const make_create_mesure = baseSelector => (patient_id, mesure_id) => {
    if(patient_id && mesure_id ){
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
        return dispatch({
            type: CREATE_MESURE,
            payload: {
                id: patient_id,
                mesure: new_mesure,
                mesure_id: state.patient[patient_id].mesures.length
            }
        })

    }
}else{
    return {type:'ERROR'}
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


const best_formula = ({ patient, mesure }) => {

    let use_bmi = mesure.bmi;
    if (!isNaN(mesure.bmi_ref)) {
        use_bmi = mesure.bmi_ref;
    }


    return {
        patient,
        mesure: {
            ...mesure,
            most_accurate_formula: mostAccurateFormula(patient.gender, use_bmi)
        }
    }
}


const bmi_weight = ({ patient, mesure }) => {
    let calculated_fields = {};

    if (mesure) {
        if (!is_nil(mesure.weight) && !is_nil(mesure.height)) {

            calculated_fields = {
                bmi: bmi(mesure.weight, mesure.height),
                ideal_weight: ideal_weight(patient.gender, mesure.height),

            };


        }
    }


    return {
        patient,
        mesure: {
            ...mesure,
            ...calculated_fields
        }
    }
}


export const normalize_mesure = compose(best_formula, bmi_weight);

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

    if (patient_id && mesure_id) {


        return (dispatch, getState) => {
            let state = baseSelector(getState());

            let edited_mesure;

            let patient = state.patient[patient_id]
            let mesures = [...patient.mesures];

            edited_mesure = state.mesure[patient_id].mesure || null;
            const bia_report_columns = state.report_settings.bia_report_columns;
            if (edited_mesure) {
                mesures = mesures.reduce((carry, item, idx) => {
                    if (idx == mesure_id) {
                        carry.push(edited_mesure)
                    } else {
                        carry.push(item);
                    }

                    return carry;

                }, [])
            }


            const results = mesures.map(mesure => {
                const { mesure: normalized_mesure } = normalize_mesure({ patient, mesure })
                return {
                    ...normalized_mesure,
                    bia: recompute(patient, normalized_mesure, bia_report_columns, normes)
                }

            })


            return dispatch({
                type: UPDATE_RECAP,
                payload: {
                    patient_id: patient.id,
                    recap: bia_to_recap(results, bia_report_columns, normes),
                }
            })

        }

    }else{
        return {type:'ERROR'}
    }
};


const bia_to_recap = (mesures, columns, normes) => {
    return columns.map(column => {

        let r = {};
        r['label'] = column;
        r['values'] = {};
        r['limits'] = {};

        //temp // applying norms 
        if (normes[column]) {
            const [min, max] = normes[column];
            r['values']['norme'] = `${min}-${max}`;
        }


        r = mesures.reduce((carry, mesure) => {
            if (mesure.bia) {
                const biaByKey = mesure.bia.reduce((result, field) => {
                    result[field['label']] = field;
                    return result
                }, {})

                if (biaByKey) {
                    carry.values[mesure.date] = biaByKey[column].values[mesure.most_accurate_formula];
                    if (normes[column]) {
                        const [min, max] = normes[column];
                        carry['limits'] = x => {
                            if (x < min)
                                return -1
                            if (x > max)
                                return -1
                            return 1
                        };

                    }
                }
            }
            /*
            if (mesures[item][column]) {
                carry['values'][item] = mesures[item][column].value
                carry['logs'][item] = mesures[item][column].log
                carry['display'] = mesures[item][column].display;
                if (normes[column]) {
                    const [min, max] = normes[column];
                    carry['limits'][item] = x => {
                        if (x < min)
                            return -1
                        if (x > max)
                            return -1
                        return 1
                    };

                }
            }*/

            return carry;

        }, r);
        return r;
    });
}


const recompute = (patient, mesure, bia_result_columns, normes) => {

    let results = calculate({ ...patient, ...mesure });


    return formula_result_to_bia_summary(results, bia_result_columns, normes);

}


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




/**
 * Transforms a raw formula result into a consumable array in display order
 *  */

const formula_result_to_bia_summary = (results, columns, normes) => {

    const items = Object.keys(results);


    let consumable_columns = columns;

    if (!consumable_columns) {

        consumable_columns = Object.keys(results).reduce((carry, key) => {

            let k = Object.keys(results[key]);
            for (let i = 0; i < k.length; i++) {
                if (carry.indexOf(k[i]) === -1) {
                    carry.push(k[i])
                }
            }

            return carry;
        }, [])

    }


    return consumable_columns.map(column => {

        let r = {};
        r['label'] = column;
        r['values'] = {};
        r['limits'] = {};
        r['logs'] = {};

        //temp // applying norms 
        if (normes[column]) {
            const [min, max] = normes[column];
            r['values']['norme'] = `${min}-${max}`;
        }


        r = items.reduce((carry, item) => {

            if (results[item][column]) {
                carry['values'][item] = results[item][column].value
                carry['logs'][item] = results[item][column].log
                carry['display'] = results[item][column].display;
                if (normes[column]) {
                    const [min, max] = normes[column];
                    carry['limits'][item] = x => {
                        if (x < min)
                            return -1
                        if (x > max)
                            return -1
                        return 1
                    };

                }
            }

            return carry;

        }, r);
        return r;
    });

}


