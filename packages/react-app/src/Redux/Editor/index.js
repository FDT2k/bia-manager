import { compose } from '@karsegard/composite-js';
import Normes from '@/Redux/Normes';
import FDS from '@/Redux/FDS';
import RecapFDS from '@/Redux/RecapFDS';
import createModule from '@/Redux/utils/module';
import makeActions from './actions';
import makeReducer from './reducer';
import makeSelectors from './selectors';
import makeActionTypes from './types';




export default createModule(
    {
        submodules: getModule => {
            const { baseSelector, prefix } = getModule();
            return {
                normes: Normes(compose(state => state.normes, baseSelector),`${prefix}_NORMES`),
                fds: FDS(compose(state => state.fds, baseSelector),`${prefix}_FDS`),
                recap_fds: RecapFDS(compose(state => state.recap_fds, baseSelector),`${prefix}_RECAP_FDS`)
                /*sportRate: ItemListModule(compose(state => state.options.sportRate.data, baseSelector), `${prefix}_SPORT_RATE`),
                sportType: ItemListModule(compose(state => state.options.sportType.data, baseSelector), `${prefix}_SPORT_TYPE`),
                machines: ItemListModule(compose(state => state.options.machines.data, baseSelector), `${prefix}_MACHINE`)*/
            }
        },
        selectors: makeSelectors,
        action_types: makeActionTypes,
        actions: makeActions,
        reducers: makeReducer,
        reducer: getModule => getModule().reducers.reducer
    }
);
