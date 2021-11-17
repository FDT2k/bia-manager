import React, { createContext, useContext } from 'react';


import CreatePatient from '@/Features/CreatePatient';
import Database from '@/Features/Database';
import DatabaseListManager from '@/Features/ListManager';
import Editor from '@/Features/Editor';
import Search from '@/Features/Search';
import Welcome from '@/Features/WelcomeScreen';
import { is_nil } from '@karsegard/composite-js';



export const Context = createContext(null)


export const makeProvider = (Context) => (props) => {
    const { children, value:_value } = props;

    const defaultValue = {
      
    };

    let value = Object.assign({},defaultValue,_value)
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useCustomList must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useCustomList = makeUse(Context);





