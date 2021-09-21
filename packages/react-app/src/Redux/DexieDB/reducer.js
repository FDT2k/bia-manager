import {combineReducers, createReducer} from '@karsegard/react-redux';


export default (getModule) => {

    const { submodules, action_types } = getModule()


    const module = {};



    module.name = createReducer("default",{
        [action_types.SET_DB_NAME]: (state,{payload}) => payload.db_name
    })



    module.stats = createReducer({},{
        [action_types.UPDATE_STAT] : (state,{payload}) => ({...state,[payload.key]:payload.value})

    })

    module.reducer = combineReducers({
        db_name: module.name,
        stats: module.stats
    })
    return module;
}