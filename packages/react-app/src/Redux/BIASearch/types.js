import { createActionTypes, createPrefixableActionTypes } from '@/Redux/utils/types';

export const ACTIONS_TYPES = createActionTypes(
    'CLEAR',
    'ADD_SEARCH_TAG',
    'EDIT_MESURE',
    'DEL_SEARCH_TAG',
    'UPDATE_SEARCH_TAGS',
    'FETCHED_PATIENTS',
    'FETCHED_PATIENTS_FAIL',
    'SEARCH_PATIENT',
    'FETCHING_FROM_DATABASE',
    'FILTER_PATIENTS',
    'REMOVE_FILTER',
)




export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default makeActionTypes