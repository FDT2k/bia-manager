import React, { createContext, useContext } from 'react';


import { is_nil } from '@karsegard/composite-js';


export const Context = createContext(null)


const __not_implemented = text => _=> console.warn(text+' not implemented for host')




export const makeProvider = (Context) => (props) => {
    const { children, actions:_actions,type } = props;


    const defaultActions = {
       
        search: __not_implemented('add_error'),
        get_subject: __not_implemented('start_loading'),
        get_mesure: __not_implemented('stop_loading'),
    };

    let actions = Object.assign({},defaultActions,_actions)
    return (
        <Context.Provider value={actions}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useBackend must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useBackend= makeUse(Context);





