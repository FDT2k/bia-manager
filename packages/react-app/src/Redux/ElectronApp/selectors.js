import { safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';




export default getModule => {
   const { baseSelector,submodules } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});
   
   const module = {};


   module.loadingState = createSelector(baseSelector,state=> state.loading);
   module.fileStatus = createSelector(baseSelector,state=> state.fileStatus);


   module.is_loading = createSelector(module.loadingState,state=> state.loading===true);
   module.loading_message = createSelector(module.loadingState,state=> state.message);

   module.current_file = createSelector(module.fileStatus,state=>state.file);
   module.select_backend = createSelector(baseSelector,state => state.backend)
   module.current_backend = createSelector(module.select_backend,baseSelector,(backend,state) => state.backends[backend])

   module.get_backend_stats= createSelector(module.current_backend,state => state.stats)




   module.subject_form_default_options =submodules.features.options.selectors.default_values;
   module.subject_form_available_options =submodules.features.options.selectors.options;
   module.form_options_loaded =submodules.features.options.selectors.loaded;

   module.edited_subject = submodules.features.create.selectors.select_subject_form;






   module.editor_patient_options = createSelector(submodules.features.options.selectors.options,state => {
      if(state && state.patho){
        return {
           patho: state.patho.data.list
        }
      }else{

         return {
            patho:[]
         }
    }
   });



   return module;

}
