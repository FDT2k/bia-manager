import React, { useEffect, useState } from 'react';
import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';
import { BackendProvider } from '@karsegard/react-bia-manager'

import { useFileProvider } from '@/Context/File'
import { v4 as uuidv4 } from 'uuid';
import {useHostProvider} from '@/Context/Host'
import {reduceListByKeys} from '@karsegard/composite-js'
import { is_empty } from '@karsegard/composite-js';
import { useTranslation } from '@karsegard/react-bia-manager';

export default ({ children }) => {

    const { actions: { sqlite_search,sqlite_custom_search,sqlite_create,sqlite_query,sqlite_model } } = useElectron();
    const { selectors: { locked,file },actions:{reload_file_state} } = useFileProvider();
    const [subject, setState] = useState({})
    const {add_error} = useHostProvider();

    const {dateHumanToSys} = useTranslation();
    
    const [search_count,setSearchCount] = useState(0);
    const [stats,setStats] = useState({});

    const [ready,setReady] = useState(false);

    const search = async ([tag] )=>{
        
        let result = await sqlite_search(tag)
        setSearchCount(result.length);
        return result;
    }

    const search_custom_filters = async (arg )=>{
        let result = await sqlite_custom_search(arg)
        setSearchCount(result.length);

        return result;
        
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

    const get_lists = async ()=> {

        let lists = await sqlite_query({query:"select list_key,key as id, value from lists where status='active' order by sort asc",values:{}});
        lists = reduceListByKeys(['list_key'],lists);
        return lists;
    }

    const get_forms = async ()=> {
        
        return {"create_subject":[
                {list_key:'pathological_groups',path:'groups.patho'},
                {list_key:'ethnological_groups',path:'groups.ethno'},
                {list_key:'genders',path:'gender'},
            ]
        }
    }


    const create_subject = async (values)=>{
        debugger;
        if(!values.uuid){
            values.uuid = uuidv4();
        }
        if(values.birthdate){
            values.birthdate= dateHumanToSys(values.birthdate)
        }
        return await sqlite_model({model:"subject",fn:"create",args:[values]})

    }

    useEffect(() => {
        if (!locked && !is_empty(file)) {
          fetch_stats();
        }
    }, [locked])

    useEffect(() => {
        if (!locked && !is_empty(file)) {
            setReady(true)
        }else{
            setReady(false)
        }
    }, [locked,file])

    const db_name = file
    return (
        <BackendProvider type="sqlite" actions={{ready,search,search_custom_filters,create_database,fetch_stats,stats,db_name,search_count,get_lists,get_forms,create_subject}}>
            {/*<pre>{JSON.stringify(subject, null, 3)}</pre>*/}
            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}
