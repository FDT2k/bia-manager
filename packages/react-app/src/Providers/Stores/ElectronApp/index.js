import React, { createContext, useContext } from 'react';

/*
import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { connect } from 'react-redux';
import { makeStore } from '@/Redux/utils/create-store';
*/

import { combineReducers,createMigrate,connect,makeStore,exportModule} from '@karsegard/react-redux';
import {identity} from '@karsegard/composite-js'
import Electron from '@/Redux/ElectronApp';
import  devToolsEnhancer from'remote-redux-devtools';


export const ElectronModule = Electron(state => state.app, '');



export const {
  open_file,
  create_database,
  start_loading,
  stop_loading,
  save_to_file,
  search,
  init_app,
  refresh_editor_lists,
  close,
  create_patient
} = ElectronModule.actions;




export const {
  is_loading,
  loading_message,
  current_file,
  get_backend_stats,
  default_subject_form_options,
  subject_form_available_options,
  edited_subject,
  form_options_loaded
} = ElectronModule.selectors;


export const {
  create_subject,
  edit_subject,
} =  ElectronModule.submodules.features.create.actions;

export const {
  select_patients_list_filtered,
  
} = exportModule(identity,'features.search.selectors',ElectronModule.submodules)


export const {
  select_subject_form
} = exportModule(identity,'features.create.selectors',ElectronModule.submodules)





/**
 * Create the editor Module
 */
 export const BIAEditorModule = ElectronModule.submodules.features.editor;

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
   has_error, 
   error_message 
  } = BIAEditorModule.selectors;
 
 
  
 export const {
   
   edit_mesure,
   recompute_mesure,
   create_mesure,
   change_subject,
   save,
   fetch_normes,
   recompute_current_mesure,
   refresh_current_recap,
   refresh_recap,
   delete_mesure,
   delete_mesure_from_db,
   change_mesure ,
   save:save_editor
  } = BIAEditorModule.actions;
 
export const {
  edit_patient,
  update_patient
  
}= ElectronModule.actions
   
 export const { fetch: populate_sportrate } = BIAEditorModule.submodules.sportRate.actions;
 export const { fetch: populate_sporttype } = BIAEditorModule.submodules.sportType.actions;
 export const { fetch: populate_machines } = BIAEditorModule.submodules.machines.actions;
 
 
 export const { select_list: select_machines } = BIAEditorModule.submodules.machines.selectors;
 export const { select_list: select_sportrates } = BIAEditorModule.submodules.sportRate.selectors;
 export const { select_list: select_sporttypes } = BIAEditorModule.submodules.sportType.selectors;
 
/*end editor module */



/* main store reducer */



const reducer = combineReducers({
  app: ElectronModule.reducer
})

const migrations = {
  0: (state) => {
    return {
      ...state,

    }
  },

}




/*
export const Store = makeStore('electron', reducer, { devTools: { name: 'App' } }, {
  version: 1,
  migrate: createMigrate(migrations)
});
*/
export const Store = makeStore('electron', reducer, { devTools: false,enhancers: [devToolsEnhancer({secure:false, hostname:'localhost',port:8000,realtime: import.meta.env.DEV})] }, {
  version: 1,
  migrate: createMigrate(migrations)
});

export const Context = createContext();



export const ConnectApp = connect(state => ({
  is_loading: is_loading(state),
  loading_message: loading_message(state),
  current_file: current_file(state)
}),  {
  create_database,
  start_loading,
  stop_loading,
  open_file,
  init_app,
  save_to_file,
  close
});



export const ConnectLoading = connect(state => ({
  is_loading: is_loading(state),
  loading_message: loading_message(state),
}));


export default props => {
  return (
    <Store>
        {props.children}
    </Store>
  )
}