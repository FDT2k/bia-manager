import {combineReducers, createReducer} from '@karsegard/react-redux';

import { is_nil,pop } from '@karsegard/composite-js';

export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};




    module.errors =createReducer([], {
        [types.ADD_ERROR]: (state, { payload }) => ( [payload,...state]),
        [types.REMOVE_ERROR]: (state, { payload }) => ( pop(state))
    });

    module.reducer = module.errors;

    return module;
}