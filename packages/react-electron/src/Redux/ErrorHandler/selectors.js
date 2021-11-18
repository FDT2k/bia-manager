import { safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';
import { format } from 'date-fns';


export default getModule => {
   const { baseSelector, submodules } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};



   module.current_error = createSelector(baseSelector,state => {
      debugger;
      return (state && state.length> 0) ? state[0] : null
   })

   return module;

}
