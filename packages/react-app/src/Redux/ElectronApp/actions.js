import {createAction, createAsyncAction,bindSelectors}from '@karsegard/react-redux';

import api from '@/Backends/Electron'


export default (getModule) => {

    const { action_types, selectors,submodules } = getModule()


    const getBackend = (getState)=> {
        const {backend} = bindSelectors({backend: selectors.select_backend},getState());
        
        return submodules.backends[backend].actions;
    }

    const actions = {};

/* start_loading("Waiting on user confirmation");
        dispatch_open(open).then(res => {
            start_loading("importing data");
            if (res && res.content) {
                return api.import_database(res.content)

            } else {
                return false;
            }
        })
        .then( result => {
            stop_loading()
            if(result){
                window.location.hash = '#/search'
            }
          
        })
        .catch(console.error); */

    const openFileFails = createAction(action_types.OPEN_FILE_FAILS);
    const openFileSuccess = createAction(action_types.OPEN_FILE_SUCCESS,arg => {
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
            debugger;
            dispatch(actions.async_api('save',data))
        });
        
    }


    actions.start_loading = createAction(action_types.LOADING);
    actions.stop_loading = createAction(action_types.LOADING_DONE);
    actions.async_open = createAsyncAction(openFileFails,openFileSuccess)
    actions.open_file = _ => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
       
        return dispatch(actions.async_open(api.open)).then((result) => {
            return dispatch(backend_actions.open_file(result));
        })

    } 





    actions.save_file = promise => {
        
    }

    return actions;
}



