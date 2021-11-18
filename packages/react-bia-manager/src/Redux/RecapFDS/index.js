import {createModule} from '@karsegard/react-redux';

import makeActionTypes from './types';
import makeActions from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';
import makeSubmodules from './submodules';


export default createModule(
    {
        submodules: makeSubmodules,
        selectors: makeSelectors,
        types: makeActionTypes,
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
