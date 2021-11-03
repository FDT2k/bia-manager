import {makeActionCreator as create ,makeAsyncActionCreator as createAsync} from '@karsegard/react-redux'
import { createAction } from '@reduxjs/toolkit';


export default (getModule) => {

    const { types, selectors } = getModule()


    const actions = {};


actions.update = createAction(types.UPDATE)

    return actions;
}



