import {combineReducers} from '@reduxjs/toolkit';
import { createMigrate } from 'redux-persist'
import {makeStore} from 'store';

import DatabaseSlice,{makeSelectors} from 'Redux/Database'

const reducer = combineReducers({
    databases:DatabaseSlice.reducer
})



const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
     
    }
  },
  1: (state) => {
    // migration to keep only device state
    return {
      ...state,
      active:null
    }
  }
}

export const {add,del} = DatabaseSlice.actions;

export const {selectDatabases} = makeSelectors(state=>state.databases);

export default makeStore('root',reducer,{devTools:true},{
    version:2,
    migrate:createMigrate(migrations)
});