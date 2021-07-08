import {createSelector} from 'reselect';
import {spec} from '@geekagency/composite-js/ObjectUtils'





export default  baseSelector => {

   return {
       select_patients: createSelector([baseSelector], state => state.patients),
       select_patients_list: createSelector([baseSelector], state => state.patients.allIds.map(key=>state.patients.byIds[key])),
       select_count_results: createSelector([baseSelector], state => state.patients.allIds.length),
      
   }

}
