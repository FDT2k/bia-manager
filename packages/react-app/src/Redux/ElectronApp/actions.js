import {createAction, createAsyncAction}from '@karsegard/react-redux';

import api from '@/Backends/Electron'


export default (getModule) => {

    const { action_types, selectors } = getModule()


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


    actions.start_loading = createAction(action_types.LOADING);
    actions.stop_loading = createAction(action_types.LOADING_DONE);

    actions.open_file = file => (dispatch,getState)=> {
        
        return createAsyncAction(openFileFails,openFileSuccess)(api.open).then(({content,filename}) => {
            
            

        })

    } 





    actions.save_file = promise => {
        
    }

    return actions;
}



