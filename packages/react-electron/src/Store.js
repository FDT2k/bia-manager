import React, { createContext, useContext } from 'react';

/*
import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { connect } from 'react-redux';
import { makeStore } from '@/Redux/utils/create-store';
*/

import { combineReducers,createMigrate,connect,createStore,exportModule,withRemoteDevTools} from '@karsegard/react-redux';
import {identity} from '@karsegard/composite-js'




/* main store reducer */



const reducer = {
  app: (state={},action) => state
}


export const actions = {}
export const selectors = {}


export const {Provider,store} = createStore(reducer,withRemoteDevTools({manager:true}))





export default props => {
  return (
    <Provider>
        {props.children}
    </Provider>
  )
}