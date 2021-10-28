import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';



export const ACTIONS_TYPES = createActionTypes(
    'EDIT_PATIENT',
    'ADDED_PATIENT',
    'EDIT_MESURE',
    'SELECT_MESURE',
    'CREATE_MESURE',
    'RECOMPUTE_MESURE',
    'UPDATE_RECAP',
    'CHANGE_MESURE',
    'CHANGE_SUBJECT',
    'ATTEMPT_REFRESH_RECAP',
    'RECAP_PATIENT_NOT_LOADED',

    'ERROR_EDIT_PATIENT_UNDEF',
    'ERROR_ADD_PATIENT_UNDEF',
    'SAVE',
    'DELETE_MESURE',
    'INIT',
    'SET_EXAMINATOR',

)



export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);


export default  getModule => makeActionTypes(getModule().prefix)
