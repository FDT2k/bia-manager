import { defaultTo, safe_path } from '@karsegard/composite-js';
import { createSelector } from 'reselect';




export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});
   
   const module = {};


   module.select_available_options = key => createSelector(baseSelector,state=> state.options[key])

   module.select_subject_form = createSelector(baseSelector,state=>state.subject_form)
   module.select_empty_subject = createSelector(baseSelector,state=>state.empty_subject.current)
   return module;

}
