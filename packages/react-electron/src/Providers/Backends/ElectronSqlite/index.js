import React, { useEffect, useState } from 'react';
import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';
import { BackendProvider } from '@karsegard/react-bia-manager'

import { useFileProvider } from '@/Context/File'

import {useHostProvider} from '@/Context/Host'
export default ({ children }) => {

    const { actions: { sqlite_search,sqlite_custom_search,sqlite_create,sqlite_query } } = useElectron();
    const { selectors: { locked },actions:{reload_file_state} } = useFileProvider();
    const [subject, setState] = useState({})
    const {add_error} = useHostProvider();
    const [stats,setStats] = useState({});
    const search = async ([tag] )=>{
        
        let result = await sqlite_search(tag)
        return result;
    }

    const search_custom_filters = async (arg )=>{
        let result = await sqlite_custom_search(arg)
        return result;
        return [];
    }


    const create_database = async (arg)=>{
        sqlite_create(arg).then(res=>{
            reload_file_state();
        }).catch(add_error)
    }


    const fetch_stats = async ()=>{
        let subjects = await sqlite_query({query:"select count(*) as count from subjects",values:{},fn:'get'})
        let mesures = await sqlite_query({query:"select count(*) as count from mesures",values:{}, fn:'get'})
        setStats(stats=>({...stats,count:subjects.count,count_mesures:mesures.count}))
    }

    useEffect(() => {
        if (!locked) {
          fetch_stats();
        }
    }, [locked])
    
    return (
        <BackendProvider type="sqlite" actions={{search,search_custom_filters,create_database,fetch_stats,stats}}>
            {/*<pre>{JSON.stringify(subject, null, 3)}</pre>*/}
            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}
