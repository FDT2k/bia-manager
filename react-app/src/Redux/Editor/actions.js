
import create from 'Redux/utils/make-action'
import {createAction} from '@reduxjs/toolkit'
import {compare, item_prop_is_equal} from '@karsegard/composite-js/List'
import createAsyncAction,{makePromiseDispatcher} from 'Redux/utils/async-dispatch'

import {formulas,calculate} from 'references/formulas';
import { spec } from '@karsegard/composite-js/ObjectUtils';
import EMPTY_MESURE from 'references/mesure-schema'


export const EDIT_PATIENT = 'EDIT_PATIENT';
export const EDIT_MESURE = 'EDIT_MESURE';
export const CREATE_MESURE = 'CREATE_MESURE';
export const RECOMPUTE_MESURE = 'RECOMPUTE_MESURE';



export const edit_patient = create(EDIT_PATIENT);


export const make_create_mesure = baseSelector => (patient_id,mesure_id)=> {

    return (dispatch,getState)=>{
        let state = baseSelector(getState());
        return dispatch({
            type:CREATE_MESURE,
            payload:{         
                id: patient_id,   
                mesure: EMPTY_MESURE,
                mesure_id:state.patient[patient_id].mesures.length
            }
        })

    }
};


export const make_edit_mesure = baseSelector => (patient_id,mesure_id)=> {

    return (dispatch,getState)=>{
        let state = baseSelector(getState());
        return dispatch({
            type:EDIT_MESURE,
            payload:{         
                id: patient_id,   
                mesure: state.patient[patient_id].mesures[mesure_id],
                mesure_id
            }
        })

    }
};


export const make_recompute_mesure = baseSelector => (patient_id,values)=> {

    return (dispatch,getState)=>{
        let state = baseSelector(getState());

        const patient = state.patient[patient_id];

        let results = calculate({...patient,...values});

        return dispatch({
            type:RECOMPUTE_MESURE,
            payload:{         
                id: patient_id,   
                bia: reduce_results(results),
                raw_bia: results
            }
        })

    }
}

export const make_actions = spec({
    edit_mesure: make_edit_mesure,
    recompute_mesure: make_recompute_mesure,
    create_mesure: make_create_mesure
})



const normes = {

    'pct_water': [55.0,67.6],
    'pct_mm': [73.2,89.0],
    'pct_net_mm': [19.7,23.3],
    'pct_mg': [11.0,26.8],
    'fmi': [2.2,7.0],
    'ffmi': [16.8,21.1],

}

const reduce_results = (results )=> {

    const items = Object.keys(results);    

    const keys = Object.keys(results).reduce( (carry,key)=>{
        
        let k = Object.keys(results[key]);
        for(let i= 0 ; i < k.length; i++){
            if(carry.indexOf(k[i])===-1){
                carry.push(k[i])
            }
        }

        return carry;
    },[] )
    

    return keys.map( key => {

        let r = [];
        r['label'] = key;
        r['values'] = {};
        r['limits'] = {};
        r['logs'] = {};

        //temp // applying norms 
        if(normes[key]){
            const [min,max]= normes[key];
            r['values']['norme'] = `${min}-${max}`;
        }

    
        r = items.reduce( (carry,item)=> {
           
            if(results[item][key]){
                carry['values'][item] = results[item][key].value
                carry['logs'][item] = results[item][key].log
                carry['display'] =   results[item][key].display;
                if(normes[key]){
                    const [min,max] = normes[key];
                    carry['limits'][item]= x => {
                        if(x < min)
                            return -1
                        if(x > max) 
                            return -1
                        return 1
                    };

                }
            }

            return carry;

        },r );
        return r;
    });

}


