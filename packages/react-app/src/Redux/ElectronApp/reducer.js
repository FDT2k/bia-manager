import { spreadObjectPresentIn, spreadObjectBeginWith, forwardPropsRemovingHeader } from '@karsegard/composite-js/ReactUtils'
import { as_safe_path, enlist, is_nil, map, safe_path } from '@karsegard/composite-js';
import { key, value, keyval } from '@karsegard/composite-js/ObjectUtils';
import { combineReducers } from 'redux';
import createReducer from '@/Redux/utils/create-reducer';
import { updateList, updateProp } from '@/Redux/utils/handlers';

import EMPTY_SUBJECT from '@/references/subject-schema';


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


    module.reducer = combineReducers({
        loading:module.loadingReducer,
        fileStatus:module.fileReducer
    })

    return module;
}