import { createAction, createAsyncAction, bindSelectors } from '@karsegard/react-redux';


import { compare } from '@karsegard/composite-js/List';


import { normalize as normalize_patient } from '@/references/Patient'
import { enlist, is_empty } from '@karsegard/composite-js';

import { keyval } from '@karsegard/composite-js/ObjectUtils'

export default (getModule) => {

    const { action_types, selectors, submodules } = getModule()

    const getBackend = (getState) => {
        console.log(getState())

        const { backend } = bindSelectors({ backend: selectors.select_backend }, getState());

        return submodules.backends[backend].actions;
    }

    const actions = {};

    actions.is_saving = createAction(action_types.SAVING)

    actions.add_error = createAction(action_types.ADD_ERROR)
    actions.dismiss_error = createAction(action_types.REMOVE_ERROR)
    actions.init_started = createAction(action_types.INIT)

    actions.init_app = (result) => (dispatch, getState) => {
        dispatch(actions.init_started(result));
        if (!result.canceled) {
            if (result.type === 'sqlite') {
                dispatch(actions.set_backend('sqlite'))
                if(result.unlocked===true){
                    dispatch(submodules.backends.sqlite.actions.unlock())
                }
            } else if (result.type === 'json') {
                dispatch(actions.set_backend('dexie'))
            } else {
                return Promise.reject('unkown file type')
            }
        }
       /* dispatch(actions.async_api('current_filename')).then(res => {
            dispatch(actions.openFileSuccess(res))
        })*/
       // dispatch(actions.refresh_backend_stats());
    }

    actions.refresh_backend_stats = () => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        return dispatch(backend_actions.refresh_stats())
    }


    actions.openFileFails = createAction(action_types.OPEN_FILE_FAILS);

    actions.openFileSuccess = createAction(action_types.OPEN_FILE_SUCCESS, arg => {
        const { content, ...rest } = arg;
        return rest;
    });

    actions.saveFileSuccess = createAction(action_types.SAVE_FILE_SUCCESS, arg => {
        const { content, ...rest } = arg;
        return rest;
    });

    actions.api_call_started = createAction(action_types.API_CALL_STARTED)
    actions.api_call_success = createAction(action_types.API_CALL_SUCCESS)
    actions.api_call_error = createAction(action_types.API_CALL_ERROR)
    actions.call_api = createAsyncAction(actions.api_call_error, actions.api_call_success)

    actions.async_api = (fn_name, ...args) => (dispatch, getState) => {
        dispatch(actions.api_call_started(fn_name))
        return dispatch(actions.call_api(window.electron.actions[fn_name], ...args))
    }

    actions.async_call = (fn, ...args) => (dispatch, getState) => {
        dispatch(actions.api_call_started(fn))
        return dispatch(actions.call_api(fn, ...args))
    }
    actions.save_to_file = _ => (dispatch, getState) => {
        dispatch(actions.is_saving());
        const backend_actions = getBackend(getState);
        const filename = selectors.current_file(getState());
        return dispatch(backend_actions.export_data()).then(data => {
            return dispatch(actions.async_api('save', data))
        }).then(res => {
            /**TODO 
             * 
             * implement cancel event situation
             */
            if (res !== false) {
                return dispatch(actions.saveFileSuccess(res));
            }
            return false
        }).catch(res => {
            dispatch(actions.add_error(res.message || res))
            //return Promise.reject();
        });
    }


    actions.start_loading = createAction(action_types.LOADING);
    actions.stop_loading = createAction(action_types.LOADING_DONE);
    actions.async_open = createAsyncAction(actions.openFileFails, actions.openFileSuccess)
    actions.set_backend = createAction(action_types.SET_BACKEND)




    actions.open_file = open_function => (dispatch, getState) => {


        return dispatch(actions.async_open(open_function)).then((result) => {

            if (!result.canceled) {
                if (result.type === 'sqlite') {
                    dispatch(actions.set_backend('sqlite'))
                } else if (result.type === 'json') {
                    dispatch(actions.set_backend('dexie'))
                } else {
                    return Promise.reject('unkown file type')
                }
            }

            return dispatch(actions.backend_open_file(result))

        }).then(previous => {
            if (previous.type && previous.type !== action_types.OPEN_CANCELED_BY_USER) {
                dispatch(actions.opened_file());
                return true
            }
        })

    }


    actions.backend_open_file = result => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
      

        if (result && !result.canceled) {
            return dispatch(backend_actions.open_file(result));
        } else if (result && result.canceled) {
            return dispatch({ type: action_types.OPEN_CANCELED_BY_USER })
        }
    }


    actions.opened_file = _ => (dispatch, getState) => {
        dispatch(actions.refresh_editor_lists())
    }


    actions.close_file = createAction(action_types.CLOSE_FILE)

    actions.close = (close_fn) => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        dispatch(actions.close_file());
        dispatch(backend_actions.close());
        dispatch(submodules.features.search.actions.clear());
        return dispatch(actions.async_call(close_fn));
    }

    actions.create_database = _ => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        return dispatch(backend_actions.clear_database()).then(res => {
            return dispatch(actions.async_api('clear_opened_filename'))

        }).then(res => {

            return dispatch(actions.save_to_file())
        });
    }


    actions.create_patient = values => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        return dispatch(backend_actions.create_patient(normalize_patient(values)))
            .then(res => {
                dispatch(actions.save_to_file())
                return res;
            });
    }

    actions.search = (tags = []) => (dispatch, getState) => {

        const { filter_results, update_search_tags, fetched_patient, clear } = submodules.features.search.actions;
        const { select_tags, has_custom_filters, select_custom_filters } = submodules.features.search.selectors;
        const current_tags = select_tags(getState());
        const has_filters = has_custom_filters(getState());
        const custom_filters = select_custom_filters(getState());
        const backend_actions = getBackend(getState);
        // eslint-disable-next-line no-unused-vars
        const [first_tag, ...other_tags] = tags;

        if (tags.length == 0 && !has_filters) {
            dispatch(clear());
            return;
        }
        if (!has_filters && compare(current_tags, tags)) { // can happen
            console.log('tag did not changed')
            return;
        }



        dispatch(update_search_tags(tags));

        if (!has_filters && first_tag && tags.length === 1 && first_tag !== current_tags[0]) { // if the first tag did change, then refetch a preset from the database.
            return dispatch(actions.search_in_database(tags)).then(result => {
                return dispatch(fetched_patient(result));
            }).then(_ => {

                return dispatch(filter_results());

            });
        } else if (has_filters) {
            return dispatch(backend_actions.search_custom_filters(custom_filters)).then(result => {
                return dispatch(fetched_patient(result));
            }).then(_ => {

                return dispatch(filter_results());

            });
        } else {

            return dispatch(filter_results());
        }
    }



    actions.search_in_database = (tag) => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        return dispatch(backend_actions.search(tag))
    }


    actions.refresh_editor_lists = _ => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        //api.all_pahological_groups()
        return Promise.resolve(dispatch(backend_actions.refresh_data_list()))
            .then(result => {
                //      return dispatch(actions.fetch_options(result))
                return dispatch(submodules.features.lists.actions.fetch({ items: result }))
            })
    }

    //actions.fetch_options = submodules.features.options.actions.fetch_options


    /* Editor actions */
    const editorModule = submodules.features.editor;





    actions.save_global = () => (dispatch, getState) => {
        dispatch(actions.is_saving());

        const api = getBackend(getState);
        const editor = submodules.features.editor.actions;


        return dispatch(editor.save())
            .then(
                _ => {

                    const {
                        select_current_patient_id,
                        select_edited_patient,
                    } = bindSelectors(submodules.features.editor.selectors)(getState());

                    return dispatch(actions.update_patient(select_current_patient_id, select_edited_patient))
                }


            ).catch(res => {
                return dispatch(actions.add_error(res.message || res))
            });


    }


    actions.delete_mesure = (patient_id, index) => (dispatch, getState) => {
        const api = getBackend(getState);
        const { actions: moduleactions, selectors } = editorModule
        const { select_current_patient_id, select_edited_patient } = selectors;

        dispatch(moduleactions.delete_mesure(patient_id, index))

        const id = select_current_patient_id(getState())
        const patient = select_edited_patient(getState())

        return dispatch(api.update_patient({ id, patient }))
            .then(res => {

                dispatch(actions.save_to_file())
                return res;
            });
    }


    // api.import_data(imported_data.list).then(_=>{setImporting(false); setImported(true);}).catch(err=> console.error(err));
    actions.import_csv = ({ list, collectors }) => (dispatch, getState) => {
        const api = getBackend(getState);
        console.log(collectors)

        return dispatch(api.bulk_add({ list, collection: 'patients' })).then(res => {
            let promises = enlist(collectors).map(item => {
                const [key, value] = keyval(item);
                return dispatch(
                    api.update_list({
                        key,
                        name: key,
                        list: enlist(value).map(item => {
                            const [key, value] = keyval(item);
                            return { id: value, name: value };
                        })
                    }
                    )
                );

            })

            return Promise.all(promises)


        }).then(res => {

            dispatch(actions.refresh_backend_stats())
            return dispatch(actions.save_to_file());
        });
    }


    actions.save_list = (key) => (dispatch, getState) => {
        const api = getBackend(getState);
        const list = submodules.features.list_editor.selectors.list(getState());
        return dispatch(
            api.update_list({
                key,
                name: key,
                list: list
            })
        )
    }



    //list editor
    actions.fetch_list_editor = list_key => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        return dispatch(backend_actions.get_list(list_key))
            .then(result => {
                return dispatch(submodules.features.list_editor.actions.fetch({ items: result }))
            })
    }


    actions.sort_list_editor = items => (dispatch, getState) => {
        const backend_actions = getBackend(getState);

        return dispatch(submodules.features.list_editor.actions.fetch({ items: items }))

    }

    actions.fetch_lists_editor = list_key => (dispatch, getState) => {
        const backend_actions = getBackend(getState);
        return dispatch(backend_actions.get_lists())
            .then(result => {
                return dispatch(submodules.features.list_editor.actions.fetch({ items: result }))
            })
    }

    //actions that depends on backend
    actions.edit_patient = id => (dispatch, getState) => {
        const api = getBackend(getState);
        const { actions } = editorModule
        return dispatch(api.get_patient(id)).then(res => {
            return dispatch(actions.edit_patient(res));
        })

    }


    actions.update_patient = (id, patient, mesure, mesure_id) => (dispatch, getState) => {
        const api = getBackend(getState);
        return dispatch(api.update_patient({ id, patient, mesure, mesure_id }))
            .then(res => {
                dispatch(actions.save_to_file())
                return res;
            });
    }


    return actions;

}



