
import createReducer from 'Redux/utils/create-reducer'
import {combineReducers} from 'redux'
import {EDIT_PATIENT,CHANGE_MESURE,CREATE_MESURE,EDIT_MESURE,RECOMPUTE_MESURE,UPDATE_RECAP} from './actions';

import {delFromList,addToListUniq,delObjectProp,updateProp} from 'Redux/utils/handlers';
import { actions } from 'react-table/dist/react-table.development';

export const machines = createReducer(['Nutriguard'],{

});

export const physical_act = createReducer(['élevée'],{

});
export const type_act = createReducer(['endurance','muscu'],{

});


export const examinators = createReducer(['Fabien','Bob'],{

});


export const current_patient_id = createReducer(-1,{
    [EDIT_PATIENT]: (state,{payload})=> payload.id
});


export const current_mesure_id = createReducer(-1,{
    [EDIT_MESURE]: (state,{payload})=> payload.mesure_id
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


export const recap = createReducer({},{
    [UPDATE_RECAP]: (state,action)=> {
        return {
            [action.payload.patient_id]: [...action.payload.recap]
        }
    }
});


export const patient = createReducer({},{
    [EDIT_PATIENT]: (state,{payload})=> updateProp(payload.id,state,payload),
})


export const report_settings=createReducer({
    bia_result_columns: [
        'ht2r',
        'density',
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
     
    ]
},{

})



export const reducer = combineReducers({
    current_patient_id,
    current_mesure_id,
    machines,
    examinators,
    mesure,
    patient,
    recap,
    physical_act,
    type_act,
    report_settings

});


export default reducer;
