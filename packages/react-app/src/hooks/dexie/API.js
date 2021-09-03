
import { curry } from '@karsegard/composite-js'
import { spec } from '@karsegard/composite-js/ObjectUtils'
import IDBExport from 'indexeddb-export-import';

import Promise from 'bluebird'

const getAll = db => _ => {

    console.log(db);
    return db.patients.toArray();
};


const buildQuery = collection => tag => {
    const searchableColumns = [
        'firstname', 'lastname', 'birthdate', 'groups.path'
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

const search = db => tags => {

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

const get_patient = db => id => {
    return db.open().then(db => {
        return db.patients.get(parseInt(id));
    });
}


const update_patient = db => (id, patient,mesure,mesure_id) => {

    
    if(mesure_id >= patient.mesures.length){
        patient.mesures.push(mesure);
    }else{

        patient.mesures = patient.mesures.map((item,idx)=>{

            if(idx == mesure_id){
                return mesure
            }

            return item;

        } );

    }
debugger;
    return db.open().then(db => {
        return db.patients.update(id, patient);
    });
}

const count = db => _ => {
    return db.open().then(db => {
        return db.patients.count();
    });
}

const count_mesures = db => _ => {
    let count = 0;
    return db.open().then(db => {
        return db.patients.each(item => {
            count += item.mesures.length;
        }).then(_ => { return count });
    });
}

const db_name = db => _ => {
    return db.name;
}

const all_pahological_groups = db => _ => {
    return db.open().then(db => {
        return db.patients.orderBy('groups.path').uniqueKeys();
    });
}

const export_database = db => _ => {
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

const wipe_database = db=> _=> {
    return db.open().then(_ => {
        const idbDatabase = db.backendDB(); // get native IDBDatabase object from Dexie wrapper
        return new Promise((resolve, reject) => {
            IDBExport.clearDatabase(idbDatabase, function (err) {
                if (!err) { // cleared data successfully
                    resolve(idbDatabase);
                }else{
                    reject(err)
                }
            });
        });
    });
}


const import_database = db => data => {
    return db.open().then(_ => {
        const idbDatabase = db.backendDB(); // get native IDBDatabase object from Dexie wrapper
        return new Promise((resolve, reject) => {
            IDBExport.clearDatabase(idbDatabase, function (err) {
                if (!err) { // cleared data successfully
                    IDBExport.importFromJsonString(idbDatabase, data, function (err) {
                        resolve();
                    });
                }
            });
        });

    }).catch(function (e) {
        console.error('Could not connect. ' + e);
    });
}

const import_data = db => data => {
    return db.open().then(db => {
        return db.patients.bulkAdd(data);
    });
}
const api = { getAll,  wipe_database,search, import_data, get_patient, count, db_name, export_database, import_database, count_mesures, all_pahological_groups ,update_patient}

export default spec(api)
