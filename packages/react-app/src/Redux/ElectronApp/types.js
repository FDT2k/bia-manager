import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(
    'SET_BACKEND',
    'SAVING',
    'API_CALL_SUCCESS',
    'API_CALL_ERROR',
    'API_CALL_STARTED',
    'OPEN_CANCELED_BY_USER',
    'OPEN_FILE',
    'OPEN_FILE_SUCCESS',
    'SAVE_FILE_SUCCESS',
    'OPEN_FILE_FAILS',
    'SAVE',
    'SAVE_AS',
    'LOADING',
    'LOADING_DONE',
    'INIT',
    'CLOSE_FILE',
    'ADD_ERROR',
    'REMOVE_ERROR',
    
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default makeActionTypes
