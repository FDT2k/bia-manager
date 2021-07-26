import {combineReducers} from '@reduxjs/toolkit';
import { createMigrate } from 'redux-persist'
import {makeStore} from 'store-dev';
import {createSelector} from 'reselect';


import BIASearch from 'Redux/BIASearch/reducer';
import makePatientSelectors from 'Redux/BIASearch/selectors';
import {update_search_tags,makeSearch} from 'Redux/BIASearch/actions';


import EditorReducer from 'Redux/Editor/reducer';
import makeEditorSelectors from 'Redux/Editor/selectors';
import {edit_patient} from 'Redux/Editor/actions';

const reducer= combineReducers({
    database:BIASearch,
    editor:EditorReducer
})

export const baseSelector = state=>state.database;
export const {select_patients_list,select_patients_list_filtered,select_count_results,select_tags,select_patient} = makePatientSelectors(baseSelector);


export const {select_edited_patient,select_edited_mesure} = makeEditorSelectors(state=>state.editor);



export {update_search_tags,edit_patient} ;


export const search = makeSearch(baseSelector);

const migrations = {
  0: (state) => {
    return {
      ...state,

    }
  },
  
}


export default makeStore('root',reducer,{devTools:true},{
    version:1,
    migrate:createMigrate(migrations)
});
