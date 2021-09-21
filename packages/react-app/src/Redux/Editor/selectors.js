import { defaultTo, safe_path } from '@karsegard/composite-js';
import { createSelector } from 'reselect';




export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});
   const defaultToObject = defaultTo({});
   const defaultToArray = defaultTo([]);
   const module = {};

   module.select_current_patient_id = createSelector(baseSelector, state =>{
   //   debugger;
      return state.current_patient_id
   });
   module.select_current_mesure_id = createSelector(baseSelector, state => parseInt(state.current_mesure_id));

   module.select_edited_patient = createSelector([module.select_current_patient_id, baseSelector], (current, state) => state.patient[current]);


   module.select_mesures = createSelector(module.select_edited_patient, state => state.mesures);

   module.select_edited_mesure = createSelector([module.select_current_patient_id, baseSelector], (current_patient, state) => {
      if (state.mesure && state.mesure[current_patient] && state.mesure[current_patient].mesure) {
         return state.mesure[current_patient].mesure
      }

   });



   module.select_mesures_dates = createSelector([module.select_current_mesure_id, module.select_mesures], (mesure_id, state) => {

      let arr = (new Array(6)).fill(' ');
      let start = 0;
      let end = 0;
      if (mesure_id <= 6) {
         start = 0;
         end = mesure_id + 1;
      } else {
         start = mesure_id - 5
         end = mesure_id + 1;
      }




      let dates = state.map(item => item.date).slice(start, end);

      for (let i = 0; i < dates.length; i++) {
         arr[i] = dates[i];
      }
      return arr;
   });



   module.select_recap = createSelector([module.select_current_patient_id, baseSelector], (current, state) => {
      if (state.recap && state.recap[current]) {
         return state.recap[current];
      }
   });

   module.select_recap_list = createSelector([module.select_recap], (recap) => {
      if (recap)
         return recap.list


      return []
   });
   module.select_recap_headers = createSelector([module.select_recap], (recap) => {
      if (recap)
         return recap.headers


      return []
   });
   module.select_mass_chart = createSelector([module.select_recap], (recap) => {
      if (recap)
         return recap.mass_chart

      return []
   });

   module.settings = createSelector(baseSelector, state => {
      return state.report_settings
   });

   module.select_result_columns = createSelector([module.settings], (settings) => {
      return settings.bia_result_columns;
   })

   module.select_report_columns = createSelector([module.settings], (settings) => {
      return settings.bia_report_columns;
   })


   module.select_charts_columns = createSelector([module.settings], (settings) => {
      return settings.bia_report_chart_columns;
   })


   module.select_normes = createSelector([module.select_current_patient_id, baseSelector], (patient_id, state) => {
      return defaultToObject(state.normes.byPatient[patient_id]);
   });

   module.select_normes_bygender = createSelector([module.select_edited_patient, baseSelector], (patient, state) => {
      return defaultToObject(state.normes.byGender[patient.gender]);
   });


   module.select_normes_sampling = createSelector([module.select_edited_patient, baseSelector], (patient, state) => {

      /*let result;
      if (patient && patient.gender) {
         result = state.normes.chartSample[patient.gender]
      }
      return defaultToArray(result);
*/

      return safe_array(`normes.chartSample.${patient.gender}`,state);

   });



   module.select_bia = createSelector(module.select_edited_mesure, mesure => safe_array('bia', mesure))
   module.select_bia_by_key = createSelector(module.select_bia, bia => bia.reduce((carry, item) => {
      carry[item['label']] = item;
      return carry;
   }, {}))

   module.select_current_bia_values = state=> keys => createSelector([module.select_edited_mesure, module.select_bia_by_key], (mesure, bia) => {

      return keys.reduce((carry, item) => {

         if (bia[item]) {
            carry[item] = bia[item].values[mesure.most_accurate_formula];
         }
         return carry;
      }, {})


   })(state);


   module.select_empty_mesure = createSelector(baseSelector,state => state.empty_mesure.current);

   module.has_error = createSelector(baseSelector,state=> state.error.has_error)
   module.error_message = createSelector(baseSelector,state=> state.error.message)

   return module;

}
