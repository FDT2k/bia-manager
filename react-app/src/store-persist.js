import React from 'react';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
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
  const persistConfig = {
    key: persistKey,
    ...persistMigration,
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducer)

  const store = configureStore({
    ...options,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })

  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>)
}

export default makeStore;
