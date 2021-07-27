
import createReducer from 'Redux/utils/create-reducer'
import {combineReducers} from 'redux'
import {EDIT_PATIENT} from './actions';

import {delFromList,addToListUniq,delObjectProp,updateProp} from 'Redux/utils/handlers';

export const machines = createReducer(['Nutriguard'],{

});

export const physical_act = createReducer(['élevée'],{

});
export const type_act = createReducer(['endurance','muscu'],{

});


export const examinators = createReducer(['Fabien','Bob'],{

});

/*
const EMPTY_MESURE= {
    id: null,
    examinator: "",
    date : "",
    height: 0,
    weight: 0,
    comment: "",
    groups: {
        phys_activity: "",
        type_physical_activity:"",
    },
    bia_data:{
        side: 'R',
        a100: 0,
        a5: 0,
        a50 :0,
        z100:0,
        z5:0,
        z50:0,
        rea5:0,
        rea50:0,
        rea100:0,
        res5:0,
        res50:0,
        res100:0,
        bmi_ref:null
    },
    formulas_results: {
        'segal': {
            bmi:0,
            ​water: 0,
            fat_free_mass_index: 0,
            ​​​fat_mass_index: 0,
            fat_mass : 0,
            fat_free_mass: 0,
            fat_free_dry_mass: 0,
            water_ratio: 0,
            fat_ratio: 0,
            fat_free_ratio: 0,
            fat_free_dry_ratio: 0
        },
        'kuschner':{
            bmi:0,
            ​water: 0,
            fat_free_mass_index: 0,
            ​​​fat_mass_index: 0,
            fat_mass : 0,
            fat_free_mass: 0,
            fat_free_dry_mass: 0,
            water_ratio: 0,
            fat_ratio: 0,
            fat_free_ratio: 0,
            fat_free_dry_ratio: 0
        },
        'geneva':{
            bmi:0,
            ​water: 0,
            fat_free_mass_index: 0,
            ​​​fat_mass_index: 0,
            fat_mass : 0,
            fat_free_mass: 0,
            fat_free_dry_mass: 0,
            water_ratio: 0,
            fat_ratio: 0,
            fat_free_ratio: 0,
            fat_free_dry_ratio: 0
        }
    }
}*/


export const mesure = createReducer({},{

});


export const patient = createReducer({},{
    [EDIT_PATIENT]: (state,{payload})=> updateProp(payload.id,state,payload)
})



export const reducer = combineReducers({
    machines,
    examinators,
    mesure,
    patient,
    physical_act,
    type_act

});


export default reducer;