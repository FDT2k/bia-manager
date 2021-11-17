import {format} from 'date-fns'
import {dateHumanToSys} from '@/references/format'
export default {
    lastname:'',
    firstname:'',
    birthdate:dateHumanToSys(new Date()),
    age:0,
    usual_height: 0,
    usual_weight: 0,
    gender:'M',
    groups:{

    },
    mesures:[]
};