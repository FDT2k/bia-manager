
import createReducer from 'Redux/utils/create-reducer'
import {combineReducers} from 'redux'
import {EDIT_PATIENT,CREATE_MESURE,EDIT_MESURE,RECOMPUTE_MESURE} from './actions';

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



export const mes = createReducer({},{
    [RECOMPUTE_MESURE]: (state,{payload}) => updateProp('bia',state,payload),
})


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
});


export const patient = createReducer({},{
    [EDIT_PATIENT]: (state,{payload})=> updateProp(payload.id,state,payload),
})



export const reducer = combineReducers({
    machines,
    examinators,
    mesure,
    patient,
    physical_act,
    type_act

});


export default reducer;
