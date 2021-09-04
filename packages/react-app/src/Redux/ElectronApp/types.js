import { createActionTypes, createPrefixableActionTypes } from '@/Redux/utils/types';

export const ACTIONS_TYPES = createActionTypes(
    'OPEN_FILE',
    'OPEN_FILE_SUCCESS',
    'OPEN_FILE_FAILS',
    'SAVE',
    'SAVE_AS',
    'LOADING',
    'LOADING_DONE'
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default makeActionTypes
