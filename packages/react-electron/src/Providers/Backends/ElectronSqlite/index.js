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
import { add } from 'date-fns';
import ohash from 'object-hash'


export default ({ children }) => {
    const { actions: { sqlite_model_transaction, sqlite_api, sqlite_export, sqlite_search, sqlite_custom_search, sqlite_create, sqlite_query, sqlite_model, sqlite_attach,sqlite_import } } = useElectron();
    const { selectors: { locked, file }, actions: { reload_file_state } } = useFileProvider();
    const [subject, setState] = useState({})
    const [should_reload_lists, setShouldReloadLists] = useState(false)
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
        if (!values.uuid) {
            values.uuid = uuidv4();
        }
        if (values.birthdate) {
            values.birthdate = dateHumanToSys(values.birthdate)
        }
        return await sqlite_model({ model: "subject", fn: "create", args: [values] })

    }


    const get_subject = async (id) => {
        return sqlite_model({ model: "subject", fn: "fetchWithMesures", args: [id] }).then(res => {
            if (!res) {
                add_error('subject not found in database')
            }
            return res;
        })

    }

    const save_subject_mesures = async (subject) => {
        debugger;
        start_loading(t('Saving'))
        const { mesures, ...subject_rest } = subject;
        let result = await sqlite_model_transaction({ model: 'mesure', fn: 'import', args: [subject_rest], arg_stmt: mesures }).catch(add_error)
        stop_loading();

        // return get_subject(subject.id);


    }

    const check_database = async () => {

        return await sqlite_api({ api: 'schema_check', args: [] })

    }

    const save_subject = async ({ age,
        birthdate,
        gender,
        usual_height,
        usual_weight,
        groups, id }) => {


        return sqlite_model({
            model: 'subject', fn: 'save', args: [{
                age,
                birthdate,
                gender,
                usual_height,
                usual_weight,
                groups,
                id
            }]
        }).catch(add_error)
    }

    const delete_mesure = async (patient, idx) => {


        start_loading(t('Deleting'))

        let uuid = patient.mesures[idx].uuid;

        if (!is_empty(uuid)) {
            await sqlite_model({ model: "mesure", fn: 'softDelete', args: [uuid] })
                .catch(err => {
                    add_error(err)
                    stop_loading();
                })
            stop_loading();

            return true
        } else {
            add_error('impossible de supprimer la mesure')
            stop_loading();
            return false;
        }


    }

    useEffect(() => {
        if (ready && !locked && !is_empty(file)) {

            fetch_stats();
        }
    }, [ready])

    useEffect(() => {

        if (!locked && !is_empty(file)) {
            start_loading(t('checking database'))
            check_database().then(res => {
                if (!res) {
                    add_error(t('Your database schema is diverging from current version.'))
                    return
                }
                start_loading(t('updating hashes'))
                return update_hashes();
            }).then(res => {
                start_loading(t('updating relationships'))
                return update_uuids();
            }).then(res => {
                setReady(true)
                stop_loading()
            }).catch(err => {
                stop_loading()
                add_error(err)
            });
        } else {
            setReady(false)
        }
    }, [locked, file])

    const update_hashes = async () => {

        const subjects = await sqlite_query({ query: "select * from subjects where hash is null", values: {} })
        for (let subject of subjects) {
            let { hash, id,mesures, ...rest } = subject;
            hash = ohash(rest)
            await sqlite_query({ query: "update subjects set hash = @hash where id=@id", values: { hash, id }, fn: 'run' })

        }

        const mesures = await sqlite_query({ query: "select * from mesures where hash is null", values: {} })
        for (let mesure of mesures) {
            let { hash, id, subject_id, mesure_id, ...rest } = mesure;
            hash = ohash(rest)
            await sqlite_query({ query: "update mesures set hash = @hash where id=@id", values: { hash, id }, fn: 'run' })

        }
        return true
    }

    const update_uuids = async () => {
        const mesures = await sqlite_query({ query: "select * from mesures where subject_uuid is null", values: {} })
        for (let mesure of mesures) {
            let { hash, id, subject_id, mesure_id, ...rest } = mesure;
            let { uuid } = await sqlite_query({ query: "select uuid from subjects where id=@subject_id", values: { subject_id }, fn: 'get' });
            if (uuid) {
                rest.subject_uuid = uuid;
                hash = ohash(rest)

                await sqlite_query({ query: "update mesures set subject_uuid = @uuid, hash=@hash where id=@id", values: { uuid, hash, id }, fn: 'run' })
            }

        }
        return true
    }


    const fetch_lists = async () => {
        const lists = await sqlite_query({ query: "select distinct list_key as name, list_key as key from lists", values: {} })
        return lists;
    }


    const fetch_list = async (list_key) => {
        const list = await sqlite_query({ query: "select id, key as name, sort, default_value from lists where list_key=@list_key order by sort asc", values: { list_key } })
        return list
    }
    const save_list = (args) => {

    }

    const add_list_item = async (list_key, values) => {

        let result = await sqlite_model({
            model: 'list', fn: 'create', args: [{
                key: values.name,
                value: values.name,
                sort: values.sort,
                default_value: values.default_value,
                list_key
            }]
        }).catch(add_error)
        setShouldReloadLists(true)
    }
    const delete_list_item = async (args, values) => {
        let result = await sqlite_model({
            model: 'list',
            fn: 'delete',
            args: [
                values.id
            ]
        });
        setShouldReloadLists(true)
    }
    const save_list_item = async (list_key, values) => {
        let result = await sqlite_model({
            model: 'list',
            fn: 'save',
            args: [
                {
                    key: values.name,
                    value: values.name,
                    sort: values.sort,
                    default_value: values.default_value,
                    list_key
                }, { id: values.id }]
        }).catch(add_error)
        setShouldReloadLists(true)
    }

    const exportToCSV = async () => {

        start_loading('exporting data');
        let result = await sqlite_export({ query: {}, filename: 'bia-export.csv' }).catch(add_error);
        stop_loading();
    }


    const attach = async (file, hash, prefix = 'sync_') => {

        return sqlite_attach({ file, alias: prefix + hash });
    }

    const detach = async (hash, prefix = 'sync_') => {
        return await sqlite_query({ query: `DETACH DATABASE ${prefix}${hash}`, values: {}, fn: 'run' })
    }

    const attached_stats_query = async (hash) => {

        let result = {
            subjects: {
                new: 0,
                altered: 0
            },
            mesures: {
                new: 0,
                altered: 0
            }
        }
        //     let { max_subject_id } = await sqlite_query({ query: `select max(id) as max_subject_id from subjects`, values: {}, fn: 'get' })

        //let { max_mesure_id } = await sqlite_query({ query: `select max(id) as max_mesure_id from mesures`, values: {}, fn: 'get' })

        let new_subjects = await sqlite_query({ query: `select src.id,src.uuid from sync_${hash}.subjects as src EXCEPT select dst.id,dst.uuid from subjects as dst `, values: {}, fn: 'all' })

        let new_mesures = await sqlite_query({ query: `select src.id,src.uuid from sync_${hash}.mesures as src EXCEPT select dst.id,dst.uuid from mesures as dst `, values: {}, fn: 'all' })
        let altered_mesures = await sqlite_query({ query: `select m.* from  sync_${hash}.mesures m inner join mesures ms on m.id = ms.id where m.hash !=ms.hash`, values: {}, fn: 'all' })
        let altered_subjects = await sqlite_query({ query: `select m.* from  sync_${hash}.subjects m inner join subjects ms on m.id = ms.id where m.hash !=ms.hash`, values: {}, fn: 'all' })


        result.subjects.new = new_subjects.length
        result.mesures.new = new_mesures.length
        result.mesures.altered = altered_mesures.length
        result.subjects.altered = altered_subjects.length
        return result;
    }

    const attached_sync = async hash => {

        let results = [];
        let altered_subjects = await sqlite_query({ query: `select src.uuid,src.hash from sync_${hash}.subjects as src EXCEPT select dst.uuid,dst.hash from subjects as dst `, values: {}, 
        fn: 'all' })


        debugger;

        for (let _subject of  altered_subjects) {
            let _result = await  sqlite_model({ model: "subject", fn: "fetchWithMesures", args: [_subject.id, 'sync_' + hash,true] })
            results.push (_result)
        }
        
        debugger;
      // sqlite_import({ model: 'subject', data:results })
        
    }

    const detach_all = async () => {
        let attached = await sqlite_query({ query: `select * from pragma_database_list where name != 'main'`, values: {}, fn: 'all' })
        attached.map(item => {
            detach(item['name'], '')
        })
    }

    const db_name = file
    return (
        <BackendProvider type="sqlite" actions={{ get_subject, ready, search, search_custom_filters, create_database, fetch_stats, stats, db_name, search_count, get_lists, get_forms, create_subject, save_subject, save_subject_mesures, delete_mesure, fetch_lists, fetch_list, save_list, add_list_item, delete_list_item, save_list_item, attach, detach, detach_all, should_reload_lists, exportToCSV, attached_stats_query, attached_sync }}>

            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}
