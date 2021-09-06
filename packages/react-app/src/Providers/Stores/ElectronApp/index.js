import React, { createContext, useContext } from 'react';
import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { connect } from 'react-redux';
import { makeStore } from '@/Redux/utils/create-store';

import Electron from '@/Redux/ElectronApp';


export const ElectronModule = Electron(state => state.app, '');


const reducer = combineReducers({
  app: ElectronModule.reducer
})


export const {
  open_file,
  save_file,
  start_loading,
  stop_loading,
} = ElectronModule.actions;




export const {
  is_loading,
  loading_message,
  current_file,
} = ElectronModule.selectors;




const migrations = {
  0: (state) => {
    return {
      ...state,

    }
  },

}


export const Store = makeStore('electron', reducer, { devTools: { name: 'App' } }, {
  version: 1,
  migrate: createMigrate(migrations)
});

export const Context = createContext();



export const ConnectApp = connect(state => ({
  is_loading: is_loading(state),
  loading_message: loading_message(state),
  current_file: current_file(state)
}),  {
  start_loading,
  stop_loading,
  dispatch_open:open_file,
  save_file
});



export const ConnectLoading = connect(state => ({
  is_loading: is_loading(state),
  loading_message: loading_message(state),
}));

/*
export const Provider = Connect(props => {
  const { children, ...redux } = props;
  return (
    <Context.Provider value={redux}>
      {children}
    </Context.Provider>
  )
})
*/
/*
export const useAppState = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useAppState must be used within its Provider');
  }
  return context;
}*/
/*
export default props => {
  return (
    <Store>
      <Provider>
        {props.children}
      </Provider>
    </Store>
  )
}*/

//export default Provider;


export default props => {
  return (
    <Store>
        {props.children}
    </Store>
  )
}