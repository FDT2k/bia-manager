import { compose, is_empty, is_nil,safe_path } from '@karsegard/composite-js';
import { get_bmi, get_ideal_weight, get_most_accurate_formula } from '@/references';
import { calc_age } from '@/references/age';
import { calculate } from '@/references/formulas';

import { v4 as uuidv4 } from 'uuid';


export const fds = () => {
    const sideState = {
        main: false,
        data: {
            0: '',
            1: '',
            2: '',
        },
        avg: '',
        norme: ''
    }
    const initialState = {
        left: {...sideState},
        right: {...sideState}
    }
    return initialState
}


const init_fds = ({patient,mesure})=>{

    let _fds = mesure.fds;
    if(is_empty(_fds)){
        _fds = fds();
    }

    return {
        patient,
        mesure: {
            ...mesure,
            fds:_fds
        }
    }
}

const mesure_age = ({ patient, mesure }) => {


    return {
        patient,
        mesure: {
            ...mesure,
            current_age: calc_age(patient.birthdate, mesure.date)
        }
    }
}


const null_keys = ({ patient, mesure }) => {


    return {
        patient,
        mesure: {
            ...mesure,
            examinator: is_nil(mesure.examinator) ? "" : mesure.examinator,
            comments: is_nil(mesure.comments) ? "" : mesure.comments
        }
    }
}
const clear_bmi_ref = ({ patient, mesure }) => {

    let bmi_ref = mesure.bmi_ref;
    let bmi = mesure.bmi;



    if (bmi_ref === bmi || is_nil(bmi_ref)) {
        bmi_ref = "";
    }

    return {
        patient,
        mesure: {
            ...mesure,
            bmi_ref
        }
    }
}



const best_formula = ({ patient, mesure }) => {

    let use_bmi = mesure.bmi;

    if (!isNaN(mesure.bmi_ref) && mesure.bmi_ref !== "") {
        use_bmi = mesure.bmi_ref;
    }


    return {
        patient,
        mesure: {
            ...mesure,
            most_accurate_formula: get_most_accurate_formula(patient.gender, use_bmi),
        }
    }
}


const bmi_weight = ({ patient, mesure }) => {
    let calculated_fields = {};

    if (mesure) {
        if (!is_nil(mesure.weight) && !is_nil(mesure.height)) {
            const ideal_weight = get_ideal_weight(patient.gender, mesure.height);
            calculated_fields = {
                bmi: get_bmi(mesure.weight, mesure.height),
                ideal_weight,
                pct_ideal_weight: mesure.weight * 100 / ideal_weight,
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

export const status = ({ patient, mesure }) => {
    let status ='active'
    if (mesure) {
        status= mesure.status
        if (is_nil(mesure.status)) {
            status = 'active'
        }
    }
    return ({
        patient, mesure: {
            ...mesure,
            status
        }
    })
}

export const set_uuid = ({patient,mesure})=> {
    let uuid = mesure.uuid;
    if(is_empty(uuid)){
        uuid = uuidv4();
    }
    return {
        patient,
        mesure:{
            ...mesure,
            uuid
        }
    }
}

export const filter_active_mesure = item=> item.status!='deleted';

export const normalize_mesure = compose(init_fds,mesure_age, clear_bmi_ref, best_formula, null_keys, bmi_weight, status,set_uuid);


export const recompute = (patient, mesure, bia_result_columns, normes) => {

    let results = calculate({ ...patient, ...mesure });


    return formula_result_to_bia_summary(results, bia_result_columns, normes);

}


/**
 * Transforms a raw formula result into a consumable array in display order
 * args
 *  results: output from the calculate function 
 *  columns:  array of keys to show
 *  normes: array of values-ranges
 *  */

export const formula_result_to_bia_summary = (results, columns, normes) => {

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
        if (normes && normes[column]) {

            const [min, max] = normes[column];
            r['values']['norme'] = `${min}-${max}`;
        }


        r = items.reduce((carry, item) => {

            if (results[item][column]) {
                carry['values'][item] = results[item][column].value
                carry['logs'][item] = results[item][column].log
                carry['display'] = results[item][column].display;
                if (normes && normes[column]) {
                    const [min, max] = normes[column];
                    carry['limits'][item] = [min, max];

                }
            }

            return carry;

        }, r);
        return r;
    });

}




export const generate_recap_header = (mesure_id, mesures) => {
    let arr = (new Array(6)).fill(' ');
    let start = 0;
    let end = 0;
    if (mesure_id < 6) {
        start = 0;
        end = mesure_id + 1;
    } else {
        start = mesure_id - 5
        end = mesure_id + 1;
    }




    let dates = mesures.map(item => item.date).slice(start, end);

    for (let i = 0; i < dates.length; i++) {
        arr[i] = dates[i];
    }
    return arr;
}



export const bia_to_recap = (mesures, _columns, normes = {}, mesure_columns = []) => {


    const columns = [...mesure_columns, ..._columns];

    return columns.map(column => {

        let r = {};
        r['label'] = column;
        r['values'] = {};
        r['limits'] = {};

        //temp // applying norms 
        if (normes && normes[column]) {
            const [min, max] = normes[column];
            r['values']['norme'] = `${min}-${max}`;
        }

        r = mesures.reduce((carry, mesure) => {
            if (mesure.bia) {
                const biaByKey = mesure.bia.reduce((result, field) => {
                    result[field['label']] = field;
                    return result
                }, {})

                if (biaByKey && biaByKey[column]) {
                    debugger;

                    carry.values[mesure.date] = biaByKey[column].values[mesure.most_accurate_formula];
                    if (normes && normes[column]) {
                        const [min, max] = normes[column];
                        carry['limits'] = x => {
                            if (x < min)
                                return -1
                            if (x > max)
                                return -1
                            return 1
                        };

                    }
                } else if (mesure[column]) {
                    debugger;

                    carry.values[mesure.date] = mesure[column];
                } else {
                    let value = safe_path('-',column,mesure);
                    debugger;
                    carry.values[mesure.date] = value;
                }
            }

            return carry;

        }, r);
        debugger;
        return r;
    });
}


export const recap_to_bar_chart = (recap, _headers) => {

    const recapByDate = recap.reduce((result, field) => {
        const keys = Object.keys(field.values);
        for (let i = 0; i < keys.length; i++) {
            if (!result[keys[i]]) {
                result[keys[i]] = { name: keys[i] }
            }

            result[keys[i]][field.label] = field.values[keys[i]];
        }

        return result
    }, {})

    return _headers.map(date => {
        if (recapByDate[date]) {
            return recapByDate[date]
        }

        return {};
    })
}