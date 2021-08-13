
import create from 'Redux/utils/make-action'
import {createPrefixableActionTypes,createActionTypes} from 'Redux/utils/types'



export const ACTION_TYPES = createActionTypes(
    'FETCHED',
    'EDIT',
    'DELETE'
)





export const makeActionTypes =  createPrefixableActionTypes(ACTION_TYPES);



export default (actions_types,selectors) => {

    const actions = {};

    actions.fetch =  create(actions_types.FETCHED);
    actions.edit =  create(actions_types.EDIT);
    actions.delete =  create(actions_types.DELETE);


    return actions;
}