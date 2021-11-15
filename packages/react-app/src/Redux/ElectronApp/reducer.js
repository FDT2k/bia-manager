import {combineReducers, createReducer} from '@karsegard/react-redux';

import { is_nil,pop } from '@karsegard/composite-js';

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


    module.fileReducer = createReducer({ file: null,saving:false,opening:false,last_saved:null }, {
        [action_types.SAVING]:(state,{payload})=>({...state,saving:true}),
        [action_types.OPEN_FILE_SUCCESS]: (state, { payload }) => ({ ...state, file: (is_nil(payload.file))? '': payload.file,saving:false }),
        [action_types.SAVE_FILE_SUCCESS]: (state, { payload }) => ({ ...state, file: (is_nil(payload.file))? '': payload.file,last_saved:new Date(),saving:false }),
        [action_types.CLOSE_FILE]: (state, { payload }) => ({ ...state, file: "", last_saved:null,saving:false })
    });


    module.backends = combineReducers({
        dexie:submodules.backends.dexie.reducer,
        sqlite:submodules.backends.sqlite.reducer
    })

    module.features = combineReducers({
        search:submodules.features.search.reducer,
        create:submodules.features.create.reducer,
        editor:submodules.features.editor.reducer,
        lists:submodules.features.lists.reducer,
        form_settings: submodules.features.form_settings.reducer,
        list_editor: submodules.features.list_editor.reducer
    })

    

    module.backend = createReducer("dexie",{
        [action_types.SET_BACKEND]: (state,action) => action.payload,
        [action_types.CLOSE_FILE]: (state, { payload }) =>  "dexie"
    })


    module.errors =createReducer([], {
        [action_types.ADD_ERROR]: (state, { payload }) => ( [payload,...state]),
        [action_types.REMOVE_ERROR]: (state, { payload }) => ( pop(state))
    });

    module.reducer = combineReducers({
        backend:module.backend,
        loading:module.loadingReducer,
        fileStatus:module.fileReducer,
        backends:module.backends,
        features: module.features,
        errors: module.errors
    })

    return module;
}