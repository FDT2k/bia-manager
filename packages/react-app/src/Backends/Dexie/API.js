
import { curry, is_nil, is_array, merge, enlist } from '@karsegard/composite-js'
import { keyval, spec } from '@karsegard/composite-js/ObjectUtils'
import { mergeAll } from '@karsegard/composite-js/List'

import IDBExport from '@karsegard/indexeddb-export-import';

import Promise from 'bluebird'
import moment from 'moment';
import {filter_active_mesure} from '@/references/Mesure'


export default (db, events = {}) => {

    const { handleSave } = events;
    const module = {};

    module.getAll = _ => {

        console.log(db);
        return db.patients.toArray();
    };


    const buildQuery = collection => tag => {
        const searchableColumns = [
            'firstname', 'lastname', 'birthdate', 'groups.patho'
        ];

        let method = 'where';
        return searchableColumns.reduce((collection, key) => {
            console.log(collection);
            collection = collection[method](key).startsWithIgnoreCase(tag);
            method = 'or';
            return collection;
        }, collection);


    }

    const buildFieldQuery = collection => (key, value) => {
        return collection.where(key).startsWithIgnoreCase(value);
    }

    module.search = tags => {
        //const worker = new Worker("dexie.worker.js");
        //worker.postMessage('coucou');
        //worker.onmessage = console.error;
        return db.open().then(db => {

            let collection = db.patients;

            for (let i = 0; i < tags.length; i++) {

                const tag = tags[i];

                let hasField = tag.indexOf(':') !== -1;

                if (hasField) {
                    let fieldpos = tag.indexOf(':');
                    let key = tag.substr(0, fieldpos).trim();
                    let value = tag.substr(fieldpos + 1).trim();
                    console.log('specific search:', key, value);
                    collection = buildFieldQuery(collection)(key, value);
                } else {
                    console.log('globalsearch', tag);
                    collection = buildQuery(collection)(tag);
                }


            }
            return collection.toArray();
            /*
                    let result =  db.patients
                        .where('nom').startsWithIgnoreCase('Fabien')
                        .or('prenom').startsWithIgnoreCase('Fabien')
        
                        .toArray();
            */
            //    console.log ( collection.toArray() );


        });

    }

    module.search_custom_filters = (custom_filters) => {


        return db.open().then(db => {
            let collection = db.patients;
            let method = 'where';
            enlist(custom_filters).map(filter_obj => {
                const [field, filter] = keyval(filter_obj)

                if (!is_nil(filter) ){
                    switch (filter.type) {
                        case 'date_range':
                            collection = module.search_date_range({ collection, field: filter.key, from: filter.from, until: filter.to, method })
                            method = 'and';
                            break;
                    }
                }

            })

            return collection.toArray();
        });
    }

    module.search_date_range = ({ collection, field, from, until, method }) => {
        if (method !== 'and') {
            if (!is_nil(from) && !is_nil(until)) {
                collection = collection.where(field).between(from, until)
            } else if (!is_nil(from) && is_nil(until)) {
                collection = collection.where(field).aboveOrEqual(from)
            } else if (is_nil(from) && !is_nil(until)) {
                collection = collection.where(field).belowOrEqual(until)
            }
            return collection
        } else {
            return collection.and(item => {
                let _field = item[field]
                if (is_array(_field)) {

                    for (let i = 0; i < _field.length; i++) {
                        const item = _field[i];

                        if (!is_nil(from) && !is_nil(until) && moment(item).isSameOrAfter(from) && moment(item).isSameOrBefore(until)) {
                            return true
                        } else if (!is_nil(from) && is_nil(until) && moment(item).isSameOrAfter(from)) {
                            return true
                        } else if (is_nil(from) && !is_nil(until) && moment(item).isSameOrBefore(until)) {
                            return true
                        }
                    }
                    return false;

                } else {

                    if (!is_nil(from) && !is_nil(until)) {
                        return moment(_field).isSameOrAfter(from) && moment(_field).isSameOrBefore(until)
                    } else if (!is_nil(from) && is_nil(until)) {
                        return moment(_field).isSameOrAfter(from)
                    } else if (is_nil(from) && !is_nil(until)) {
                        return moment(_field).isSameOrBefore(until)

                    }
                }
            })
        }
    }

    module.get_patient = id => {
        return db.open().then(db => {
            return db.patients.get(parseInt(id));
        });
    }

    module.getBy = ({ collection, key, value }) => {
        return db.open().then(db => {
            return db[collection].where({ [key]: value }).first();
        });
    }


    module.update_patient = ({ id, patient, mesure, mesure_id }) => {
        if (!is_nil(mesure)) {
            if (mesure_id >= patient.mesures.length) {
                patient.mesures.push(mesure);
            } else {

                patient.mesures = patient.mesures.map((item, idx) => {

                    if (idx == mesure_id) {
                        return mesure
                    }

                    return item;

                });

            }
        }
        return db.open().then(db => {
            return db.patients.update(id, patient)
                .then(res => {
                    handleSave && handleSave()
                });
        });
    }



    module.update = ({ collection, id, item }) => {
        return db.open().then(db => {
            return db[collection].update(id, item).then(_ => {

                return module.getBy({ collection, key: 'id', value: id })
            })

        });
    }

    module.update_list = ({ key, name, list }) => {
        return db.open().then(db => {
            return module.getBy({ collection: 'lists', key: 'key', value: key })
        }).then(res => {

            if (is_nil(res)) {
                return db.lists.add({ key, name, list })
            } else {

                //   let modifications = enlist(merge(mergeAll(list),mergeAll(res.list)))
                return module.update({ collection: 'lists', id: res.id, item: { list } })
            }
        })
    }


    module.create_patient = (patient) => {
        return db.open().then(db => {

            return db.patients.add(patient);
        }).then(id => {
            return module.get_patient(id)
        })
    }

    module.count = _ => {
        return db.open().then(db => {
            return db.patients.count();
        });
    }

    module.count_mesures = _ => {
        let count = 0;
        return db.open().then(db => {
            return db.patients.each(item => {
                count += item.mesures.filter(filter_active_mesure).length;
            }).then(_ => { return count });
        });
    }

    module.db_name = _ => {
        return db.name;
    }


    module.get_list = ({ key }) => {
        return db.open().then(db => {
            return db.lists.where('key').equals(key).first().then(res => res.list);
        });
    }

    module.get_lists = _ => {
        return db.open().then(db => {
            return db.lists.toArray();
        });
    }


    module.all_pathological_groups = _ => {
        return module.get_list({ key: 'pathological_groups' })
    }

    module.all_ethnological_groups = _ => {
        return module.get_list({ key: 'ethnological_groups' })

    }

    module.all_sport_types = _ => {
        return module.get_list({ key: 'physical_activity_type' })

    }
    module.all_sport_rates = _ => {
        return module.get_list({ key: 'physical_activity_rate' })

    }
    module.all_machines = _ => {
        return module.get_list({ key: 'machines' })

    }
    module.all_genders = _ => {
        return module.get_list({ key: 'genders' })
        //return db.open().then(db => {
        // return db.patients.orderBy('gender').uniqueKeys();
        //})
    }

    module.export_database = _ => {
        return db.open().then(_ => {
            const idbDatabase = db.backendDB(); // get native IDBDatabase object from Dexie wrapper

            // export to JSON, clear database, and import from JSON
            return new Promise((resolve, reject) => {
                IDBExport.exportToJsonString(idbDatabase, function (err, jsonString) {
                    resolve(jsonString);
                });

            });
        }).catch(function (e) {
            console.error('Could not connect. ' + e);
        });
    }

    module.wipe_database = _ => {
        return db.open().then(_ => {
            /*const idbDatabase = db.backendDB(); // get native IDBDatabase object from Dexie wrapper
            return new Promise((resolve, reject) => {
                IDBExport.clearDatabase(idbDatabase, function (err) {
                    if (!err) { // cleared data successfully
                        resolve(idbDatabase);
                    } else {
                        reject(err)
                    }
                });
            });*/
            return db.delete().then(_ => db.open());
        });
    }

    module.import_database = data => {
        return db.open().then(_ => {
            const idbDatabase = db.backendDB(); // get native IDBDatabase object from Dexie wrapper
            return new Promise((resolve, reject) => {

                IDBExport.clearDatabase(idbDatabase, function (err) {

                    if (!err) { // cleared data successfully
                        IDBExport.importFromJsonString(idbDatabase, data, function (err) {
                            resolve(true);
                        });
                    } else {
                        reject(err);
                    }

                });
            });

        }).catch(function (e) {
            console.error('Could not connect. ' + e);
        });
    }

    module.bulk_add = ({ collection, list }) => {

        return db.open().then(db => {
            return db[collection].bulkAdd(list);
        });
    }
    return module
}

/*
const api = { getAll,  wipe_database,search, import_data, get_patient, count, db_name, export_database, import_database, count_mesures, all_pahological_groups ,update_patient}

export default spec(api)
*/