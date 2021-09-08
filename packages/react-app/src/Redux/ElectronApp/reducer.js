import {combineReducers, createReducer} from '@karsegard/react-redux';



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
        [action_types.OPEN_FILE_SUCCESS]: (state, { payload }) => ({ ...state, ...payload })
    });


    module.backends = combineReducers({
        dexie:submodules.backends.dexie.reducer
    })

    module.reducer = combineReducers({
        loading:module.loadingReducer,
        fileStatus:module.fileReducer,
        backends:module.backends
    })

    return module;
}