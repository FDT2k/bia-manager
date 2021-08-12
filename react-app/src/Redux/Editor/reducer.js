
import createReducer from 'Redux/utils/create-reducer'
import {combineReducers} from 'redux'
import {EDIT_PATIENT,CHANGE_MESURE,CREATE_MESURE,EDIT_MESURE,SELECT_MESURE,RECOMPUTE_MESURE,UPDATE_RECAP} from './actions';

import {delFromList,addToListUniq,delObjectProp,updateProp} from 'Redux/utils/handlers';


import  PhysicalActivityModule from 'Redux/ItemList';


/*

export const machines = createReducer(['Nutriguard'],{

});

export const physical_act = createReducer(['élevée'],{

});

export const type_act = createReducer(['endurance','muscu'],{

});


export const examinators = createReducer(['Fabien','Bob'],{

});
*/

export const current_patient_id = createReducer(-1,{
    [EDIT_PATIENT]: (state,{payload})=> payload.id
});


export const current_mesure_id = createReducer(-1,{
    [EDIT_MESURE]: (state,{payload})=> payload.mesure_id,
    [SELECT_MESURE]:  (state,{payload})=> payload.mesure_id
});

export const mesure = createReducer({},{
    [EDIT_MESURE]: (state,{payload})=> updateProp(payload.id,state,payload),
    [CREATE_MESURE]: (state,{payload})=> updateProp(payload.id,state,payload),
    [RECOMPUTE_MESURE]: (state,{payload}) => updateProp(payload.id,state,{
        ...state[payload.id],
        mesure: {
            ...state[payload.id].mesure,
            bia:payload.bia
        }
    }),
    [CHANGE_MESURE]: (state,{payload}) => updateProp(payload.id,state,{
        ...state[payload.id],
        mesure: {
            ...state[payload.id].mesure,
            ...payload.mesure
        }
    }),

});


export const recap_headers = createReducer([],{
    [UPDATE_RECAP]: (state,{payload})=>{ 
        return [...payload.headers.map(item=>item.toString())]
        
    }
    
})
export const recap_list = createReducer([],{
    [UPDATE_RECAP]: (state,{payload})=>{ 
        return [...payload.recap]
        
    }
})

export const recap_mass_chart = createReducer([],{
    [UPDATE_RECAP]: (state,{payload})=>{ 
        return [...payload.chart]
        
    }
})


export const recap = createReducer({},{
    [EDIT_PATIENT]: (state,{payload})=> updateProp(payload.id,state,{headers:[],list:[]}),
    [UPDATE_RECAP]: (state,action)=> {
        return {
            [action.payload.patient_id]: {
                headers: recap_headers(state.headers,action),
                list: recap_list(state.headers,action),
                mass_chart: recap_mass_chart(state.mass_chart,action),
            }
        }
    }
});

export const patient = createReducer({},{
    [EDIT_PATIENT]: (state,{payload})=> updateProp(payload.id,state,payload),
})


export const report_settings=createReducer({
    bia_result_columns: [
        'water',
        'pct_water',
        'ffm',
        'pct_ffm',
        'ffmi',
        'dffm',
        'pct_dffm',
        'fm',
        'pct_ffm',
        'fmi',
        'lf_ratio'
    ],
    bia_report_columns:[
        'water',
        'pct_water',
        'ffm',
        'pct_ffm',
        'ffmi',
        'dffm',
        'pct_dffm',
        'fm',
        'pct_ffm',
        'fmi',
     
    ],
    bia_report_chart_columns:[
        'ffm',
        'ffmi',
        'fm',
        'fmi',
     
    ]
},{

})



export const reducer = combineReducers({
 /*   physical_act,
    type_act,
    machines,
    examinators,*/
    current_patient_id,
    current_mesure_id,
    mesure,
    patient,
    recap,
    report_settings

});


export default reducer;
