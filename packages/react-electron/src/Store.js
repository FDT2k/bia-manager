import React, { createContext, useContext } from 'react';

/*
import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { connect } from 'react-redux';
import { makeStore } from '@/Redux/utils/create-store';
*/

import { combineReducers,createMigrate,connect,makeStore,exportModule} from '@karsegard/react-redux';
import {identity} from '@karsegard/composite-js'

import  devToolsEnhancer from'remote-redux-devtools';



/* main store reducer */



const reducer = combineReducers({
  app: (state={},action) => state
})


export const actions = {}
export const selectors = {}



/*
export const Store = makeStore('electron', reducer, { devTools: { name: 'App' } }, {
  version: 1,
  migrate: createMigrate(migrations)
});
*/
export const Store = makeStore('electron', reducer, { devTools: false,enhancers: [devToolsEnhancer({secure:false,maxAge:100, hostname:'localhost',port:8000,realtime: true})] }, {
  version: 1,
//  migrate: createMigrate(migrations)
});




export default props => {
  return (
    <Store>
        {props.children}
    </Store>
  )
}