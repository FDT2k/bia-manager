import {combineReducers, createReducer} from '@karsegard/react-redux';


export default (getModule) => {

    const { submodules, action_types } = getModule()


    const module = {};



    module.reducer = createReducer({db_name:"default"},{
        [action_types.SET_DB_NAME]: (state,{payload}) => payload
    })

    return module;
}