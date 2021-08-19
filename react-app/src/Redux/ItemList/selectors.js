import { safe_path } from '@karsegard/composite-js';
import { createSelector } from 'reselect';


export default baseSelector => {

    const module = {};

    const safePathArray = safe_path([])

    module.select_list = createSelector(baseSelector, state =>safePathArray('list',state));



    return module;
}
