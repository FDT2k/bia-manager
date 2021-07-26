import {createSelector} from 'reselect';
import {spec} from '@karsegard/composite-js/ObjectUtils'



export default  baseSelector => {

   const select_edited_patient= id=> createSelector(baseSelector, state => state.patient[id]);
   const select_edited_mesure= (id,mesure_id)=> createSelector(baseSelector, state => {
      const p = state.patient[id] || {}
      const m = p.mesures || []

      const res = m[mesure_id];

      return res 
   
   });

   return {
      select_edited_patient,
      select_edited_mesure
   }

}
