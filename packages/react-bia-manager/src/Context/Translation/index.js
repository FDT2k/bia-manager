import React, { createContext, useContext } from 'react';

import { identity, is_nil } from '@karsegard/composite-js';



export const Context = createContext(null)


export const makeProvider = (Context) => (props) => {
    const { children, t:_t } = props;

    
    let t = _t;
    if(is_nil(t)){
        t=identity
    }
    
    
    const formatDate = identity;

    const formatFloat = identity;

    return (
        <Context.Provider value={{t,formatDate,formatFloat}}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useViewProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useTranslation = makeUse(Context);





