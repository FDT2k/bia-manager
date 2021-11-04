import { updateList, updateProp } from '@/Redux/utils/handlers';
import { reduceListByKeys, enlist, is_nil } from '@karsegard/composite-js';
import { key, value } from '@karsegard/composite-js/ObjectUtils';
import { createReducer } from '@karsegard/react-redux';



export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};



    const initialState = {
        left_side: false,
        machine: 'NUTRIGUARD',
        data: {
            z50: 0,
            a50: 0,
            res50: 0,
            rea50: 0,
            z5: 0,
            a5: 0,
            res5: 0,
            rea5: 0,
            z100: 0,
            a100: 0,
            res100: 0,
            rea100: 0
        }
    }

    module.reducer = (state = initialState, action) => {
        return state
    }



    return module;
}