import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { connect } from 'react-redux'

import {Modules, makeStore,bindSelectors} from '@karsegard/react-redux';

const {FilterableCollection:FilteredCrudModule} = Modules

export const FilteredCrud = FilteredCrudModule(state => state.filtered, '',{default_keys:['label']});

const reducer = combineReducers({
  filtered: FilteredCrud.reducer
})




const migrations = {
  0: (state) => {
    return {
      ...state,
    }
  },

}



export const Store = makeStore('electron', reducer, { devTools: {name:'App'} }, {
  version: 1,
  migrate: createMigrate(migrations)
});
