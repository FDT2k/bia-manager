import {compose} from '@karsegard/composite-js'
import {calc_age} from '@/references/age';


const age = (patient) => {

    return {
        ...patient,
        age: calc_age(patient.birthdate)
    }
}


const mesures = (patient) => {

    return {
        ...patient,
        mesures:  patient.mesures ? patient.mesures: []
    }
}


const count_mesures = (patient) => {

    return {
        ...patient,
        mesure_count: patient.mesures ? patient.mesures.length: 0
    }
}

export const normalize = compose(age,count_mesures,mesures);

