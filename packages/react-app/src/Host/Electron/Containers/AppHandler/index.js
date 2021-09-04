import React, { useState, useEffect } from 'react';
import BIAManager from '@/components/BIAManager';

import { makeAPI } from '@/hooks/Provider';


import { useElectron } from '@/Providers/ElectronProvider';
import {useAppState} from '@/Providers/Stores/ElectronApp';


const api = makeAPI('electron')


function App() {

    const { open, onOpenRequest,onSaveRequest } = useElectron();
    const {open_file: dispatch_open,start_loading,stop_loading} = useAppState();
    const handleFileOpen = _ => {
        start_loading("Waiting on user confirmation");
        dispatch_open(open).then(res => {
            start_loading("importing data");
            if (res && res.content) {
                return api.import_database(res.content)

            } else {
                return false;
            }
        })
        .then( result => {
            stop_loading()
            if(result){
                window.location.hash = '#/search'
            }
          
        })
        .catch(console.error);
        /*
        open()
            .then(res => {
                setMessage('opening database');
                if (res) {
                    return api.import_database(res)

                } else {
                    setLoading(false);
                }
            })
            .then(_ => {

                window.location.hash = '#/search'
                setLoading(false);
            })
            .catch(console.error);*/
    }


    const handleFileSave = _ => {
     //   setLoading(true);
       // setMessage('saving database');
        api.export_database().then(content => {
            return electron.save(content);
        })
        .then (res=> {
         //   setLoading(false);

        });
    }

    useEffect(() => {
       // setLoading(true);
      //  setMessage('Loading Desktop Version');
        onOpenRequest(handleFileOpen);
        onSaveRequest(handleFileSave);
    }, []);





    return (
        <>
            <BIAManager dbname="electron" />
        </>
    );

}

export default App;


