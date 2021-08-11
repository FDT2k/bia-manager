import { get_bmi, get_ideal_weight, get_most_accurate_formula } from 'references';
import { is_nil, compose, enlist } from '@karsegard/composite-js';
import EMPTY_MESURE from 'references/mesure-schema'
import { formulas, calculate } from 'references/formulas';
import { value } from '@karsegard/composite-js/ObjectUtils';



const clear_bmi_ref =  ({ patient, mesure }) => {

    let bmi_ref = mesure.bmi_ref;
    let bmi = mesure.bmi;
    
 

    if(bmi_ref===bmi){
        bmi_ref="";
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
    
    if (!isNaN(mesure.bmi_ref)) {
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
                pct_ideal_weight:  mesure.weight *100/ideal_weight,
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


export const normalize_mesure = compose(clear_bmi_ref,best_formula, bmi_weight);


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




export const generate_recap_header = (mesure_id,mesures) => {
    let arr = (new Array(6)).fill(' ');
    let start =0 ;
    let end = 0;
    if(mesure_id <= 6){
       start=0;
       end = mesure_id+1;
    }else {
       start = mesure_id -5
       end = mesure_id+1;
    }

   


    let dates =  mesures.map(item=> item.date).slice(start,end);

    for(let i = 0; i < dates.length; i++){
       arr[i]= dates[i];
    }
    return arr;
}



export const bia_to_recap = (mesures, columns, normes={}) => {
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

                if (biaByKey) {
                    carry.values[mesure.date] = biaByKey[column].values[mesure.most_accurate_formula];
                    if (normes &&normes[column]) {
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

            return carry;

        }, r);
        return r;
    });
}


export const recap_to_bar_chart= (recap,_headers)=>{
    
    const recapByDate =  recap.reduce((result, field) => {
        const keys = Object.keys(field.values);
        for(let i= 0; i < keys.length;i++){
            if(!result[keys[i]]){
                result[keys[i]]={name:keys[i]}
            }

            result[keys[i]][field.label] = field.values[keys[i]];
        }

        return result
    }, {})

    return _headers.map(date=>{
        if(recapByDate[date]){
            return recapByDate[date]
        }

        return {};
    })
}