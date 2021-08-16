import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { makeStore } from 'store-dev';
import { createSelector } from 'reselect';



import EditorModule from 'Redux/Editor';



import BIASearch from 'Redux/BIASearch/reducer';
import makePatientSelectors from 'Redux/BIASearch/selectors';
import { update_search_tags, makeSearch } from 'Redux/BIASearch/actions';


/*import EditorReducer from 'Redux/Editor/reducer';
import makeEditorSelectors from 'Redux/Editor/selectors';
import {edit_patient,make_actions,make_edit_mesure,make_recompute_mesure} from 'Redux/Editor/actions';
*/




export const baseSelector = state => state.database;
export const { select_patients_list, select_patients_list_filtered, select_count_results, select_tags, select_patient } = makePatientSelectors(baseSelector);
export const search = makeSearch(baseSelector);
export { update_search_tags };

// editor reducers
/*export const {select_current_mesure_id, select_recap_headers,
  select_recap_list,select_mass_chart,select_edited_patient,select_edited_mesure,select_recap,select_mesures_dates} = makeEditorSelectors(state=>state.editor);

export const {edit_mesure,recompute_mesure,create_mesure,refresh_recap,change_mesure} = make_actions(state=>state.editor)
export {update_search_tags,edit_patient} ;
*/


/**
 * Create the editor Store
 */
export const BIAEditorModule = EditorModule(state => state.editor, '');

export const {
  select_current_mesure_id,
  select_recap_headers,
  select_recap_list,
  select_mass_chart,
  select_edited_patient,
  select_edited_mesure,
  select_recap,
  select_normes_sampling,
  select_normes_bygender,
  select_current_bia_values,
  select_normes_sampling:select_normes_chart,
  select_mesures_dates } = BIAEditorModule.selectors;


export const {
  edit_patient,
  edit_mesure,
  recompute_mesure,
  create_mesure,
  fetch_normes,
  refresh_recap,
  change_mesure } = BIAEditorModule.actions;

export const { fetch: fetch_physical_activities } = BIAEditorModule.submodules.physicalActivity.actions;





const reducer = combineReducers({
  database: BIASearch,
  //editor:EditorReducer,
  editor: BIAEditorModule.reducer
})

const migrations = {
  0: (state) => {
    return {
      ...state,

    }
  },

}


export default makeStore('root', reducer, { devTools: true }, {
  version: 1,
  migrate: createMigrate(migrations)
});
