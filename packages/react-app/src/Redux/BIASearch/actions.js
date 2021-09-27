import {createAction, createAsyncAction,bindSelectors}from '@karsegard/react-redux';
import { compare } from '@karsegard/composite-js/List';
import { makePromiseDispatcher } from '@/Redux/utils/async-dispatch';


export default (getModule) => {


    const { action_types, baseSelector } = getModule()
    const actions = {};

    actions.clear = createAction(action_types.CLEAR);
    actions.add_search_tag = createAction(action_types.ADD_SEARCH_TAG);
    actions.update_search_tags = createAction(action_types.UPDATE_SEARCH_TAGS);
    actions.del_search_tag = createAction(action_types.DEL_SEARCH_TAG);
    actions.search_patient = createAction(action_types.SEARCH_PATIENT);
    actions.fetched_patient = createAction(action_types.FETCHED_PATIENTS);
    actions.fetched_patient_fail = createAction(action_types.FETCHED_PATIENTS_FAIL);

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

    actions.search_in_database = makePromiseDispatcher(x => ({ error: x.message }), ensure_array, actions.fetched_patient_fail, actions.fetched_patient);



    actions.search = (dbsearchfn, tags) => (dispatch, getState) => {

        const state = baseSelector(getState())
        // eslint-disable-next-line no-unused-vars
        const [first_tag, ...other_tags] = tags;

        if (compare(state.tags, tags)) {
            console.log('tag did not changed')
            return;
        }

        dispatch(actions.update_search_tags(tags));

        if (first_tag && tags.length === 1 && first_tag !== state.tags[0]) { // if the first tag did change, then refetch a preset from the database
            dispatch(actions.fetching_from_db({}));
            const search = dispatch(actions.search_in_database(dbsearchfn(first_tag)));
            return search.then(result => {
                dispatch(actions.filter_results());
            });
        } else {
            dispatch(actions.filter_results());
            //    return dispatch(actions.filter_patients(tags));

        }
    }
    

    return actions
}