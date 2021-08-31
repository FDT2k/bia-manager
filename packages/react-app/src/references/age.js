import { is_nil } from '@karsegard/composite-js';


export const calc_age = (birthdate, _date) => {

    let date = is_nil(_date) ? Date.now() : (new Date(_date)).getTime()

    var ageDifMs = date - (new Date(birthdate)).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}