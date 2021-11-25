import React, { useEffect, useState } from 'react';
import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';
import { BackendProvider } from '@karsegard/react-bia-manager'

import { useFileProvider } from '@/Context/File'
import { v4 as uuidv4 } from 'uuid';
import { useHostProvider } from '@/Context/Host'
import { reduceListByKeys, safe_path } from '@karsegard/composite-js'
import { is_empty } from '@karsegard/composite-js';
import { useTranslation } from '@karsegard/react-bia-manager';

export default ({ children }) => {
    const { actions: { sqlite_model_transaction, sqlite_search, sqlite_custom_search, sqlite_create, sqlite_query, sqlite_model } } = useElectron();
    const { selectors: { locked, file }, actions: { reload_file_state } } = useFileProvider();
    const [subject, setState] = useState({})
    const { add_error, start_loading, stop_loading } = useHostProvider();

    const { t, dateHumanToSys } = useTranslation();

    const [search_count, setSearchCount] = useState(0);
    const [stats, setStats] = useState({});

    const [ready, setReady] = useState(false);

    const search = async ([tag]) => {

        let result = await sqlite_search(tag)
        setSearchCount(result.length);
        return result;
    }

    const search_custom_filters = async (arg) => {
        let result = await sqlite_custom_search(arg)
        setSearchCount(result.length);

        return result;

    }


    const create_database = async (arg) => {
        sqlite_create(arg).then(res => {
            reload_file_state();
        }).catch(add_error)
    }


    const fetch_stats = async () => {
        let subjects = await sqlite_query({ query: "select count(*) as count from subjects", values: {}, fn: 'get' })
        let mesures = await sqlite_query({ query: "select count(*) as count from mesures", values: {}, fn: 'get' })
        setStats(stats => ({ ...stats, count: subjects.count, count_mesures: mesures.count }))
    }

    const get_lists = async () => {

        let lists = await sqlite_query({ query: "select list_key,key as id, value from lists where status='active' order by sort asc", values: {} });
        lists = reduceListByKeys(['list_key'], lists);
        return lists;
    }

    const get_forms = async () => {

        return {
            "create_subject": [
                { list_key: 'pathological_groups', path: 'groups.patho' },
                { list_key: 'ethnological_groups', path: 'groups.ethno' },
                { list_key: 'genders', path: 'gender' },
            ],
            "edit_subject": [
                { list_key: 'pathological_groups', path: 'groups.patho' },
                { list_key: 'genders', path: 'gender' },
            ],
            "mesure": [
                { list_key: 'physical_activity_type', path: 'sport.type' },
                { list_key: 'physical_activity_rate', path: 'sport.rate' },
                { list_key: 'machines', path: 'machines' },
            ]
        }
    }


    const create_subject = async (values) => {
        debugger;
        if (!values.uuid) {
            values.uuid = uuidv4();
        }
        if (values.birthdate) {
            values.birthdate = dateHumanToSys(values.birthdate)
        }
        return await sqlite_model({ model: "subject", fn: "create", args: [values] })

    }


    const get_subject = async (id) => {
        return sqlite_model({ model: "subject", fn: "fetchWithMesures", args: [id] }).then(res=> {
            if(!res){
                add_error('subject not found in database')
            }
            return res;
        })

    }

    const save_subject = async (subject) => {
        start_loading(t('Saving'))
        let mesures = await sqlite_model_transaction({ model: 'mesure', fn: 'import', args: [subject.id], arg_stmt: subject.mesures }).catch(add_error)
        stop_loading();
    }

    const delete_mesure = async (patient, idx) => {
        // debugger;

        
        start_loading(t('Deleting'))

        let mesure_id = patient.mesures[idx].id;
        if (!is_empty(mesure_id)) {
            return await sqlite_model({ model: "mesure", fn: 'softDelete', args: [mesure_id] })
                .catch(err => {
                    add_error(err)
                    stop_loading();
                }).then(res => {
                    stop_loading();
                    return true
                })
        }else {

            return false;
        }
        

    }

    useEffect(() => {
        if (!locked && !is_empty(file)) {
            fetch_stats();
        }
    }, [ready])

    useEffect(() => {

        if (!locked && !is_empty(file)) {
            setReady(true)
        } else {
            setReady(false)
        }
    }, [locked, file])



    const db_name = file
    return (
        <BackendProvider type="sqlite" actions={{ get_subject, ready, search, search_custom_filters, create_database, fetch_stats, stats, db_name, search_count, get_lists, get_forms, create_subject, save_subject, delete_mesure }}>
            {/*<pre>{JSON.stringify(subject, null, 3)}</pre>*/}
            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}
