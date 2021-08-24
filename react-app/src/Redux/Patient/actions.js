import { createActionTypes, createPrefixableActionTypes } from 'Redux/utils/types';








export const ACTIONS_TYPES = createActionTypes(
    'CREATE',
    'CHANGE',
    'SAVE',
    'RESET'
)




export const makeActionTypes = createPrefixableActionTypes(ACTIONS_TYPES);


export default (getModule) => {

    const { action_types, selectors } = getModule()
    const actions = {};


    return actions;
}



