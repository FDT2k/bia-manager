import { is_nil } from '@karsegard/composite-js';
import React, { createContext, useContext } from 'react';




export const Context = createContext(null)

export const makeProvider = (Context) => (props) => {
    const { children,  dataProvider } = props;

    
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
        throw new Error('useDataProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useDataProvider = makeUse(Context);





