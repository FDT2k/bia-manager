
import create from 'Redux/utils/make-action'


export const ADD_SEARCH_TAG='ADD_SEARCH_TAG';
export const DEL_SEARCH_TAG='DEL_SEARCH_TAG';

export const SEARCH_PATIENT='SEARCH_PATIENT';
export const CREATE_PATIENT='CREATE_PATIENT';
export const UPDATE_PATIENT='UPDATE_PATIENT';
export const DELETE_PATIENT='DELETE_PATIENT';




export const add_search_tag       = create(ADD_SEARCH_TAG);
export const del_search_tag       = create(DEL_SEARCH_TAG);
export const search_patient       = create(SEARCH_PATIENT);
export const create_patient       = create(CREATE_PATIENT);
export const update_patient       = create(UPDATE_PATIENT);
export const delete_patient       = create(DELETE_PATIENT);
