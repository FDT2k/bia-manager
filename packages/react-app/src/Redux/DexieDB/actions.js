import {createAction, createAsyncAction}from '@karsegard/react-redux';


export default (getModule) => {

    const { action_types, selectors } = getModule()
    const actions = {};


    actions.set_db = createAction(action_types.SET_DB_NAME)
   

    return actions;
}



