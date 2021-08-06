
import {curry} from '@karsegard/composite-js'
import {spec} from '@karsegard/composite-js/ObjectUtils'
import Promise from 'bluebird'

const getAll = db => _ => {

    console.log(db);
    return db.patients.toArray();
};


const buildQuery = collection => tag => {
    const searchableColumns = [
        'firstname','lastname','birthdate','groups.path'
    ];

    let method = 'where';
    return searchableColumns.reduce( (collection, key) => {
        console.log(collection);
        collection =  collection[method](key).startsWithIgnoreCase(tag);
        method='or';
        return collection;
    }, collection);


}

const buildFieldQuery = collection => (key,value)=> {
    return collection.where(key).startsWithIgnoreCase(value);
}

const search = db => tags=> {

    //const worker = new Worker("dexie.worker.js");
    //worker.postMessage('coucou');
    //worker.onmessage = console.error;
        return db.open().then( db =>{

            let collection = db.patients;

            for(let i =0; i < tags.length;i++){

                const tag = tags[i];

                let hasField = tag.indexOf(':') !==-1;

                if(hasField){
                    let fieldpos = tag.indexOf(':');
                    let key = tag.substr(0,fieldpos).trim();
                    let value = tag.substr(fieldpos+1).trim();
                    console.log('specific search:',key,value);
                    collection = buildFieldQuery(collection)(key,value);
                }else{
                    console.log('globalsearch',tag);
                    collection=buildQuery(collection)(tag);
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


        } );


}

const get_patient = db=>  id=> {
    return db.open().then( db =>{
        return db.patients.get(parseInt(id));
    });
}

const count = db => _=> {
    return db.open().then( db =>{
        return db.patients.count();
    });
}

const count_mesures = db => _=> {
    let count = 0;
    return db.open().then( db =>{
        return db.patients.each(item=> {
            count+= item.mesures.length;
        }).then(_=> {return count});
    });
}

const db_name = db => _=> {
    return db.name;
}

const import_data = db => data => {
    return db.open().then( db =>{
        return db.patients.bulkAdd(data);
    });
}
const api = {getAll,search,import_data,get_patient,count,db_name,count_mesures}

export default spec(api)
