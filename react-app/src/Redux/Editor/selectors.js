import {createSelector} from 'reselect';
import {spec} from '@karsegard/composite-js/ObjectUtils'
import { baseElement } from 'bia-layout/utils';



export default  baseSelector => {


   const current_patient = createSelector(baseSelector, state=> state.current_patient_id);
   const current_mesure = createSelector(baseSelector, state=> parseInt(state.current_mesure_id));

   const select_edited_patient=  createSelector([current_patient,baseSelector], (current,state) => state.patient[current]);


   const select_mesures = createSelector(select_edited_patient, state=> state.mesures);

   const select_edited_mesure=  createSelector([current_patient,baseSelector], (current_patient,state) => {
      if( state.mesure && state.mesure[current_patient] && state.mesure[current_patient].mesure){
         return state.mesure[current_patient].mesure
      } 
   
   });



   const select_mesures_dates =  createSelector([current_mesure,select_mesures], (mesure_id,state) =>{

      let arr = (new Array(6)).fill(' ');
      let start =0 ;
      let end = 0;
      if(mesure_id <= 6){
         start=0;
         end = mesure_id+1;
      }else {
         start = mesure_id -5
         end = mesure_id+1;
      }

     


      let dates =  state.map(item=> item.date).slice(start,end);

      for(let i = 0; i < dates.length; i++){
         arr[i]= dates[i];
      }
      return arr;
   } );



   const select_recap =  createSelector([current_patient,baseSelector], (current,state) => {
      if( state.recap && state.recap[current]){
         return state.recap[current];
      } 
   });

   const select_recap_list =  createSelector([select_recap], (recap) => {
      if(recap)
         return recap.list


      return []
   });
   const select_recap_headers =  createSelector([select_recap], (recap) => {
      if(recap)
         return recap.headers


      return []
   });
   const select_mass_chart =  createSelector([select_recap], (recap) => {
      if(recap )
         return recap.mass_chart
      
      return []
   });


   return {
      select_edited_patient,
      select_edited_mesure,
      select_mesures_dates,
      select_recap,
      select_current_mesure_id:current_mesure,
      select_recap_headers,
      select_recap_list,
      select_mass_chart
   }

}
