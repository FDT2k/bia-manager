import {combineReducers} from '@reduxjs/toolkit';
import { createMigrate } from 'redux-persist'
import {makeStore} from 'store';

import Patient from 'Redux/Patient/reducer';
import makePatientSelectors from 'Redux/Patient/selectors';
import {update_search_tags,makeSearch} from 'Redux/Patient/actions';
import {createSelector} from 'reselect';

const reducer= combineReducers({
    database:Patient
})

export const baseSelector = state=>state.database;
export const {select_patients_list,select_patients_list_filtered,select_count_results,select_tags} = makePatientSelectors(baseSelector);



export {update_search_tags} ;


export const search = makeSearch(baseSelector);

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
