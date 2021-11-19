import { reduceListByKeys, enlist, is_nil } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { createReducer } from '@karsegard/react-redux';



export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};

    const initialState = {
        file: null,
        saving: false,
        saved:false,
        opening: false,
        last_saved: null,
        type:'',
        modified:false
    };

    module.reducer = createReducer(initialState, {

        [types.OPEN]: (state, { payload: { file,type,unlocked } }) => ({
            ...state,
            file: (is_nil(file)) ? '' :file, 
            saving: false,
            unlocked,
            modified:false,
            type
        }),

        [types.MODIFIED]: (state, { payload}) => ({ ...state, modified:true }),
        [types.CLOSE]: (state, { payload }) => ({ ...initialState })
    });



    return module;
}