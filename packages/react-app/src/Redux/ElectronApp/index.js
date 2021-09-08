import { compose } from '@karsegard/composite-js';
import ItemListModule from '@/Redux/ItemList';
import createModule from '@/Redux/utils/module';


import makeActionTypes from './types';
import makeActions from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';
import makeSubmodules from './submodules';


export default createModule(
    {
        submodules: makeSubmodules,
        selectors: makeSelectors,
        action_types: getModule => makeActionTypes(getModule().prefix),
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
