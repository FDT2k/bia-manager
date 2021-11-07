import { defaultTo, safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';



export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};


   module.select_recap = createSelector(baseSelector, state => state.recap)
   module.select_headers = createSelector(baseSelector, state => state.headers)

   return module;

}
