import {combineReducers} from '@reduxjs/toolkit';
import {createMigrate} from 'redux-persist'
import {makeStore} from 'store';

import PatientFeature from 'Redux/Features/Patient';


const reducer = combineReducers({
    patient: PatientFeature.reducer
})


export const actions = PatientFeature.actions;


const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
     
    }
  },
 
}




export default makeStore('manager',reducer,{devTools:true},{
    version:1,
    migrate:createMigrate(migrations)
});