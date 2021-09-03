import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { makeStore } from '@/store-persist';


const reducer = (state={},action)=> {

    return state;
}

const migrations = {
  0: (state) => {
    return {
      ...state,

    }
  },

}


export default makeStore('electron', reducer, { devTools: true }, {
  version: 1,
  migrate: createMigrate(migrations)
});
