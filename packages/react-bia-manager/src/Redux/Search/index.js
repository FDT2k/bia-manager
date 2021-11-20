
import {createModule} from '@karsegard/react-redux';
import makeActions from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';
import makeActionTypes from './types';




export default createModule(
    {
        selectors: makeSelectors,
        types: makeActionTypes,
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
