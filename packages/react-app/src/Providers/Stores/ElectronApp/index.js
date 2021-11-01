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
  add_error,

  create_database,
  start_loading,
  stop_loading,
  save_to_file,
  search,
  init_app,
  refresh_editor_lists,
  close,
  create_patient,
  import_csv,
  dismiss_error
} = ElectronModule.actions;




export const {
  is_loading,
  loading_message,
  current_file,
  get_backend_stats,
  subject_form_default_options,
  subject_form_available_options,
  editor_patient_options,
  edited_subject,
  form_options_loaded,
  select_form_lists,
  current_error
} = ElectronModule.selectors;

/*
export const {
  create_subject,
  edit_subject,
} =  ElectronModule.submodules.features.create.actions;
*/
export const {
  select_patients_list_filtered,
  
} = exportModule(identity,'features.search.selectors',ElectronModule.submodules)


export const {
  select_subject_form
} = exportModule(identity,'features.create.selectors',ElectronModule.submodules)



export const SearchModule =  ElectronModule.submodules.features.search;

export const {
  select_tags

} = SearchModule.selectors

export const {
  clear:clear_search

} = SearchModule.actions


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
   select_current_bia_values,
   select_normes_sampling: select_normes_chart,
   select_empty_mesure,
   select_mesures_dates,
   has_error, 
   error_message ,
   select_edited_age,
   makeSelectBIAResultByKey,
   makeSelectIndiceChartYTicks,
   makeSelectYLabelByKey
  } = BIAEditorModule.selectors;
 
 
  
 export const {
   
   edit_mesure,
   recompute_mesure,
   create_mesure,
   change_subject,
   save,
   recompute_current_mesure,
   refresh_current_recap,
   refresh_recap,
   fetch_normes,

   change_mesure ,
   save:save_editor,
   set_examinator
  } = BIAEditorModule.actions;
 /*
export const {
  fetch_normes,

} = BIAEditorModule.submodules.normes.actions;
*/
export const {
  edit_patient,
  update_patient,
  save_global,
  delete_mesure
  
}= ElectronModule.actions

/*
 export const { fetch: populate_sportrate } = BIAEditorModule.submodules.sportRate.actions;
 export const { fetch: populate_sporttype } = BIAEditorModule.submodules.sportType.actions;
 export const { fetch: populate_machines } = BIAEditorModule.submodules.machines.actions;
 
 
 export const { select_list: select_machines } = BIAEditorModule.submodules.machines.selectors;
 export const { select_list: select_sportrates } = BIAEditorModule.submodules.sportRate.selectors;
 export const { select_list: select_sporttypes } = BIAEditorModule.submodules.sportType.selectors;
 */
/*end editor module */

/**
 * LIST EDITOR Actions & selectors
 */
 export const ListEditorModule = ElectronModule.submodules.features.list_editor;
 export const {
  fetch_list_editor,
  fetch_lists_editor,
  save_list
 }  = ElectronModule.actions


 export const {
   
   edit_list_editor,
   del_list_editor,
   set_key_list_editor,
   set_filter_list_editor,
   add_list_editor,
   //fetch_list_editor

 }= exportModule(x=>`${x}_list_editor`,'actions',ListEditorModule)


export const {
  list_list_editor,
  filter_list_editor
}= exportModule(x=>`${x}_list_editor`,'selectors',ListEditorModule) 
 
 


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
export const Store = makeStore('electron', reducer, { devTools: false,enhancers: [devToolsEnhancer({secure:false, hostname:'localhost',port:8000,realtime: true})] }, {
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
  add_error,
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