import { combineReducers as combineReducersRedux } from 'redux'
import {assign2} from '@geekagency/composite-js'

export const createReducer = (initialState, handlers) => {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}


export const combineReducers = combineReducersRedux;

export const actionNamer = reducer => name => `${reducer}/${name}`




export const updateObject = assign2