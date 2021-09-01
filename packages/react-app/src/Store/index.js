import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { makeStore } from '@/store-dev';

import { suffix_key, exportModule } from '@/Redux/utils/module';

import EditorModule from '@/Redux/Editor';
import PatientModule from '@/Redux/Patient';


/* Search Module */

import SearchModule from '@/Redux/BIASearch';

export const BIASearchModule = SearchModule(state => state.search, '');

export const {
  search
} = BIASearchModule.actions;


export const {
  select_patients_list,
  select_patients_list_filtered,
  select_count_results,
  select_tags,
  select_patient
} = BIASearchModule.selectors

/**
 * Create the editor Module
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
  select_normes_sampling: select_normes_chart,
  select_empty_mesure,
  select_mesures_dates,
  has_error, error_message } = BIAEditorModule.selectors;


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

export const { select_subject_form, select_empty_subject } = BIAPatientEditor.selectors;
export const { edit_subject, create_subject } = BIAPatientEditor.actions;

export const { fetch: populate_genders } = BIAPatientEditor.submodules.genders.actions;
export const { fetch: populate_ethno_groups } = BIAPatientEditor.submodules.ethno_groups.actions;

export const { select_list: select_ethno_group } = BIAPatientEditor.submodules.ethno_groups.selectors;
export const { select_list: select_genders } = BIAPatientEditor.submodules.genders.selectors;

export const { select_list_pathological_groups } = exportModule(suffix_key('pathological_groups'), 'submodules.pathological_groups.selectors', BIAPatientEditor);
export const { fetch_pathological_groups } = exportModule(suffix_key('pathological_groups'), 'submodules.pathological_groups.actions', BIAPatientEditor);


const reducer = combineReducers({
  search: BIASearchModule.reducer,
  editor: BIAEditorModule.reducer,
  patient: BIAPatientEditor.reducer
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
