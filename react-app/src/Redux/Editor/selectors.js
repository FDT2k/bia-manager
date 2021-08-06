import {createSelector} from 'reselect';
import {spec} from '@karsegard/composite-js/ObjectUtils'



export default  baseSelector => {

   const select_edited_patient= id=> createSelector(baseSelector, state => state.patient[id]);
   const select_edited_mesure= (id)=> createSelector(baseSelector, state => {
      
      if( state.mesure && state.mesure[id] && state.mesure[id].mesure){
         return state.mesure[id].mesure
      } 
   
   });

   return {
      select_edited_patient,
      select_edited_mesure
   }

}
