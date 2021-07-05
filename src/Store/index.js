import {combineReducers} from '@reduxjs/toolkit';
import { createMigrate } from 'redux-persist'
import {makeStore} from 'store';

import Patient from 'Redux/Patient/reducer';

const reducer= (state,action)=> {
    console.log(action);
    return state;
}


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


export default makeStore('root',Patient,{devTools:true},{
    version:1,
    migrate:createMigrate(migrations)
});
