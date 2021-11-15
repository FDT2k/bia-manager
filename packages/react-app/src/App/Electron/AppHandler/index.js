import React, { useState, useEffect, useRef, useMemo } from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';
import i18n, { setHandler } from '@/i18next.electron';

import { useElectron } from '@/Context/Electron';
import { ConnectApp } from '@/Providers/Stores/ElectronApp';

import ErrorHandler from '@/App/BIA/Features/ErrorMessageHandler'
import { Provider as ViewsProvider } from '@/Providers/ViewsProvider'


export const Component = props => {


    const {
        subscribers: {
            handleOpenRequest, handleSaveRequest, handleLocationChange, handleCloseRequest,
            handleError,handleWillQuit
        },
        actions: {
            get_translations, missing_translations, download_update, i18next_ready, quit
        }
    } = useElectron();
    const { open_file, save_to_file, start_loading, stop_loading, current_file, close, init_app, add_error } = props;


debugger;
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



    useEffect(() => {
       
        init_app();

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



    }, []);



    return (
        <>
           
                <ViewsProvider>
                    <BIAManager />
                </ViewsProvider>
                <ErrorHandler />

        </>
    );

}




export default ConnectApp(Component);


