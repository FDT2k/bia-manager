import createAction from '@/Redux/utils/make-action';
import { createActionTypes, createPrefixableActionTypes } from '@/Redux/utils/types';
import { normalize as normalize_subject } from '@/references/Patient';

export const ACTIONS_TYPES = createActionTypes(
    'SAVE_PATIENT',
    'CREATE_PATIENT',
    'CREATE_MESURE',
    'DELETE_MESURE',
    'SAVE_MESURE',
    'DELETE_PATIENT'
)

export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);

export default (getModule) => {

    const { action_types, selectors } = getModule()
    const actions = {};

   

    return actions;
}



