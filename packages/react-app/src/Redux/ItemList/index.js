import { identity } from '@karsegard/composite-js';
import makeActions, { makeActionTypes } from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';



export default (baseSelector = identity, prefix = '') => {
    const module = {};


    module.selectors = makeSelectors(baseSelector);

    module.actions_types = makeActionTypes(prefix);

    module.actions = makeActions(module.actions_types, module.selectors);

    module.reducer = makeReducer(module.actions_types);


    return module;

}