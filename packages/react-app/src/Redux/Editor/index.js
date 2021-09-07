import { compose } from '@karsegard/composite-js';
import ItemListModule from '@/Redux/ItemList';
import createModule from '@/Redux/utils/module';
import makeActions, { makeActionTypes } from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';




export default createModule(
    {
        submodules: getModule => {
            const { baseSelector, prefix } = getModule();
            return {
                sportRate: ItemListModule(compose(state => state.options.sportRate.data, baseSelector), `${prefix}_SPORT_RATE`),
                sportType: ItemListModule(compose(state => state.options.sportType.data, baseSelector), `${prefix}_SPORT_TYPE`),
                machines: ItemListModule(compose(state => state.options.machines.data, baseSelector), `${prefix}_MACHINE`)
            }
        },
        selectors: makeSelectors,
        action_types: getModule => makeActionTypes(getModule().prefix),
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
