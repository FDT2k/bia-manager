
import create from 'Redux/utils/make-action'
import {createAction} from '@reduxjs/toolkit'
import {compare} from '@karsegard/composite-js/List'
import {makePromiseDispatcher} from 'Redux/utils/async-dispatch'

export const ADD_SEARCH_TAG='ADD_SEARCH_TAG';
export const DEL_SEARCH_TAG='DEL_SEARCH_TAG';
export const UPDATE_SEARCH_TAGS='UPDATE_SEARCH_TAGS';

export const FETCHED_PATIENTS='FETCHED_PATIENTS';
export const FETCHED_PATIENTS_FAIL='FETCHED_PATIENTS_FAIL';
export const SEARCH_PATIENT='SEARCH_PATIENT';
export const CREATE_PATIENT='CREATE_PATIENT';
export const UPDATE_PATIENT='UPDATE_PATIENT';
export const DELETE_PATIENT='DELETE_PATIENT';
export const FETCHING_FROM_DATABASE='FETCHING_FROM_DATABASE';
export const FILTER_PATIENTS= 'FILTER_PATIENTS';
export const REMOVE_FILTER= 'REMOVE_FILTER';



export const add_search_tag       = create(ADD_SEARCH_TAG);
export const update_search_tags   = createAction(UPDATE_SEARCH_TAGS);
export const del_search_tag       = create(DEL_SEARCH_TAG);
export const search_patient       = create(SEARCH_PATIENT);
export const create_patient       = create(CREATE_PATIENT);
export const update_patient       = create(UPDATE_PATIENT);
export const delete_patient       = create(DELETE_PATIENT);
export const fetched_patient       = create(FETCHED_PATIENTS);
export const fetched_patient_fail       = create(FETCHED_PATIENTS_FAIL);

export const fetching_from_db = create(FETCHING_FROM_DATABASE);
export const filter_patients = create(FILTER_PATIENTS);
export const remove_filter = create(REMOVE_FILTER);


export const ensure_array = x => {
    if(typeof x ==='undefined' || x ===null){
        return []
    }
    return x;
}
export const search_in_database = makePromiseDispatcher(x=>({error:x.message}),ensure_array,fetched_patient_fail,fetched_patient);


export const filter_results = (baseSelector) => (dispatch,getState)=>{
    const state = baseSelector(getState())
// eslint-disable-next-line no-unused-vars
    const [first_tag,...other_tags] =state.tags;


    if(state.tags.length >= 1 && state.tags.length < state.patients.filtered.length){
        dispatch(remove_filter(null));

    }


    other_tags.map(
        tag => dispatch(filter_patients(tag))
    )

}

export const makeSearch = baseSelector => (dbsearchfn,tags) => (dispatch,getState)=> {

    const state = baseSelector(getState())
// eslint-disable-next-line no-unused-vars
    const [first_tag,...other_tags] =tags;

    if( compare(state.tags,tags)){
        console.log('tag did not changed')
        return ;
    }


    dispatch(update_search_tags(tags));



    if(first_tag && tags.length===1 && first_tag !== state.tags[0]){ // if the first tag did change, then refetch a preset from the database
        dispatch(fetching_from_db({}));
        const search = dispatch(search_in_database(dbsearchfn(first_tag)));
        return search.then(result=> {
            dispatch(filter_results(baseSelector));
        });
    }else{
        dispatch(filter_results(baseSelector));
    //    return dispatch(filter_patients(tags));

    }
}
