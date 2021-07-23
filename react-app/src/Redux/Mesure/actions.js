
import create from 'Redux/utils/make-action'
import {createAction} from '@reduxjs/toolkit'
import {compare} from '@karsegard/composite-js/List'
import createAsyncAction,{makePromiseDispatcher} from 'Redux/utils/async-dispatch'

export const UPDATE_DATA='UPDATE_DATA';
export const UPDATE_DATA='UPDATE_DATA';

export const update_data  = create(UPDATE_DATA);

export const create_mesure =
