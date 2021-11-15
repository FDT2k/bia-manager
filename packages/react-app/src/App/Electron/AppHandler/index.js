import React, { useState, useEffect, useRef, useMemo } from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';
import i18n, { setHandler } from '@/i18next.electron';

import { useElectron } from '@/Context/Electron';
import { ConnectApp } from '@/Providers/Stores/ElectronApp';

import ErrorHandler from '@/App/BIA/Features/ErrorMessageHandler'
import { Provider as ViewsProvider } from '@/Context/BIAViews'

import SQLiteUnlock from '@/App/Electron/SQLiteUnlock'
import SQLiteDatabase from '@/App/BIA/Features/Database/Import/sqlite'

export const Component = props => {
    const {
        subscribers: {
            handleOpenRequest, handleSaveRequest, handleLocationChange, handleCloseRequest,
            handleError, handleWillQuit
        },
        actions: {
            quit,
            sqlite_unlock,
            sqlite_query
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
        open_file()
            .then(result => {
                debugger;
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(err => {
                debugger;

                stop_loading();
                console.error(err)
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
        close().then(res => {
            window.location.hash = '#/'

        })
    }

    const unlockSQLite = key => {
        debugger;

        sqlite_unlock(key).then(res => {
            debugger;
            do_sqlite_unlock();
            sqlite_query({ query: "select count(*) from subjects;", values: {} }).then(console.log)
            window.location.hash = '#/search'
        }).catch(err => {
            debugger;
            add_error(err.message)
        })

    }

    const cancelUnlock = () => {
        close();
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

        //  init_app();


    }, []);



    return (
        <>

            <ViewsProvider views={{
                Database: SQLiteDatabase
            }
            }>
                <BIAManager />
            </ViewsProvider>
            <ErrorHandler />

            <SQLiteUnlock visible={is_sqlite_need_unlock} unlock={unlockSQLite} cancel={cancelUnlock} />
        </>
    );

}




export default ConnectApp(Component);


