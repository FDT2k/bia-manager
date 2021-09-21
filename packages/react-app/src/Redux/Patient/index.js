import { compose, trace } from '@karsegard/composite-js';
import ItemListModule from '@/Redux/ItemList';
import createModule from '@/Redux/utils/module';
import makeActions, { makeActionTypes } from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';



export default createModule(
    {
     /*   submodules: getModule => {
            const { baseSelector, prefix } = getModule();
            return {
                options: {
                    patho: ItemListModule(compose(state => state.options.pathological_groups.data, baseSelector), `${prefix}_PATHO`),
                    ethno: ItemListModule(compose(state => state.options.ethno_groups.data, baseSelector), `${prefix}_ETHNO`),
                    genders: ItemListModule(compose(state => state.options.genders.data, trace('test'), baseSelector), `${prefix}_GENDER`)
                }
            }
        },*/
        selectors: makeSelectors,
        action_types: getModule => makeActionTypes(getModule().prefix),
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
