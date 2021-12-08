import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(

    'ADD_FILE',
    'ATTACH',
    'DETACH',
    'ERROR',
    'SCANNED'
    
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default getModule => makeActionTypes(getModule().prefix)
