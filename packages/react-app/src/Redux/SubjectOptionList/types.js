import { createActionTypes, createPrefixableActionTypes } from '@karsegard/react-redux';

export const ACTIONS_TYPES = createActionTypes(
   'FETCHED_OPTIONS',
   'SET_AVAILABLE_OPTIONS'
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default  getModule => makeActionTypes(getModule().prefix)
