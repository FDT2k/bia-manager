import { defaultTo, safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';



export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};


  
   module.file = createSelector(baseSelector, state => state.file);
   module.type = createSelector(baseSelector, state => state.type);
   module.locked = createSelector (baseSelector,state => {
      return state.unlocked ===false

   })
   module.modified = createSelector (baseSelector,state => {
      debugger;
      return state.modified === true

   })
   return module;

}
