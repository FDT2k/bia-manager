import { defaultTo, safe_path } from '@karsegard/composite-js';
import { createSelector } from 'reselect';




export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});
   
   const module = {};


   module.loadingState = createSelector(baseSelector,state=> state.loading);
   module.fileStatus = createSelector(baseSelector,state=> state.fileStatus);


   module.is_loading = createSelector(module.loadingState,state=> state.loading===true);
   module.loading_message = createSelector(module.loadingState,state=> state.message);

   module.current_file = createSelector(module.fileStatus,state=>state.file);


   return module;

}
