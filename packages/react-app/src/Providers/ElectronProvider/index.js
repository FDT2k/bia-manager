import React, { Children, useReducer,createContext, useEffect, useMemo, useState, useContext, useRef } from 'react'

const Context = createContext(null)


export { Context }




let bound = {

}

const bindEvent = (api,key, fn)=> {
    if(!bound[key]){
        bound[key] = fn;
        api.current[key](bound[key])
    }else{
        console.warn('tried to register unique event again');
    }
}



export const Provider = props  => {
    const {children} = props;
    const api = useRef(props.api);


    
    const provider = useMemo(_ => ({
        ...api.current,
        onOpenRequest: fn=> bindEvent(api,'handleOpenRequest',fn),
        onSaveRequest: fn=> bindEvent(api,'handleSaveRequest',fn),
    }), []);




    return (
        <Context.Provider value={provider}>
            {children}
        </Context.Provider>
    )
}




export const useElectron = _ => {
    const context = useContext(Context);

    if(context === undefined){
        throw new Error('useElectron must be used within a provider');
    }
    return context;
}
