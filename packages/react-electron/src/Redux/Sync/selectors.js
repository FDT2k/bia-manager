import { safe_path,enlist } from '@karsegard/composite-js';
import { keyval } from '@karsegard/composite-js/ObjectUtils';
import { createSelector } from '@karsegard/react-redux';
import { format } from 'date-fns';


import formatDistance from 'date-fns/formatDistance';
import eoLocale from 'date-fns/locale/fr'
import createEncryptor from 'redux-persist-transform-encrypt';
export default getModule => {
   const { baseSelector, submodules } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};


   module.files = createSelector(baseSelector,state => state.files.map(hash=>{
      return {...state.byHash[hash],message:state.status[hash]}
   }));
   module.status = createSelector(baseSelector,state => state.status);
   module.hashes = createSelector(baseSelector,state=> state.files);

   module.files_by_hashes = createSelector(baseSelector, state=> state.byHash)
   module.current = createSelector(baseSelector,state=>state.current)

   module.ready = createSelector(module.status, state => {

      return enlist(state).reduce ((result,item)=> {
         const [hash,status] = keyval(item);
         debugger;
         if(status !=="scanned"){
            return false;
         }
         return result;
      },true);
   })

   module.ready_to_scan = createSelector(module.status, state => {

      return enlist(state).reduce ((result,item)=> {
         const [hash,status] = keyval(item);
         debugger;
         if(status !=="attached"){
            return false;
         }
         return result;
      },true);
   })
   module.done = createSelector(module.status, state => {

      return enlist(state).reduce ((result,item)=> {
         const [hash,status] = keyval(item);
         debugger;
         if(status !=="done"){
            return false;
         }
         return result;
      },true);
   })
   return module;

}
