import { safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';




export default getModule => {
   const { baseSelector, submodules } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};


   module.loadingState = createSelector(baseSelector, state => state.loading);
   module.fileStatus = createSelector(baseSelector, state => state.fileStatus);


   module.is_loading = createSelector(module.loadingState, state => state.loading === true);
   module.loading_message = createSelector(module.loadingState, state => state.message);

   module.current_file = createSelector(module.fileStatus, state => state.file);
   module.select_backend = createSelector(baseSelector, state => state.backend)
   module.current_backend = createSelector(module.select_backend, baseSelector, (backend, state) => state.backends[backend])

   module.get_backend_stats = createSelector(module.current_backend, state => state.stats)



   module.edited_subject = submodules.features.create.selectors.select_subject_form;





   const sort_by_name = (a, b) => a.name.localeCompare(b.name)


   module.select_form_lists = createSelector(
      [submodules.features.form_settings.selectors.select_forms, submodules.features.lists.selectors.byIds,(state,form_key)=>form_key],
      (settings, lists,form_key) => {
         let forms = settings[form_key].lists;
         let result = forms.map(form => {
            let list = []
            if(lists && lists[form.list]){
               list = lists[form.list].list;//.sort(sort_by_name);
            }
            let default_value;

            

            if(form.default_value){
               default_value = form.default_value
            }else if(list.length >0){
               default_value = list[0].id;
            }

            return {...form,list,default_value }
         });

         return result
      }
   )


   module.current_error = createSelector(baseSelector,state => {
      return (state.errors && state.errors.length> 0) ? state.errors[0] : null
   })

   return module;

}
