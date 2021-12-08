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


   module.files = createSelector(baseSelector,state => state.files.map(hash=>{
      return {...state.byHash[hash],message:state.status[hash]}
   }));
   module.status = createSelector(baseSelector,state => state.status);
   module.hashes = createSelector(baseSelector,state=> state.files);

   module.files_by_hashes = createSelector(baseSelector, state=> state.byHash)
   return module;

}
