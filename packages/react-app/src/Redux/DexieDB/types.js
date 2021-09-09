import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';


export const ACTIONS_TYPES = createActionTypes(

    'ADD_ERROR',

    'API_CALL_SUCCESS',
    'API_CALL_ERROR',
    'API_CALL_STARTED',

    'SET_DB_NAME',

    'UPDATE_STAT',


    'CLEAR_DATABASE',
    'IMPORT_DATABASE',


    'SAVE_PATIENT',
    'CREATE_PATIENT',
    'DELETE_PATIENT',
    'SEARCH_PATIENT',
    
    'CREATE_MESURE',
    'DELETE_MESURE',
    'SAVE_MESURE',

)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);
export default makeActionTypes


