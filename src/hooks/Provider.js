import React, { createContext } from 'react'
import DexieAPI from './dexie/API';
import PouchAPI from './pouch/API';

import DexieDB from './dexie/db';
import PouchDB from './pouch/db';

const Context = createContext(null)
export { Context }


export const Provider = ({ children,dbname,dbtype }) => {
    
    let db ;

    let API ;
    if(dbtype=='dexie'){
        db = DexieDB(dbname);
        API = DexieAPI;
    }else{
        db = PouchDB(dbname);
        API = PouchAPI;

    }

  

    let api = API(db);
    console.log(api);
    return (
        <Context.Provider value={{api}}>
            {children}
        </Context.Provider>
    )
}