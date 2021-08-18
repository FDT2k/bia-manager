import { defaultTo } from '@karsegard/composite-js';
import { createSelector } from 'reselect';


export default baseSelector => {

    const defaultToArray = defaultTo([]);
    const defaultToObject = defaultTo({});
    const module = {};


    module.select_list = createSelector(baseSelector, state => defaultToArray(state));



    return module;
}
