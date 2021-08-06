import React, { createContext,useEffect,useState } from 'react'
import DexieAPI from './dexie/API';
import PouchAPI from './pouch/API';

import DexieDB from './dexie/db';
import PouchDB from './pouch/db';

const Context = createContext(null)
export { Context }


export const Provider = ({ children,dbname,dbtype }) => {
    
    const [patient_count,setPatientCount] = useState(0);
    const [mesures_count, setMesureCount] = useState(0);
    const [db_name, setDBName] = useState('');

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
   
 
    useEffect(()=>{

        api.count().then(count => {
            setPatientCount(count);
            return api.count_mesures();

        }).then(count=> {
            setMesureCount(count);
            return api.db_name();
        }).then(name=> {
            setDBName(name);
        });

    },[dbname]);

    return (
        <Context.Provider value={{api,patient_count,mesures_count,db_name}}>
            {children}
        </Context.Provider>
    )
}