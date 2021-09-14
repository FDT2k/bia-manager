import React, { useState, useEffect } from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';

import { makeAPI } from '@/hooks/Provider';


import { useElectron } from '@/Providers/ElectronProvider';
import { ConnectApp } from '@/Providers/Stores/ElectronApp';

import { is_nil } from '@karsegard/composite-js'


//const api = makeAPI('electron')


export const Component = props => {

    const { onOpenRequest, onSaveRequest, onLocationChange,onCloseRequest } = useElectron();

    const { open_file, save_to_file, start_loading, stop_loading, current_file, close,init_app } = props;
    const handleFileOpen = _ => {
        start_loading("Waiting on user confirmation");
        open_file()
            .then(result => {
                stop_loading()
                if (result) {
                    window.location.hash = '#/search'
                }

            })
            .catch(console.error);
       
    }


    const handleFileSave = _ => {
        start_loading('saving');
        save_to_file().then(
            
            result => {
                stop_loading();
                if(result){
                    stop_loading();
                }
            }
        )
      
    }

    const handleClose =_=> {
        close().then(res=>{
            window.location.hash = '#/'

        })
    }

    useEffect(() => {
        init_app();
        onOpenRequest(handleFileOpen);
        onCloseRequest(handleClose);
        onLocationChange((sender, arg) => {
            window.location.href = arg;
        });
        onSaveRequest(handleFileSave);
    }, []);


    //silent save
    const handleSave = _ => {
        save_to_file();
      
    }

    return (
        <>
            <BIAManager dbname="default" handleSave={handleSave} />
        </>
    );

}




export default ConnectApp(Component);


