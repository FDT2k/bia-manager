
import create from 'Redux/utils/make-action'
import {createAction} from '@reduxjs/toolkit'
import {compare, item_prop_is_equal} from '@karsegard/composite-js/List'
import createAsyncAction,{makePromiseDispatcher} from 'Redux/utils/async-dispatch'

import {formulas,calculate} from 'references/formulas';



export const EDIT_PATIENT = 'EDIT_PATIENT';
export const EDIT_MESURE = 'EDIT_MESURE';
export const RECOMPUTE_MESURE = 'RECOMPUTE_MESURE';



export const edit_patient = create(EDIT_PATIENT);
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
                carry['values'][item] = results[item][key]
            }

            return carry;

        },r );
        return r;
    });

}



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
            }
        })

    }
}

