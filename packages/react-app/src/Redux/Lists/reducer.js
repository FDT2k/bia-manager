import {createReducer, combineReducers} from '@karsegard/react-redux';




export default (getModule) => {

    const { submodules, types } = getModule()

    const module = {};
    module.reducer = createReducer({},{
        ['default']: (state,action) => ({
            ...state,
            collection:submodules.collection.reducer(state.collection,action)
        })
    });

    return module;
}