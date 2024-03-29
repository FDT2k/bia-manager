import { createAction, createAsyncAction } from '@karsegard/react-redux';
import makeBackEnd from '@/Backends/Dexie'
import { keyval } from '@karsegard/composite-js/ObjectUtils'

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

    actions.api = (fn_name, args) => (dispatch, getState) => {
        let dexie = get_backend(getState);

        return dispatch(dexie.fn_name)
    }

    actions.add_error = createAction(action_types.ADD_ERROR)

    actions.api_call_started = createAction(action_types.API_CALL_STARTED)

    actions.api_call_success = createAction(action_types.API_CALL_SUCCESS)
    actions.api_call_error = createAction(action_types.API_CALL_ERROR)


    actions.call_api = createAsyncAction(actions.api_call_error, actions.api_call_success)

    actions.async_api = (fn_name, ...args) => (dispatch, getState) => {
        let dexie = get_backend(getState);
        dispatch(actions.api_call_started(fn_name))
        return dispatch(actions.call_api(dexie[fn_name], ...args))
    }

    actions.imported_database = createAction(action_types.IMPORT_DATABASE)

    actions.import_data = data => (dispatch, getState) => {
        return dispatch(actions.async_api('import_database', data)).then(res => {
            return dispatch(actions.imported_database(selectors.select_db_name(getState())));
        }).then(_ => {
            return dispatch(actions.refresh_stats());
        })
    }

    actions.refresh_stats = _ => (dispatch, getState) => {
        return dispatch(actions.async_api('count')).then(res => {
            dispatch(actions.update_stat({ key: 'count', value: res }));
            return dispatch(actions.async_api('count_mesures'));
        }).then(res => {
            return dispatch(actions.update_stat({ key: 'count_mesures', value: res }));
        })
    }

    actions.export_data = data => (dispatch, getState) => {

        return dispatch(actions.async_api('export_database'));
    }


    actions._close = createAction(action_types.CLOSE);
    actions.close = _=> (dispatch,getState)=> {
        dispatch(actions._close())
        return dispatch(actions.clear_database());
    }

    actions.clear_database = _ => (dispatch, getState) => {
        const lists = [
            'genders',
            'physical_activity_rate',
            'physical_activity_type',
            'machines',
            'pathological_groups',
            'ethnological_groups',
            'examinators'
        ]
        return dispatch(actions.async_api('wipe_database')).then(()=>{
            const p = lists.map(list =>dispatch (actions.update_list({key:list,name:list,list:[]})));
            return Promise.all(p);
        });
    }

    actions.open_file = ({ content }) => (dispatch, getState) => {
        return dispatch(actions.import_data(content));
    }

    actions.search = tag => (dispatch, getState) => {
        let res =  dispatch(actions.async_api('search', tag))
        return res
    }

    actions.search_custom_filters = (custom_filters) =>  (dispatch, getState) => {
        return dispatch(actions.async_api('search_custom_filters', custom_filters))
    }
    
    actions.search_date_range = (field,from,until) => (dispatch, getState) => {
        return dispatch(actions.async_api('search_date_range', {field,from,until}))
    }
    

    actions.create_patient = patient => (dispatch, getState) => {

        return dispatch(actions.async_api('create_patient', patient))
    }

    actions.get_patient = id => (dispatch, getState) => {

        return dispatch(actions.async_api('get_patient', id))
    }
    
    actions.update_patient = payload => (dispatch, getState) => {

        return dispatch(actions.async_api('update_patient', payload))
    }

    actions.refresh_data_list = _ => (dispatch, getState) => {

        return dispatch(actions.call_api( (arg) => {
            const map_to = item => ({ id: item, name: item });
            const map_keyval = item => {
                const [key, value] = keyval(item)
                return ({ id: value, name: value })
            };

            const sort_by_name = (a, b) => a.name.localeCompare(b.name)
            return dispatch(actions.async_api('get_lists'))
           
        }))

    }


    actions.get_lists = key => (dispatch,getState)=>{
        return dispatch(actions.async_api('get_lists'))
    }
    actions.get_list = key => (dispatch,getState)=>{
        return dispatch(actions.async_api('get_list',{key}))
    }


    actions.bulk_add = ({ list, collection }) => (dispatch, getState) => {
        return dispatch(actions.async_api('bulk_add', { list, collection }))
    }

    actions.update_list = ({ key, name, list }) => (dispatch) => {
        return dispatch(actions.async_api('update_list', { key, name, list }))
    }



    return actions;
}



