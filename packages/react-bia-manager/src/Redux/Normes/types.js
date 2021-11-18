import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(
    'INIT',
    'REFRESH',
    'FETCHED',
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default  getModule => makeActionTypes(getModule().prefix)
