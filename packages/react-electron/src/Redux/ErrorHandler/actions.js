import { is_type_object } from '@karsegard/composite-js';
import { createAction, createAsyncAction, bindSelectors } from '@karsegard/react-redux';


export default (getModule) => {

    const { types, selectors, submodules } = getModule()

    const actions = {};
    actions.add = createAction(types.ADD_ERROR,payload=>{
        if(is_type_object(payload) && payload.message) {
            return payload.message
        }

        return payload;
    })
    actions.dismiss = createAction(types.REMOVE_ERROR)

    return actions;

}



