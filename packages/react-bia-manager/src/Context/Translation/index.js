import React, { createContext, useContext } from 'react';

import {compose,curry, identity, is_nil } from '@karsegard/composite-js';

import {oneDecimal,oneDecimalPct,twoDecimal,twoDecimalPct,dateSysToHuman,dateHumanToSys} from '@/references/format'


export const Context = createContext(null)

export const makeProvider = (Context) => (props) => {
    const { children,  value:_value } = props;

    
    const defaultValue = {
      t:identity,
      momentHumanDateFormat:'DD/MM/YYYY',
      oneDecimal,
      oneDecimalPct,
      twoDecimal,
      twoDecimalPct,
      dateSysToHuman,
      dateHumanToSys
      
    };

    let value = Object.assign({},defaultValue,_value)


    const formatDate = identity;

    const formatFloat = identity;

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useTranslation must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useTranslation = makeUse(Context);





