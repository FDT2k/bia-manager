import {createAction, createAsyncAction,bindSelectors}from '@karsegard/react-redux';

import api from '@/Backends/Electron'
import { compare } from '@karsegard/composite-js/List';


export default (getModule) => {

    const { action_types, selectors,submodules } = getModule()


    const getBackend = (getState)=> {
        const {backend} = bindSelectors({backend: selectors.select_backend},getState());
        
        return submodules.backends[backend].actions;
    }

    const actions = {};

    actions.init_started= createAction(action_types.INIT)
    actions.init_app = () => (dispatch,getState)=> {
        dispatch(actions.init_started());
        dispatch(actions.async_api('current_filename')).then(res=>{
            dispatch(actions.openFileSuccess({file:res}))
        })
        dispatch(actions.refresh_backend_stats());
    }
    actions.refresh_backend_stats = () => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        return dispatch (backend_actions.refresh_stats())
    }



    actions.openFileFails = createAction(action_types.OPEN_FILE_FAILS);
    actions.openFileSuccess = createAction(action_types.OPEN_FILE_SUCCESS,arg => {
        const {content,...rest} = arg;
        return rest;
    });


    actions.api_call_started = createAction(action_types.API_CALL_STARTED)
    actions.api_call_success = createAction(action_types.API_CALL_SUCCESS)
    actions.api_call_error = createAction(action_types.API_CALL_ERROR)
    actions.call_api = createAsyncAction( actions.api_call_error,actions.api_call_success)

    actions.async_api = (fn_name,...args) => (dispatch,getState)=>{
        dispatch(actions.api_call_started(fn_name))
        return dispatch(actions.call_api(api[fn_name],...args))
    }

    actions.save_to_file = _=> (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        const filename = selectors.current_file(getState());
        dispatch(backend_actions.export_data()).then(data => {
            dispatch(actions.async_api('save',data))
        });
        
    }


    actions.start_loading = createAction(action_types.LOADING);
    actions.stop_loading = createAction(action_types.LOADING_DONE);
    actions.async_open = createAsyncAction(actions.openFileFails,actions.openFileSuccess)
    actions.open_file = _ => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
       
        return dispatch(actions.async_open(api.open)).then((result) => {
            if(result && ! result.canceled){
                return dispatch(backend_actions.open_file(result));
            }else if(result && result.canceled){
                dispatch({type:action_types.OPEN_CANCELED_BY_USER})
            }

        })

    } 



    actions.search_in_database = (tag) => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        return dispatch (backend_actions.search(tag))
    }

  
    actions.search = tags => (dispatch,getState) => {

        const {filter_results,update_search_tags,fetched_patient} = submodules.features.search.actions;
        const {select_tags} = submodules.features.search.selectors;

        const current_tags =  select_tags(getState());
        // eslint-disable-next-line no-unused-vars
        const [first_tag, ...other_tags] = tags;

        if (compare(current_tags, tags)) {
            console.log('tag did not changed')
            return;
        }

        

        dispatch(update_search_tags(tags));

        if (first_tag && tags.length === 1 && first_tag !== current_tags[0]) { // if the first tag did change, then refetch a preset from the database
            return dispatch(actions.search_in_database(tags)).then(result => {
                return dispatch(fetched_patient(result));
            }).then (_=> {
                return dispatch(filter_results());

            });
        } else {
            return dispatch(filter_results());
        }
    }


    actions.save_file = promise => {
        
    }

    return actions;
}



