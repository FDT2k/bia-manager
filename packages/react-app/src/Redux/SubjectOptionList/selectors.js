import { defaultTo, safe_path, enlist } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { createSelector } from '@karsegard/react-redux';
import { Options } from 'react-ionicons';



export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};


   module.default_values = createSelector(baseSelector, state => {
      let result = enlist(state.options).reduce((carry, item) => {
         const [name, value] = keyval(item);
         const { path, default_value } = value;
         carry[name] = { path, default_value };
         return carry;
      }, {})

      return result;
   });
   module.available_options = createSelector(baseSelector,state=> state.options);
   return module;

}
