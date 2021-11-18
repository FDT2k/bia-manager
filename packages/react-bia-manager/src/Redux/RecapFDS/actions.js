import {makeActionCreator as create ,makeAsyncActionCreator as createAsync} from '@karsegard/react-redux'
import { createAction } from '@reduxjs/toolkit';


export default (getModule) => {

    const { types, selectors } = getModule()


    const actions = {};


    actions.update_mesure = createAction(types.UPDATE_MESURE)

    actions.add_mesure = createAction(types.ADD_MESURE)

    actions.clear = createAction(types.CLEAR);
    actions.refresh = createAction(types.REFRESH);
    return actions;
}



