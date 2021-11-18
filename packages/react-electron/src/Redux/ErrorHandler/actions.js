import { createAction, createAsyncAction, bindSelectors } from '@karsegard/react-redux';


export default (getModule) => {

    const { types, selectors, submodules } = getModule()

    const actions = {};
    actions.add = createAction(types.ADD_ERROR)
    actions.dismiss = createAction(types.REMOVE_ERROR)

    return actions;

}



