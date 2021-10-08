import React, { Children, useReducer, createContext, useEffect, useMemo, useState, useContext, useRef } from 'react'

export const Context = createContext(null)

export const makeBindEvent =_=> {
    let bound = {

    }

    return (api, key, fn) => {
        if (!bound[key]) {
            bound[key] = fn;
            api.current[key](bound[key])
        } else {
            console.warn('tried to register unique event again');
        }
    }
}


export const makeProvider = (Context,bindEvent) => props => {
    const { children } = props;
    const api = useRef(props.api);

    const provider = useMemo(_ => ({
        ...api.current,
        onOpenRequest: fn => bindEvent(api, 'handleOpenRequest', fn),
        onSaveRequest: fn => bindEvent(api, 'handleSaveRequest', fn),
        onCloseRequest: fn => bindEvent(api, 'handleCloseRequest', fn),
        onLanguageChange: fn => bindEvent(api, 'handleLanguageChange', fn),
        onLocationChange: fn => bindEvent(api, 'handleLocationChange', fn),
    }), []);




    return (
        <Context.Provider value={provider}>
            {children}
        </Context.Provider>
    )
}


export const makeUseElectron = Context => _ => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error('useElectron must be used within a provider');
    }
    return context;
}

export const bindEvent = makeBindEvent();

export const Provider = makeProvider(Context,bindEvent);
export const useElectron = makeUseElectron(Context);





