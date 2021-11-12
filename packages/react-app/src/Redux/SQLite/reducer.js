import {combineReducers, createReducer} from '@karsegard/react-redux';


export default (getModule) => {

    const { submodules, action_types } = getModule()


    const module = {};



    module.name = createReducer("",{
        [action_types.CONNECTED]: (state,{payload}) => payload
    })



    module.stats = createReducer({},{
        [action_types.UPDATE_STAT] : (state,{payload}) => ({...state,[payload.key]:payload.value})

    })

    module.unlocked = createReducer(false,{})

    module.reducer = combineReducers({
        unlocked:module.unlocked,
        db_name: module.name,
        stats: module.stats
    })
    return module;
}