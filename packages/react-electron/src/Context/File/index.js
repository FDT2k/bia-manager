import React, { createContext, useContext, useEffect } from 'react';
import { useElectron } from '@/Context/Electron'

import { is_nil } from '@karsegard/composite-js';
import { useDispatch, useSelector } from '@karsegard/react-redux'
import { store } from '@/Store'
import ReduxModule from '@/Redux/FileStatus';
import { useHostProvider } from '@/Context/Host';

export const Context = createContext(null)


const __not_implemented = text => _ => console.warn(text + ' not implemented for host')


export const makeProvider = (Context) => {


    const Module = ReduxModule(state => state.file, 'file', {});
    store.manager.addModule(Module);

    return (props) => {
        const { add_error, start_loading, stop_loading } = useHostProvider();
        const { children, actions: _actions } = props;
        const {
            subscribers: {
                handleOpenRequest, handleSaveRequest, handleLocationChange, handleCloseRequest,
                handleError, handleWillQuit
            },
            revokers:{
                revokeOpenRequest
            },
            actions: {
                quit,
                open: electron_open,
                get_file_state,
                close: electron_close,
            }
        } = useElectron();

        const dispatch = useDispatch();

        let modified = useSelector(Module.selectors.modified);

      

        const open_file = _ => {
            start_loading("Waiting on user confirmation");
            electron_open()
                .then(result => {
                    stop_loading()
                    dispatch(Module.actions.open(result))
                    /* if (result) {
                         window.location.hash = '#/search'
                     }*/

                })
                .catch(add_error)

        }

        const save_file = _ => {
            start_loading('saving');
            save_to_file().then(

                result => {
                    stop_loading();
                    if (result) {
                        stop_loading();
                    }
                }
            ).catch(add_error)

        }

        const handleQuit = _ => {
            debugger;
            if (modified) {
                add_error("file has been modified, save it first")
            } else {
             /*   close().then(_ => {
                    quit();

                })*/
            }
        }

        const close_file = _ => {
            if (modified) {
                add_error("file has been modified, save it first")
            } else {
                electron_close()
                /*close(electron_close).then(res => {
                    window.location.hash = '#/'

                }).catch(add_error)*/
            }
        }
        const test =_=> {
            return close_file()

        }

        useEffect(() => {
            start_loading('Loading stuff')
            get_file_state().then(res => {
                dispatch(Module.actions.open(res))
                stop_loading();
            }).catch(add_error)

            handleWillQuit(handleQuit)
            handleOpenRequest(open_file);
            handleCloseRequest(test);
            handleSaveRequest(save_file);

            handleError((sender, message) => {
                add_error('Une erreur est survenue')
            });

            return ()=>{
                revokeOpenRequest(open_file)
            }
        }, [])


        const defaultActions = {
            modified: _ => dispatch(Module.actions.modified()),
            open_file,
            save_file,
            close_file
        };

        let actions = Object.assign({}, defaultActions, _actions)
        const selectors = {
            file: useSelector(Module.selectors.file),
            type: useSelector(Module.selectors.type),
            locked: useSelector(Module.selectors.locked),
            is_modified:modified

        }
        return (
            <Context.Provider value={{ actions, selectors }}>
                {children}
            </Context.Provider>
        )
    }
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useHostProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useFileProvider = makeUse(Context);





