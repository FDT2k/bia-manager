import { ReduxEditorModule } from '@karsegard/react-bia-manager';
/*
import { combineReducers } from 'redux';
import { createMigrate } from 'redux-persist'
import { connect } from 'react-redux';
import { makeStore } from '@/Redux/utils/create-store';
*/
import { createStore, withRemoteDevTools } from '@karsegard/react-redux';
import React from 'react';





export const editorModule = ReduxEditorModule(state=> state.editor,'editor',{})


/* main store reducer */



const reducer = {
  app: (state={},action) => state,
  editor:editorModule.reducer
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