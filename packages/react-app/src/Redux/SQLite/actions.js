import { createAction, createAsyncAction } from '@karsegard/react-redux';
import api from '@/Backends/Electron'

import { keyval } from '@karsegard/composite-js/ObjectUtils'




export default (getModule) => {

    const { action_types, selectors } = getModule()
    const actions = {};



    actions.api_call_started = createAction(action_types.API_CALL_STARTED)
    actions.api_call_success = createAction(action_types.API_CALL_SUCCESS)
    actions.api_call_error = createAction(action_types.API_CALL_ERROR)
    actions.call_api = createAsyncAction(actions.api_call_error, actions.api_call_success)


    actions.connected = createAction(action_types.CONNECTED)

    actions.async_api = (fn_name, ...args) => (dispatch, getState) => {
        dispatch(actions.api_call_started(fn_name))
        return dispatch(actions.call_api(api.actions[fn_name], ...args))
    }

    actions.update_stat = createAction(action_types.UPDATE_STAT)

    actions.set_db = createAction(action_types.SET_DB_NAME)

    actions.add_error = createAction(action_types.ADD_ERROR)

    actions.call_api = createAsyncAction(actions.api_call_error, actions.api_call_success)

    actions.imported_database = createAction(action_types.IMPORT_DATABASE)

    actions.import_data = data => (dispatch, getState) => {

    }

    actions.refresh_stats = _ => (dispatch, getState) => {

    }

    actions.export_data = data => (dispatch, getState) => {


    }

    actions.clear_database = _ => (dispatch, getState) => {

    }

    actions.open_file = ({ file }) => (dispatch, getState) => {
        console.log(file)
        debugger;

        return dispatch(actions.async_api('sqlite_open', { filename: file }))
            .then(res => {
                return dispatch(actions.connected(file))
            })
    }

    actions.search = tag => (dispatch, getState) => {

    }

    actions.search_custom_filters = (custom_filters) => (dispatch, getState) => {

    }

    actions.search_date_range = (field, from, until) => (dispatch, getState) => {

    }


    actions.create_patient = patient => (dispatch, getState) => {

    }
    actions.get_patient = id => (dispatch, getState) => {


    }
    actions.update_patient = payload => (dispatch, getState) => {

    }

    actions.refresh_data_list = _ => (dispatch, getState) => {


    }


    actions.get_lists = key => (dispatch, getState) => {

    }
    actions.get_list = key => (dispatch, getState) => {

    }


    actions.bulk_add = ({ list, collection }) => (dispatch, getState) => {

    }

    actions.update_list = ({ key, name, list }) => (dispatch) => {

    }



    return actions;
}



