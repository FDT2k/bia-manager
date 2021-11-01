import { createActionTypes, createPrefixableActionTypes } from '@/Redux/utils/types';

export const ACTIONS_TYPES = createActionTypes(
    'CLEAR',
    'UPDATE_SEARCH_TAGS',
    'FETCHED_PATIENTS',
    'FILTER_PATIENTS',
    'REMOVE_FILTER',
)




export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default makeActionTypes