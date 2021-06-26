
import {curry} from '@geekagency/composite-js'
import {spec} from '@geekagency/composite-js/ObjectUtils'
const getAll = db => _ => {

    console.log(db);
    return db.patients.toArray();
};


const api = {getAll}

export default spec(api)