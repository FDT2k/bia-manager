import {combineReducers, createReducer} from '@karsegard/react-redux';

import { is_nil } from '@karsegard/composite-js';

export default (getModule) => {

    const { submodules, action_types } = getModule()


    const module = {};



    module.loadingReducer = createReducer(
        {
            loading: false,
            message: ""
        },
        {
            [action_types.LOADING]: (state, { payload }) => ({ ...state, loading: true, message: (payload || 'Loading') }),
            [action_types.LOADING_DONE]: (state, { payload }) => ({ ...state, loading: false, message: "" }),

        }
    )


    module.fileReducer = createReducer({ file: null }, {
        [action_types.OPEN_FILE_SUCCESS]: (state, { payload }) => ({ ...state, file: (is_nil(payload.file))? '': payload.file })
    });


    module.backends = combineReducers({
        dexie:submodules.backends.dexie.reducer
    })

    module.features = combineReducers({
        search:submodules.features.search.reducer
    })

    

    module.backend = createReducer("dexie",{})

    module.reducer = combineReducers({
        backend:module.backend,
        loading:module.loadingReducer,
        fileStatus:module.fileReducer,
        backends:module.backends,
        features: module.features
    })

    return module;
}