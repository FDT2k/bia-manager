
import {curry} from '@geekagency/composite-js'
import {spec} from '@geekagency/composite-js/ObjectUtils'
import Promise from 'bluebird'

const getAll = db => _ => {

    console.log(db);
    return db.patients.toArray();
};


const buildQuery = collection => tag => {
    const searchableColumns = [
        'nom','prenom','dateNaissance','groupePath'
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

const import_data = db => data => {
    return db.open().then( db =>{
        return db.patients.bulkAdd(data);
    });
}
const api = {getAll,search,import_data}

export default spec(api)
