import {combineReducers} from '@reduxjs/toolkit';
import { createMigrate } from 'redux-persist'
import {makeStore} from 'store';

import Patient from 'Redux/Patient/reducer';

const reducer= combineReducers({
    patient:Patient
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


export default makeStore('root',reducer,{devTools:true},{
    version:2,
    migrate:createMigrate(migrations)
});
