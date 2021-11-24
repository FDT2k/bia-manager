import React, { createContext, useContext } from 'react';

import { compose, curry, identity, is_nil } from '@karsegard/composite-js';



export const Context = createContext(null)

export const makeProvider = (Context) =>  {

  

    return (props) => {
        const { children } = props;


        return (
            <Context.Provider value={{}}>
                {children}
            </Context.Provider>
        )
    }
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useResults must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useResults = makeUse(Context);






