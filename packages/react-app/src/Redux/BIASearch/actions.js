import {createAction, createAsyncAction,bindSelectors}from '@karsegard/react-redux';
import { compare } from '@karsegard/composite-js/List';
import { makePromiseDispatcher } from '@/Redux/utils/async-dispatch';


export default (getModule) => {


    const { action_types, baseSelector } = getModule()
    const actions = {};

    actions.clear = createAction(action_types.CLEAR);
    actions.update_search_tags = createAction(action_types.UPDATE_SEARCH_TAGS);
    actions.fetched_patient = createAction(action_types.FETCHED_PATIENTS);

    actions.fetching_from_db = createAction(action_types.FETCHING_FROM_DATABASE);
   
   
    actions.filter_patients = createAction(action_types.FILTER_PATIENTS);
    actions.remove_filter = createAction(action_types.REMOVE_FILTER);


    const ensure_array = x => {
        if (typeof x === 'undefined' || x === null) {
            return []
        }
        return x;
    }



    actions.filter_results = _=>  (dispatch, getState) => {
        const state = baseSelector(getState())
        // eslint-disable-next-line no-unused-vars
        const [first_tag, ...other_tags] = state.tags;


        if (state.tags.length >= 1 && state.tags.length < state.patients.filtered.length) {
            dispatch(actions.remove_filter(null));

        }


        other_tags.map(
            tag => dispatch(actions.filter_patients(tag))
        )

    }

  
    return actions
}