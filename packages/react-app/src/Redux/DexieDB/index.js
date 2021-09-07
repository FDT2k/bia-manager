import { compose } from '@karsegard/composite-js';
import ItemListModule from '@/Redux/ItemList';
import createModule from '@/Redux/utils/module';
import makeActions, { makeActionTypes } from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';



export default createModule(
    {
      
        selectors: makeSelectors,
        action_types: getModule => makeActionTypes(getModule().prefix),
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
