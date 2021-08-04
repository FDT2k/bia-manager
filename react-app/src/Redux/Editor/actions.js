
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
        r = items.reduce( (carry,item)=> {
           
            if(results[item][key]){
                carry['values'][item] = results[item][key].value
                carry['display'] =   results[item][key].display;
            }

            return carry;

        },r );
        return r;
    });

}


