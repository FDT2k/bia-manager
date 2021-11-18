import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(

    'LOADING',
    'LOADING_DONE',
    
    
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default makeActionTypes
