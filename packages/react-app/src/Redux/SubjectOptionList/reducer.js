import { createReducer, combineReducers } from '@karsegard/react-redux';


import {  safe_path } from '@karsegard/composite-js';


export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};


    module.option_reducer = (path, reducer) => (state = { path, data: {} }, action) => {
        const data = reducer(state.data, action);
        const list = safe_path([], 'list', data);
        const default_value = list.reduce((carry, item) => {
            if (item.default === true) {
                carry = item.id;
            }
            return carry;
        }, null);
        return {
            path,
            data,
            default_value
        }
    }


    module.available_options = createReducer([
        {key: 'gender', path: 'gender'},
        {key: 'ethno', path: 'groups.ethno'},
        {key: 'patho', path: 'groups.patho'},

    ], {

    })


    module.options = combineReducers({
        patho: module.option_reducer('groups.patho', submodules.options.patho.reducer),
        ethno: module.option_reducer('groups.ethno', submodules.options.ethno.reducer),
        gender: module.option_reducer('gender', submodules.options.genders.reducer),
    });


    module.reducer = combineReducers({
        available_options: module.available_options,
        options: module.options
    })

    return module;
}