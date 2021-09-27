import {createAction, createAsyncAction,bindSelectors}from '@karsegard/react-redux';

import api from '@/Backends/Electron'
import { compare } from '@karsegard/composite-js/List';


import {normalize as normalize_patient} from '@/references/Patient'
import { enlist } from '@karsegard/composite-js';

import {keyval} from '@karsegard/composite-js/ObjectUtils'

export default (getModule) => {

    const { action_types, selectors,submodules } = getModule()


    const getBackend = (getState)=> {
        console.log(getState())

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
    actions.saveFileSuccess = createAction(action_types.SAVE_FILE_SUCCESS,arg => {
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
        return dispatch(backend_actions.export_data()).then(data => {
            return dispatch(actions.async_api('save',data))
        }).then(res=>{
           return dispatch(actions.saveFileSuccess(res));
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
                return dispatch({type:action_types.OPEN_CANCELED_BY_USER})
            }

        }).then(previous => {
            if(previous.type && previous.type !==action_types.OPEN_CANCELED_BY_USER){
                 dispatch(actions.opened_file());
                return true
            }
        })

    } 

    actions.opened_file = _=> (dispatch,getState)=>{
        dispatch(actions.refresh_editor_lists())
    }


    actions.close_file = createAction(action_types.CLOSE_FILE)

    actions.close = _=> (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        dispatch(actions.close_file());
        dispatch(submodules.features.search.actions.clear());
        return dispatch (backend_actions.clear_database())
    }

    actions.create_database = _=> (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        return dispatch(backend_actions.clear_database()).then(res=>{
            return dispatch(actions.async_api('clear_opened_filename'))
        }).then(res=>{
            return dispatch(actions.save_to_file())
        });
    }

    actions.search_in_database = (tag) => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        return dispatch (backend_actions.search(tag))
    }

    actions.create_patient = values => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        return dispatch(backend_actions.create_patient(normalize_patient(values)))
        .then(res=>{
            dispatch(actions.save_to_file())
            return res;
        });
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


    actions.refresh_editor_lists = _=> (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        //api.all_pahological_groups()
        return dispatch (backend_actions.refresh_data_list())
        .then(result => {
      //      return dispatch(actions.fetch_options(result))
            return dispatch(submodules.features.lists.actions.fetch({items:result}))
        })
    }

    //actions.fetch_options = submodules.features.options.actions.fetch_options


    /* Editor actions */
    const editorModule = submodules.features.editor;


    actions.edit_patient = id => (dispatch,getState)=> {
        const api= getBackend(getState);
        const {actions} = editorModule
        return dispatch( api.get_patient (id)).then(res=> {
            return dispatch(actions.edit_patient(res));
        })

    }


    actions.update_patient = (id, patient, mesure, mesure_id) => (dispatch,getState)=>{
        const api= getBackend(getState);
        return dispatch( api.update_patient ({id, patient, mesure, mesure_id}))
        .then(res=>{
            dispatch(actions.save_to_file())
            return res;
        });
    }


    actions.save_global = ()=> (dispatch,getState) => {
        debugger;
        const api= getBackend(getState);
        const editor = submodules.features.editor.actions;
        const {
            select_current_patient_id,
            select_edited_patient,
        } = bindSelectors(submodules.features.editor.selectors)(getState())

        dispatch(editor.save());
        dispatch(actions.update_patient(select_current_patient_id,select_edited_patient)).then(
            res=>{
                dispatch(actions.save_to_file())
                return res;
            }
        )



    }


    actions.delete_mesure = (patient_id,index) => (dispatch,getState)=>{
        const api= getBackend(getState);
        const {actions:moduleactions,selectors} = editorModule
        const {select_current_patient_id,select_edited_patient} = selectors;
        
        dispatch(moduleactions.delete_mesure(patient_id,index))

        const id = select_current_patient_id(getState())
        const patient = select_edited_patient(getState())
        
        return dispatch( api.update_patient ({id, patient}))
        .then(res=>{
            
            dispatch(actions.save_to_file())
            return res;
        });
    }


    // api.import_data(imported_data.list).then(_=>{setImporting(false); setImported(true);}).catch(err=> console.error(err));
    actions.import_csv = ({list,collectors}) => (dispatch,getState) => {
        const api= getBackend(getState);
        console.log(collectors)

        return dispatch(api.bulk_add({list,collection:'patients'})).then(res=> {
            

            enlist(collectors).map(item=> {
                const [key,value] = keyval(item);
                dispatch(
                        api.update_list({
                            key,
                            name:key,
                            list:  enlist(value).map(item => {
                                    const [key,value] = keyval(item);
                                    return {id:value,name:value};
                                    })
                            }
                        )
                );

            })
            
            
           
            dispatch(actions.refresh_backend_stats())
        })
    }



    

//list editor
    actions.fetch_list_editor = list_key => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        return dispatch (backend_actions.get_list(list_key))
        .then(result => {
            return dispatch(submodules.features.list_editor.actions.fetch({items:result}))
        })
    }


    actions.fetch_lists_editor = list_key => (dispatch,getState)=> {
        const backend_actions= getBackend(getState);
        return dispatch (backend_actions.get_lists())
        .then(result => {
            return dispatch(submodules.features.list_editor.actions.fetch({items:result}))
        })
    }

    return actions;

}



