import React, { useState, useEffect, useRef, useMemo } from 'react';

import { useElectron } from '@/Context/Electron';



import SQLiteUnlock from '@/App/Electron/SQLiteUnlock'
import SQLiteDatabase from '@/App/BIA/Features/Database/Import/sqlite'

import { Provider as HostProvider } from '@/Context/Host'

export const Component = props => {
    const {
        subscribers: {
            handleOpenRequest, handleSaveRequest, handleLocationChange, handleCloseRequest,
            handleError, handleWillQuit
        },
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query,
            open: electron_open,
            get_file_state,
            close: electron_close,
        }
    } = useElectron();

    const {
        sqlite_unlock: do_sqlite_unlock,
        open_file,
        save_to_file,
        start_loading,
        stop_loading,
        current_file,
        is_sqlite_need_unlock,
        close,
        init_app,
        add_error } = props;

    const handleFileOpen = _ => {
        start_loading("Waiting on user confirmation");
        open_file(electron_open)
            .then(result => {
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(err => {
                add_error(err)
                stop_loading();
            });

    }

    const handleFileSave = _ => {
        start_loading('saving');
        save_to_file().then(

            result => {
                stop_loading();
                if (result) {
                    stop_loading();
                }
            }
        ).catch(_ => {
            stop_loading();
            console.error()
        });

    }

    const handleClose = _ => {
        close(electron_close).then(res => {
            window.location.hash = '#/'

        }).catch(add_error)
    }

    const unlockSQLite = key => {

        sqlite_unlock(key).then(res => {
            do_sqlite_unlock();
            window.location.hash = '#/search'
        }).catch(err => {
            add_error(err.message)
        })

    }

    const cancelUnlock = () => {
        close();
    }

    const init = () => {
        get_file_state().then(res=> {

            init_app(res);
        }).catch(add_error)
        

    }



    useEffect(() => {


        handleWillQuit(_ => {
            close().then(_ => {
                quit();

            })
        })
        handleOpenRequest(handleFileOpen);
        handleCloseRequest(handleClose);
        handleLocationChange((sender, arg) => {
            window.location.href = arg;
        });


        handleSaveRequest(handleFileSave);



        handleError((sender, message) => {
            add_error('Une erreur est survenue')
        });


        init();
    }, []);


    const electronActions = useMemo(()=>{
        return {
            open_file:handleFileOpen
        }
    },[])

    return (
        <>
            <HostProvider actions={electronActions}>
               {/* <ViewsProvider views={{
                    Database: SQLiteDatabase
                }
                }>
                    <BIAManager />
            </ViewsProvider>*/}
                <SQLiteUnlock
                    visible={is_sqlite_need_unlock}
                    unlock={unlockSQLite}
                    cancel={cancelUnlock} />
            </HostProvider>

        </>
    );

}




export default Component;


