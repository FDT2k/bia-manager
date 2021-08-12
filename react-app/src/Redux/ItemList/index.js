import { identity } from '@karsegard/composite-js';
import makeSelectors from './selectors';
import makeActions,{makeActionTypes} from './actions';
import makeReducer from './reducer';



export default (baseSelector=identity,prefix='') => {
    const module = {};


    module.selectors = makeSelectors(baseSelector);

    module.actions_types = makeActionTypes(x=>`${prefix}${x}`);

    module.actions = makeActions(module.actions_types,module.selectors);

    module.reducer = makeReducer(module.actions_types);


    return module;

}