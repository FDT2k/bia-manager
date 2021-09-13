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


const reducer = combineReducers({
  app: ElectronModule.reducer
})


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

/*
export const { select_list: select_ethno_group } = ElectronModule.submodules.features.create.submodules.ethno_groups.selectors;
export const { select_list: select_genders } = ElectronModule.submodules.features.create.submodules.genders.selectors;
export const { select_list: select_list_pathological_groups } =ElectronModule.submodules.features.create.submodules.pathological_groups.selectors
*/



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