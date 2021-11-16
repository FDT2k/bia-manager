import React, { createContext, useContext } from 'react';


import { is_nil } from '@karsegard/composite-js';


export const Context = createContext(null)


const __not_implemented = text => _=> console.warn(text+' not implemented for host')


export const makeProvider = (Context) => (props) => {
    const { children, actions:_actions } = props;

    const defaultActions = {
        open_file: __not_implemented('open_file'),
        create_file : __not_implemented('create_file'),

    };

    let actions = Object.assign({},defaultActions,_actions)
    return (
        <Context.Provider value={{actions}}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useHostProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useHostProvider = makeUse(Context);





