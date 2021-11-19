import { makeActionCreator as create, makeAsyncActionCreator as createAsync } from '@karsegard/react-redux'
import { createAction } from '@reduxjs/toolkit';


export default (getModule) => {

    const { types, selectors } = getModule()


    const actions = {};


    actions.open = createAction(types.OPEN)
    actions.close = createAction(types.CLOSE)
    actions.modified = createAction(types.MODIFIED)
    return actions;
}



