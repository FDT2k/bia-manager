
import createReducer from 'Redux/utils/create-reducer'
import {combineReducers} from 'redux'
import {ADD_SEARCH_TAG,DEL_SEARCH_TAG,UPDATE_SEARCH_TAGS} from './actions';
import {SEARCH_PATIENT,CREATE_PATIENT,UPDATE_PATIENT,DELETE_PATIENT,FETCHED_PATIENTS} from './actions';

import {delFromList,addToListUniq,delObjectProp,updateProp} from 'Redux/utils/handlers';

export const search_terms = createReducer([],{
    [ADD_SEARCH_TAG]: addToListUniq,
    [UPDATE_SEARCH_TAGS]: (state,action)=> [...action.payload],
    [DEL_SEARCH_TAG]: delFromList
});


export const patients = createReducer({byIds:{},allIds:[]},{
    [FETCHED_PATIENTS]: (state,action)=> {
        return {
            byIds: action.payload.reduce((carry,item)=>{
                                                carry[item.PatientUuid]=item;
                                                return carry;
                                            },{}),
            allIds: action.payload.map(item=>item.PatientUuid)
        }
    },
    [CREATE_PATIENT]: (state,action)=> updateProp(action.id,state,action.payload),
    [UPDATE_PATIENT]: (state,action)=> updateProp(action.id,state,action.payload),
    [DELETE_PATIENT]: (state,action)=> delObjectProp(state,action.id)
});





export const reducer = combineReducers({
    search_terms,
    patients
})
export default reducer;
