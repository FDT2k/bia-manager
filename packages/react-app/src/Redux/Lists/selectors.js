import { defaultTo, safe_path } from '@karsegard/composite-js';
import {createSelector} from '@karsegard/react-redux';



export default getModule => {
   const { baseSelector, submodules } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});
   
   const module = {...submodules.collection.selectors};

   module.base = createSelector(baseSelector,state=>state);


   return module;

}
