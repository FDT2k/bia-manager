import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { makeStore } from 'store-dev';
import { createSelector } from 'reselect';

import { suffix_key,exportModule } from 'Redux/utils/module';

import EditorModule from 'Redux/Editor';
import PatientModule from 'Redux/Patient';



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


/**
 * Create the editor Store
 */
export const BIAEditorModule = EditorModule(state => state.editor, '');

export const {
  select_current_mesure_id,
  select_current_patient_id,
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
  select_empty_mesure,
  select_mesures_dates,
has_error,error_message } = BIAEditorModule.selectors;


export const {
  edit_patient,
  edit_mesure,
  recompute_mesure,
  create_mesure,
  change_subject,
  save,
  fetch_normes,
  recompute_current_mesure,
  refresh_current_recap,
  refresh_recap,
  change_mesure } = BIAEditorModule.actions;

export const { fetch: populate_sportrate } = BIAEditorModule.submodules.sportRate.actions;
export const { fetch: populate_sporttype } = BIAEditorModule.submodules.sportType.actions;
export const { fetch: populate_machines } = BIAEditorModule.submodules.machines.actions;


export const { select_list: select_machines } = BIAEditorModule.submodules.machines.selectors;
export const { select_list: select_sportrates } = BIAEditorModule.submodules.sportRate.selectors;
export const { select_list: select_sporttypes } = BIAEditorModule.submodules.sportType.selectors;


/* Subject's Managment module */

export const BIAPatientEditor = PatientModule(state => state.patient, '');

export const {select_subject_form,select_empty_subject } = BIAPatientEditor.selectors;
export const {edit_subject,create_subject } = BIAPatientEditor.actions;

export const { fetch: populate_genders } = BIAPatientEditor.submodules.genders.actions;
export const { fetch: populate_ethno_groups } = BIAPatientEditor.submodules.ethno_groups.actions;

export const { select_list: select_ethno_group } = BIAPatientEditor.submodules.ethno_groups.selectors;
export const { select_list: select_genders } = BIAPatientEditor.submodules.genders.selectors;

export const {select_list_pathological_groups} = exportModule(suffix_key('pathological_groups'),'submodules.pathological_groups.selectors',BIAPatientEditor);
export const { fetch_pathological_groups } = exportModule(suffix_key('pathological_groups'),'submodules.pathological_groups.actions',BIAPatientEditor);


const reducer = combineReducers({
  database: BIASearch,
  editor: BIAEditorModule.reducer,
  patient:BIAPatientEditor.reducer
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
