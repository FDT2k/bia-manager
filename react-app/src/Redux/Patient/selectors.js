import { defaultTo, safe_path } from '@karsegard/composite-js';
import { createSelector } from 'reselect';




export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});
   
   const module = {};


   module.select_available_options = key => createSelector(baseSelector,state=> state.options[key])

   return module;

}
