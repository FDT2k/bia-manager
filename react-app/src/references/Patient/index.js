import {calc_age} from 'references/age';


const age = (patient) => {


    return {
        ...patient,
        age: calc_age(patient.birthdate)
    }
}


export const normalize = age;

