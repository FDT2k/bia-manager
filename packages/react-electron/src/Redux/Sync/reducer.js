import { combineReducers, createReducer } from '@karsegard/react-redux';

import { is_nil, pop } from '@karsegard/composite-js';

export default (getModule) => {

    const { submodules, types } = getModule()

    let test = {
        name: 'hello.sqlite',
        subjects: {
            new: 0,
            altered: 0
        },
        mesures: {
            new: 0,
            altered: 0
        },
        message: '',
        progress: 99
    };

    const module = {};

    module.filesByHash = createReducer({}, {
        [types.ADD_FILE]: (state, { payload }) => {
            return {...state,[payload.hash]:payload}
        }

    })

    module.files = createReducer([], {
        [types.ADD_FILE]: (state, { payload }) => {
            return [...state, payload.hash]
        }

    })

    module.status = createReducer({}, {
        [types.ADD_FILE]: (state, { payload }) => {
            return {...state,[payload.hash]:'added'}
        },
        [types.ATTACH]: (state,{payload} ) => {
            return {...state,[payload]: 'attached'}
        },
        [types.ERROR]: (state,{payload} ) => {
            return {...state,[payload]: 'error'}
        }
    })


    module.sync = combineReducers(
        {
            status: module.status,
            files: module.files,
            byHash: module.filesByHash
        }
    )


    module.reducer = module.sync;

    return module;
}