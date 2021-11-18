import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(

    'ADD_ERROR',
    'REMOVE_ERROR',
    
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default makeActionTypes
