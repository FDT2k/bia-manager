import opendb,{createdb as _createdb} from './sqlcipher'

import list from './model/list';
import mesure from './model/mesure';
import subject from './model/subject';






export const createdb =  _createdb({
    subject,
    mesure,
    list
})

export default opendb({
    subject,
    mesure,
    list
})