
import create from 'Redux/utils/make-action'
import {createAction} from '@reduxjs/toolkit'
import {compare} from '@karsegard/composite-js/List'
import createAsyncAction,{makePromiseDispatcher} from 'Redux/utils/async-dispatch'


export const EDIT_PATIENT = 'EDIT_PATIENT';
export const EDIT_MESURE = 'EDIT_MESURE';



export const edit_patient = create(EDIT_PATIENT);
