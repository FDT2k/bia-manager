import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(
    'OPEN',
    'CLOSE',
    'MODIFIED',
    'UNLOCK'
    
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default  getModule => makeActionTypes(getModule().prefix)
