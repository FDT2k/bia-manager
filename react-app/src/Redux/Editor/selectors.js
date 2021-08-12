import {createSelector} from 'reselect';
import {defaultTo} from '@karsegard/composite-js'




export default  getModule => {

   const {baseSelector} = getModule();
   const defaultToArray = defaultTo([]);
   const defaultToObject = defaultTo({});
   const module = {};

   module.select_current_patient_id = createSelector(baseSelector, state=> state.current_patient_id);
   module.select_current_mesure_id = createSelector(baseSelector, state=> parseInt(state.current_mesure_id));

   module.select_edited_patient=  createSelector([module.select_current_patient_id,baseSelector], (current,state) => state.patient[current]);


   module.select_mesures = createSelector(module.select_edited_patient, state=> state.mesures);

   module.select_edited_mesure=  createSelector([module.select_current_patient_id,baseSelector], (current_patient,state) => {
      if( state.mesure && state.mesure[current_patient] && state.mesure[current_patient].mesure){
         return state.mesure[current_patient].mesure
      } 
   
   });



   module.select_mesures_dates =  createSelector([module.select_current_mesure_id,module.select_mesures], (mesure_id,state) =>{

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



   module.select_recap =  createSelector([module.select_current_patient_id,baseSelector], (current,state) => {
      if( state.recap && state.recap[current]){
         return state.recap[current];
      } 
   });

   module.select_recap_list =  createSelector([module.select_recap], (recap) => {
      if(recap)
         return recap.list


      return []
   });
   module.select_recap_headers =  createSelector([module.select_recap], (recap) => {
      if(recap)
         return recap.headers


      return []
   });
   module.select_mass_chart =  createSelector([module.select_recap], (recap) => {
      if(recap )
         return recap.mass_chart
      
      return []
   });

   module.settings = createSelector(baseSelector, state=> {
      return state.report_settings
   });

   module.select_report_columns = createSelector([module.settings],(settings)=>{
      return settings.bia_result_columns;
   })

   module.select_charts_columns = createSelector([module.settings],(settings)=>{
      return settings.bia_report_chart_columns;
   })


  
   return module;

}
