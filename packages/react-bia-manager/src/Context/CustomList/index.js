import { is_nil } from '@karsegard/composite-js';
import React, { createContext, useContext } from 'react';





export const Context = createContext(null)


export const makeProvider = (Context) => (props) => {
    const { children, lists:_lists,forms:_forms } = props;

    const defaultValue = {
      
    };


    const defaultForms = {

    }
    let lists = Object.assign({},defaultValue,_lists)
    let forms = Object.assign({},defaultForms,_forms)
    return (
        <Context.Provider value={{lists,forms}}>
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





