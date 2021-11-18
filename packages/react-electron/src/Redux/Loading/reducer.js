import {combineReducers, createReducer} from '@karsegard/react-redux';

import { is_nil,pop } from '@karsegard/composite-js';

export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};



    module.loadingReducer = createReducer(
        {
            loading: false,
            message: ""
        },
        {
            [types.LOADING]: (state, { payload }) => ({ ...state, loading: true, message: (payload || 'Loading') }),
            [types.LOADING_DONE]: (state, { payload }) => ({ ...state, loading: false, message: "" }),

        }
    )


    module.reducer = module.loadingReducer;

    return module;
}