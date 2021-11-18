import { safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';
import { format } from 'date-fns';


import formatDistance from 'date-fns/formatDistance';
import eoLocale from 'date-fns/locale/fr'
export default getModule => {
   const { baseSelector, submodules } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};


   module.loadingState = createSelector(baseSelector, state => state);


   module.is_loading = createSelector(module.loadingState, state => state.loading === true);
   module.message = createSelector(module.loadingState, state => state.message);

   return module;

}
