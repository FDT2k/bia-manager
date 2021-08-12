import {createSelector} from 'reselect';
import {defaultTo} from '@karsegard/composite-js'


export default baseSelector => {

    const defaultToArray = defaultTo([]);
    const defaultToObject = defaultTo({});
    const module = {};


    module.select_list = createSelector(baseSelector,state=> defaultToArray(state));



    return module;
}
