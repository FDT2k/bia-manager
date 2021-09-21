import { createReducer, combineReducers } from '@karsegard/react-redux';


import { enlist, is_nil, safe_path, merge, map, compose } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils'
import { mergeAll } from '@karsegard/composite-js/List'

export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};
    module.available_options = createReducer({
        gender: { path: 'gender'},
        ethno:  { path: 'groups.ethno' },
        patho:  { path: 'groups.patho' },

    }, {

    })

    module.option_reducer = (path, reducer) => (state = { path, data: {} }, action) => {
        const data = reducer(state.data, action);
        const list = safe_path([], 'list', data);
        let default_value = list.reduce((carry, item) => {
            if (item.default === true) {
                carry = item.id;
            }
            return carry;
        }, null);
        if (is_nil(default_value)) {
            default_value = data.list[0] ? data.list[0].id : '';
        }

        return {
            path,
            data,
            default_value
        }
    }




    const fn = compose(merge, map(module.option), enlist);

    module.options = createReducer({}, {
        [types.FETCHED_OPTIONS]: (state = {}, action) => {
            const { payload: { available_options } } = action;
            return   mergeAll(enlist(action.payload.subactions).map(item => {
                    const [key, value] = keyval(item);

                    const path = available_options[key].path
                    const reducer = submodules.options[key].reducer

                    let result =  { [key]: module.option_reducer(path, reducer)(state[key], value) }
                    return result;
                }))
            


        }
    });


    module.loaded = createReducer(false, {
        [types.FETCHED_OPTIONS]:()=>true 

    });

    module.reducer = combineReducers({
        loaded:module.loaded,
        available_options: module.available_options,
        options: module.options
    })

    return module;
}