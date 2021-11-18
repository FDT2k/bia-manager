import React, { createContext, useContext, useMemo, useRef } from 'react'
import { enlist } from '@karsegard/composite-js'
import { spreadObjectBeginWith, spreadObjectContaining } from '@karsegard/composite-js/ReactUtils'
import { keyval } from '@karsegard/composite-js/ObjectUtils'
export const Context = createContext(null)

export const makeBindEvent = _ => {
    let bound = {

    }

    return (api, key, fn,instancename) => {
        if (!bound[key+'_'+instancename]) {
            console.log('registered unique event ',key);

            bound[key+'_'+instancename] = fn;
            api[key](bound[key+'_'+instancename])
        } else {
            console.warn('tried to register unique event again',key);
        }
    }
}




export const makeProvider = (Context, bindEvent) => props => {
    const { children } = props;
    //const api = useRef(props.api);

    const { api } = props;


    console.log('rendered context')
    const provider = useMemo(_ => {
        const [{events},actions] = spreadObjectContaining(['events'], api);
        const [revokers, subscribers] = spreadObjectBeginWith('revoke', events);

        return {
            ...actions,
            subscribers: enlist(subscribers).reduce((carry, subscriber) => {
                let [key, value] = keyval(subscriber)
                carry[key] = (fn,instancename='') => bindEvent(subscribers, key, fn,instancename)
                return carry
            }, {}),
            revokers: revokers
        }
    }, [api]);




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

export const Provider = makeProvider(Context, bindEvent);
export const useElectron = makeUseElectron(Context);





