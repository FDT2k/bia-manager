
import {curry} from '@geekagency/composite-js'
import {spec} from '@geekagency/composite-js/ObjectUtils'
import Promise from 'bluebird'

const getAll = db => _ => {

    console.log(db);
    return db.patients.toArray();
};


const search = db => query=> {


    return db.open().then( db =>{
        let result =  db.patients
            .where('nom').startsWithIgnoreCase('Fabien')
            .or('prenom').startsWithIgnoreCase('Fabien')

            .toArray();

        console.log (result );
        return result
    } );
}


const api = {getAll,search}

export default spec(api)
