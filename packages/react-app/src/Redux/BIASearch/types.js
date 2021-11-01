import { createActionTypes, createPrefixableActionTypes } from '@/Redux/utils/types';

export const ACTIONS_TYPES = createActionTypes(
    'CLEAR',
    'UPDATE_SEARCH_TAGS',
    'FETCHED_PATIENTS',
    'FILTER_PATIENTS',
    'REMOVE_FILTER',

    'ADD_CUSTOM_FILTER',
    'CLEAR_CUSTOM_FILTER'
)




export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default makeActionTypes