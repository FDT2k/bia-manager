import createModule from 'Redux/utils/module'
import {action_type_namespace} from 'Redux/utils/types';
import { identity, compose, enlist } from '@karsegard/composite-js';
import makeSelectors from './selectors';
import makeActions, { makeActionTypes } from './actions';
import makeReducer from './reducer';
import ItemListModule from 'Redux/ItemList';
import { mergeAll } from '@karsegard/composite-js/List';
import { key, spec, value } from '@karsegard/composite-js/ObjectUtils';

/*
export default (baseSelector = identity, prefix = '') => {
    const module = {
        baseSelector,
        prefix
    };


    const getModule = _ => {
        return module;
    }


    module.submodules = {
        physicalActivity: ItemListModule(compose(state => state.physicalActivity, baseSelector), `${prefix}_EDITOR_`)
    }

    module.selectors = makeSelectors(getModule);

    module.actions_types = makeActionTypes(x => `${prefix}${x}`);

    module.actions = makeActions(getModule);

    module.reducers = makeReducer(getModule);

    module.reducer = module.reducers.reducer;


    return module;

}


*/



export default createModule(
    {
        submodules: getModule => {
            const {baseSelector,prefix} = getModule();
            return {
                physicalActivity: ItemListModule(compose(state => state.physicalActivity, baseSelector), `${prefix}PHYSICAL_ACTIVITIES`)
            }
        },
        selectors: makeSelectors,
        action_types: getModule => makeActionTypes(getModule().prefix),
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
