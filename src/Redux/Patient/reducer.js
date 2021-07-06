
import createReducer from 'Redux/utils/create-reducer'
import {combineReducers} from 'redux'
import {ADD_SEARCH_TAG,DEL_SEARCH_TAG} from './actions';
import {SEARCH_PATIENT,CREATE_PATIENT,UPDATE_PATIENT,DELETE_PATIENT} from './actions';

import {delFromList,addToListUniq,delObjectProp,updateProp} from 'Redux/utils/handlers';

export const search_terms = createReducer([],{
    [ADD_SEARCH_TAG]: addToListUniq,
    [DEL_SEARCH_TAG]: delFromList
});


export const patients = createReducer({},{
    [CREATE_PATIENT]: (state,action)=> updateProp(action.id,state,action.payload),
    [UPDATE_PATIENT]: (state,action)=> updateProp(action.id,state,action.payload),
    [DELETE_PATIENT]: (state,action)=> delObjectProp(state,action.id)
});





export const reducer = combineReducers({
    search_terms,
    patients
})
export default reducer;
