
import createReducer from 'Redux/utils/create-reducer'
import {ADD_SEARCH_TAG,DEL_SEARCH_TAG} from './actions';

import {delFromList,addToListUniq} from 'Redux/utils/handlers';

export const search_terms = createReducer([],{
    [ADD_SEARCH_TAG]: addToListUniq,
    [DEL_SEARCH_TAG]: delFromList
});


export default search_terms;
