import { createSlice, createSelector } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit';


import {identity} from '@geekagency/composite-js';


export const makeSelectors = (baseSelector= identity) => {

    return {
        selectDatabases: createSelector([baseSelector], state => {
            return state.list
        })
    }
}

export const makeSlice= (name="database") => createSlice({
    name,
    initialState: {
        active: null,
        list: []
    },
    reducers: {
        add: {
            reducer: (state, action) => {
                state.list.push(action.payload);
            },
            prepare : (name) => {
                return {payload:{name,uid:nanoid()}}
            }
        },
        del: (state, action) => {
            state.list = state.list.filter((db) =>{
                return db.uid !== action.payload.uid
            } );
        }
    },
})




export default makeSlice();