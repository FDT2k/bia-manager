import {compose} from '@karsegard/composite-js'
import {calc_age} from 'references/age';


const age = (patient) => {


    return {
        ...patient,
        age: calc_age(patient.birthdate)
    }
}


const count_mesures = (patient) => {


    return {
        ...patient,
        mesure_count: patient.mesures.length
    }
}

export const normalize = compose(age,count_mesures);

