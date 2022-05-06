import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(
    'CLEAR',
    'UPDATE_SEARCH_TAGS',
    'FETCHED',
    'FILTER_PATIENTS',
    'REMOVE_FILTER',

    'ADD_CUSTOM_FILTER',
    'CLEAR_CUSTOM_FILTER',
    'PAGE_CHANGE'
)




export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default  getModule => makeActionTypes(getModule().prefix)