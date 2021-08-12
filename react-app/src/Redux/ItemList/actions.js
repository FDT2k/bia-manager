
import create from 'Redux/utils/make-action'
import {renameActionTypes,createActionTypes} from 'Redux/utils/types'


export const ACTIONS_TYPES = createActionTypes(
    'FETCH',
    'EDIT',
    'DELETE'
)


export const makeActionTypes = renameActionTypes(ACTIONS_TYPES);


export default (actions_types,selectors) => {


    const actions = {};


    actions.fetch =  create(actions_types.FETCH);
    actions.edit =  create(actions_types.EDIT);
    actions.delete =  create(actions_types.DELETE);


    return actions;
}