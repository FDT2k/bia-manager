import { createReducer, combineReducers } from '@karsegard/react-redux';


const initialState = {
    forms:{
        subject:{
            lists:[
                {key:'gender',list:'genders',path:'gender'},
                {key:'ethno',list:'ethnological_groups',path:'groups.ethno'},
                {key:'patho',list:'pathological_groups',path:'groups.patho'},
            ]
        },
        mesure:{
            lists:[
                {key:'sport_rate',list:'sport_rate',path:'sport.rate'},
                {key:'sport_type',list:'sport_type',path:'sport.type'},
                {key:'machine',list:'machine',path:'machine'},
                {key:'examinator',list:'examinator',path:'examinator', default_value:'Fabien'},
            ]
        }
    }

}


export default (getModule) => {

    const { submodules, types } = getModule()


    const module = {};

    module.reducer = createReducer(initialState, {})


    return module;
}