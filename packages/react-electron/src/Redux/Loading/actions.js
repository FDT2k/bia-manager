import { createAction } from '@karsegard/react-redux';






export default (getModule) => {

    const { types, selectors, submodules } = getModule()

    const actions= {}

    actions.start_loading = createAction(types.LOADING);
    actions.stop_loading = createAction(types.LOADING_DONE);




    return actions;

}



