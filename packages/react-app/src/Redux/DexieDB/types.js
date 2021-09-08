import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';


export const ACTIONS_TYPES = createActionTypes(
    'SET_DB_NAME',
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


