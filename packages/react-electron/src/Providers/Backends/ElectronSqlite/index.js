import React, { useEffect, useState } from 'react';
import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';
import { BackendProvider, useConfirm } from '@karsegard/react-bia-manager'
import webWorker from './heavysql.worker.js?worker&inline'
import { useFileProvider } from '@/Context/File'
import { v4 as uuidv4 } from 'uuid';
import { useHostProvider } from '@/Context/Host'
import { reduceListByKeys, safe_path } from '@karsegard/composite-js'
import { is_empty } from '@karsegard/composite-js';
import { useTranslation } from '@karsegard/react-bia-manager';
import { add } from 'date-fns';
import ohash from 'object-hash'
import crypto from 'pbkdf2'
import { nanoid } from 'nanoid';
const doHeavyWork = (message) => {

    let worker = new webWorker();
    let promise = new Promise((resolve, reject) => {

        worker.onmessage = message => resolve(message.data);
        worker.onerror = error => reject(error);
    })

    let terminate = () => worker.terminate();

    worker.postMessage(message)
    return [promise, terminate];
}


export const encode_password = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex');
}

export default ({ children }) => {
    const { actions: { sqlite_model_transaction, sqlite_api, sqlite_export, sqlite_search, sqlite_custom_search, sqlite_create, sqlite_query, sqlite_model, sqlite_attach, sqlite_import, sqlite_unlock_sd,sqlite_lock_sd,sqlite_sd_is_unlocked, sqlite_sd_req_password }, subscribers: { handleUnlockSensitiveData,handleLockSensitiveData } } = useElectron();
    const { selectors: { locked, file }, actions: { reload_file_state, close_file } } = useFileProvider();
    const [subject, setState] = useState({})
    const [sensitive_lock, setSensitiveLock] = useState(true)
    const [should_reload_lists, setShouldReloadLists] = useState(false)
    const { add_error, start_loading, stop_loading } = useHostProvider();
    const { isConfirmed } = useConfirm();
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

    const update_subject = async (values) => {
        
        if (values.birthdate) {
            values.birthdate = dateHumanToSys(values.birthdate)
        }
        return await sqlite_model({ model: "subject", fn: "save", args: [values] })

    }


    const get_subject = async (id) => {
        return sqlite_model({ model: "subject", fn: "fetchWithMesures", args: [id] }).then(res => {
            if (!res) {
                add_error(t('subject not found in database'))
            }
            return res;
        })

    }
    const get_subject_by_uuid = async (uuid) => {
        return sqlite_model({ model: "subject", fn: "fetch", args: [{ uuid }] }).then(res => {
            if (!res) {
                add_error(t('subject not found in database'))
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

    const migrate_database = async () => {
        let result = await sqlite_api({ api: 'migrate', args: [] }).catch(
            err => {
                return isConfirmed('An error occured while migrating the database. This can happens if a previous migration has failed. Do you want to continue using this database ?');
            }
        )

        return true;

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
            add_error(t('impossible de supprimer la mesure'))
            stop_loading();
            return false;
        }


    }


    const check_data_protection = async () => {

        let result = await sqlite_query({ query: "select value from settings where key = 'sensitive_data_checked'", values: {}, fn: 'get' });
        return result.value === '0';
    }
    const disable_data_protection = async () => {

        let result = await sqlite_query({ query: "update settings set value = '1' where key = 'sensitive_data_checked'", values: {}, fn: 'run' });
        return;
    }

    const enable_data_protection = async () => {


        let password = await isConfirmed('Choisissez un mot de passe', {
            fields: [
                { type: 'password', 'name': 'password', 'label': t('Password'), autoFocus: true },
                { type: 'password', 'name': 'confirm_password', 'label': t('Confirm Password'), },
            ],
            form: { password: '', confirm_password: '' },
            validate: (values) => {
                if (values.password !== values.confirm_password) {
                    add_error(t("Les mots de passe de correspondent pas"))
                    return false;
                }
                if (values.password.length < 6) {
                    add_error(t("La longueur minimum est de 6 charactères"))
                    return false;
                }

                return true;
            }
        });


        let salt = nanoid(5);

        let res = await sqlite_query({ query: "update settings set value = @salt where key = 'sensitive_data_salt'", values: { salt }, fn: 'run' });
        let res2 = await sqlite_query({ query: "update settings set value = @password where key = 'sensitive_data_password'", values: { password: encode_password(password.password, salt) }, fn: 'run' });

        await sqlite_query({ query: "update settings set value = '1' where key = 'sensitive_data_checked'", values: {}, fn: 'run' });
        return res;
    }

    //returns true if data are readable
    const is_protected_data_unlocked = async () => {
        let res =  await sqlite_sd_is_unlocked();
        debugger;
        return res;
    }

    const protected_data_unlock = async () => {
        let password_required = await sqlite_sd_req_password();
        if (password_required === true) {
            let result = await isConfirmed("", {
                okLabel: "unlock",
                title: "Unlock sensitive data",
                fields: [
                    { type: 'password', 'name': 'password', 'label': t('Password'), autoFocus: true },
                ],
                form: { password: '' }
            });
            if (result !== false) {
                let res = await sqlite_unlock_sd(result.password)
                if (!res) {
                    add_error('Le mot de passe est invalide');
                    protected_data_unlock()
                }else {
                    setSensitiveLock(false);
                }
                
            }
        }else{
            setSensitiveLock(false);

        }
    }

    const protected_data_lock = async () => {
        await sqlite_lock_sd()
        setSensitiveLock(true);
    }



    useEffect(() => {
        if (ready && !locked && !is_empty(file)) {
            is_protected_data_unlocked().then(res=>{
                setSensitiveLock(!res);
            })
            fetch_stats();
        }
    }, [ready])

    useEffect(() => {

        if (!locked && !is_empty(file)) {
            start_loading(t('checking database'))
            migrate_database().then(res => {
                if (res === false) {
                    close_file();
                    throw new Error('Database has been closed');
                }
                return check_database();
            }).then(res => {
                if (!res) {
                    add_error(t('Your database schema is diverging from current version.'))
                    return
                }
                start_loading(t('updating database 1 / 2'))
                return update_uuids();

            }).then(res => {
                start_loading(t('updating database 2 / 2'))
                return update_hashes();
            }).then(res => {
                return check_data_protection()

            }).then(res => {
                if (res === true) {
                    return isConfirmed('Désirez vous protéger les données sensibles par un mot de passe supplémentaire ?', {
                        okLabel: 'Oui', cancelLabel: 'Non'
                    })
                } else {
                    return null;
                }

            }).then(res => {
                if (res === null) {
                    return true;
                } else if (res === false) {
                    return disable_data_protection();
                } else if (res === true) {
                    return enable_data_protection();
                }
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

    useEffect(() => {
        handleUnlockSensitiveData(() => {
            protected_data_unlock()
            debugger;
        })
        handleLockSensitiveData(()=>{
            protected_data_lock()
            debugger;

        })
    }, [])

    const update_hashes = async () => {

        const subjects = await sqlite_model({ model: "subject", fn: "all", args: [{ hash: null }] })
        if (subjects.length > 0) {

            let [p, terminate] = doHeavyWork({ message: 'subject_hashes', data: subjects });
            let _subjects = await p;

            await sqlite_model_transaction({ model: "subject", fn: 'bulk_update', args: [{ hash: '' }, { id: '' }], arg_stmt: _subjects })
            terminate();
        }

        const mesures = await sqlite_model({ model: "mesure", fn: "all", args: [{ hash: null }] })
        if (mesures.length > 0) {

            let [p, terminate] = doHeavyWork({ message: 'mesures_hashes', data: mesures });

            let _mesures = await p;
            await sqlite_model_transaction({ model: "mesure", fn: 'bulk_update', args: [{ hash: '' }, { id: '' }], arg_stmt: _mesures })
            terminate();

        }

        return true
    }

    const update_uuids = async () => {

        const mesures = await sqlite_model({ model: "mesure", fn: "all", args: [{ subject_uuid: null }] })
        let results = [];
        if (mesures.length > 0) {
            for (let mesure of mesures) {
                let { subject_id } = mesure;
                let { uuid } = await sqlite_query({ query: "select uuid from subjects where id=@subject_id", values: { subject_id }, fn: 'get' });
                if (uuid) {
                    results.push({
                        id: mesure.id,
                        subject_uuid: uuid
                    });
                }
            }
        }
        await sqlite_model_transaction({ model: "mesure", fn: 'bulk_update', args: [{ subject_uuid: '' }, { id: '' }], arg_stmt: results })
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

    const exportToCSV = async (arg) => {

        start_loading('exporting data');
        let result = await sqlite_export({ query: arg, filename: 'bia-export.csv' }).catch(add_error);
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

        let new_subjects = await sqlite_query({ query: `select src.uuid from sync_${hash}.subjects as src EXCEPT select dst.uuid from subjects as dst `, values: {}, fn: 'all' })

        let altered_subjects = await sqlite_query({ query: `select src.uuid,src.hash from sync_${hash}.subjects as src EXCEPT select dst.uuid,dst.hash from subjects as dst `, values: {}, fn: 'all' })

        let new_mesures = await sqlite_query({ query: `select src.uuid from sync_${hash}.mesures as src EXCEPT select dst.uuid from mesures as dst `, values: {}, fn: 'all' })

        let altered_mesures = await sqlite_query({ query: `select src.uuid,src.hash from sync_${hash}.mesures as src EXCEPT select dst.uuid,dst.hash from mesures as dst `, values: {}, fn: 'all' })



        debugger;
        result.subjects.new = new_subjects.length

        result.subjects.altered = altered_subjects.length - new_subjects.length

        result.mesures.new = new_mesures.length
        result.mesures.altered = altered_mesures.length - new_mesures.length
        return result;
    }

    const attached_sync = async hash => {

        let results = [];
        let altered_subjects = await sqlite_query({
            query: `select src.uuid,src.hash from sync_${hash}.subjects as src EXCEPT select dst.uuid,dst.hash from subjects as dst `, values: {},
            fn: 'all'
        })


        debugger;

        for (let _subject of altered_subjects) {
            let _result = await sqlite_model({ model: "subject", fn: "fetchFull", args: [{ uuid: _subject.uuid }, { subject_uuid: _subject.uuid }, 'sync_' + hash, true] })
            results.push(_result)
        }

        debugger;
        sqlite_import({ model: 'subject', data: results })

        let altered_mesures = await sqlite_query({ query: `select src.uuid,src.hash from sync_${hash}.mesures as src EXCEPT select dst.uuid,dst.hash from mesures as dst `, values: {}, fn: 'all' })

        debugger;

        for (let _mesure of altered_mesures) {
            let _result = await sqlite_model({ model: "mesure", fn: "fetch", args: [{ uuid: _mesure.uuid }, 'sync_' + hash, true] })
            debugger;

            let { id, uuid } = await sqlite_model({ model: "subject", fn: "fetchFull", args: [{ uuid: _result.subject_uuid }, { subject_uuid: _result.subject_uuid }] })

            sqlite_model_transaction({ model: 'mesure', fn: 'import', args: [{ id, uuid }], arg_stmt: [_result] }).catch(add_error)
        }


    }

    const detach_all = async () => {
        let attached = await sqlite_query({ query: `select * from pragma_database_list where name != 'main'`, values: {}, fn: 'all' })
        attached.map(item => {
            detach(item['name'], '')
        })
    }

    const db_name = file
    return (
        <BackendProvider type="sqlite" actions={{
            get_subject_by_uuid, get_subject, ready, search, search_custom_filters, create_database, fetch_stats, stats, db_name, search_count, get_lists, get_forms, create_subject, save_subject, save_subject_mesures, delete_mesure, fetch_lists, fetch_list, save_list, add_list_item, delete_list_item, save_list_item, attach, detach, detach_all, should_reload_lists, exportToCSV, attached_stats_query, attached_sync,update_subject,
            sensitive_lock, protected_data_unlock, protected_data_lock
        }}>

            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}
