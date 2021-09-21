import React from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

//import rootReducer from './reducers'


export const makeStore = (persistKey,reducer,options={},persistMigration={version:1}) => props=> {

    const store = configureStore({
        ...options,
        reducer: reducer,
        /*middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger),*/
        middleware: [thunk,logger]
    })



    return (
        <Provider store={store}>

            {props.children}

        </Provider>)
}

export default makeStore;
