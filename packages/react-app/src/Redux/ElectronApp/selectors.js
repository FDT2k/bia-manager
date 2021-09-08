import { safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';




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

   module.select_backend = createSelector(baseSelector,state => state.backend)
   return module;

}
