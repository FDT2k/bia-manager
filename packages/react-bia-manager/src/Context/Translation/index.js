import React, { createContext, useContext } from 'react';

import {compose,curry, identity, is_nil } from '@karsegard/composite-js';

import { format } from 'date-fns'


export const Context = createContext(null)

const format_number = str => new Number(str);


const decimals = dec => num => num.toFixed(dec);


const percentage = num => `${num}%`;


export const oneDecimal = compose(decimals(1),format_number);
export const oneDecimalPct = compose(percentage,decimals(1),format_number);
export const twoDecimal = compose(decimals(2),format_number);
export const twoDecimalPct = compose(percentage,decimals(2),format_number)


export const format_date = curry((fmt,date)=> {
    //  console.log(typeof(date), (date instanceof Date))
      if(! (date instanceof Date)){
  
          date = new Date(date)
      }
  
  
      return format(date,fmt)
  
  
  });
  
  export const dateSysToHuman = format_date("dd.MM.yyyy")
  export const dateHumanToSys = format_date("yyyy-MM-dd")

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
        throw new Error('useViewProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useTranslation = makeUse(Context);





