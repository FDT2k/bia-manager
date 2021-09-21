import { is_nil } from "@karsegard/composite-js";

import API from './API';

import DexieDB from './db';

export const makeAPI = dbname => API(DexieDB(dbname))


export default ()=> {
    let backend_instances = {};


    return (dbname)=> {
        if(is_nil(backend_instances[dbname])){
            backend_instances[dbname] = makeAPI(dbname);
        }

        return backend_instances[dbname]
    }

}