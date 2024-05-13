import { is_type_object } from '@karsegard/composite-js';
import { createAction, createAsyncAction, bindSelectors } from '@karsegard/react-redux';


export default (getModule) => {

    const { types, selectors, submodules } = getModule()

    const actions = {};
    actions.add = createAction(types.ADD_ERROR, payload => {
        let message = {
            title: 'Error',
            message: null,
        }
        if (is_type_object(payload)) {
            if (payload.message) {
                message.message = payload.message;
            }
            if (payload.title) {
                message.title = payload.title;

            }
        }else{
            message.message = payload;
        }

        return message;
    })
    actions.dismiss = createAction(types.REMOVE_ERROR)

    return actions;

}



