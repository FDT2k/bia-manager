import {createAction, createAsyncAction}from '@karsegard/react-redux';
import makeBackEnd from '@/Backends/Dexie'


export const DexieBackend = makeBackEnd();



export default (getModule) => {

    const { action_types, selectors } = getModule()
    const actions = {};


    const get_backend = getState => {
        const dbname = selectors.select_db_name(getState());

        return DexieBackend(dbname);
    }


  
    actions.update_stat = createAction(action_types.UPDATE_STAT)

    actions.set_db = createAction(action_types.SET_DB_NAME)

    actions.api = (fn_name,args)=>  (dispatch,getState)=> {
        let dexie = get_backend(getState);

        return dispatch (dexie.fn_name)
    }

    actions.add_error = createAction(action_types.ADD_ERROR)

    actions.api_call_started = createAction(action_types.API_CALL_STARTED)

    actions.api_call_success = createAction(action_types.API_CALL_SUCCESS)
    actions.api_call_error = createAction(action_types.API_CALL_ERROR)


    actions.call_api = createAsyncAction( actions.api_call_error,actions.api_call_success)
    
    actions.async_api = (fn_name,...args) => (dispatch,getState)=>{
        let dexie = get_backend(getState);
        dispatch(actions.api_call_started(fn_name))
        return dispatch(actions.call_api(dexie[fn_name],...args))
    }

    actions.imported_database = createAction(action_types.IMPORT_DATABASE)

    actions.import_data = data=> (dispatch,getState)=> {
        return dispatch(actions.async_api('import_database',data)).then(res => {
            return dispatch(actions.imported_database(selectors.select_db_name(getState())));
        }).then(_=> {
            return dispatch(actions.refresh_stats());
        })
    } 

    actions.refresh_stats= _=> (dispatch,getState)=>{
        return dispatch(actions.async_api('count')).then (res=> {
            dispatch(actions.update_stat({key:'count',value:res}));
            return dispatch(actions.async_api('count_mesures'));
        }).then(res=>{
            return dispatch(actions.update_stat({key:'count_mesures',value:res}));
        })
    }

    actions.export_data = data => (dispatch,getState)=> {

        return dispatch(actions.async_api('export_database'));
    }

    actions.clear_database = _=> (dispatch,getSTate)=>{
        return dispatch(actions.async_api('wipe_database'));
    }

    actions.open_file = ({content})=> (dispatch,getState)=> {
        let dexie = get_backend(getState);
        return dispatch(actions.import_data(content));
    }

    actions.search = tag => (dispatch,getState)=> {

        let dexie = get_backend(getState);
        return dispatch(actions.async_api('search',tag))
    }

    return actions;
}



