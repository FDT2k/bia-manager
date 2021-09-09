import React, { useState, useEffect } from 'react';
import BIAManager from '@/components/BIAManager';

import { makeAPI } from '@/hooks/Provider';


import { useElectron } from '@/Providers/ElectronProvider';
import {ConnectApp} from '@/Providers/Stores/ElectronApp';

import {is_nil} from '@karsegard/composite-js'


//const api = makeAPI('electron')


export const Component = props =>  {

    const { onOpenRequest,onSaveRequest,onLocationChange } = useElectron();
    
    const {open_file,save_to_file,start_loading,stop_loading, current_file,init_app} = props;
    const handleFileOpen = _ => {
        start_loading("Waiting on user confirmation");
        open_file(open)
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
        debugger;
     //   setLoading(true);
       // setMessage('saving database');
       /* api.export_database().then(content => {
            return electron.save(content);
        })
        .then (res=> {
         //   setLoading(false);

        });*/
    }

    useEffect(() => {
        init_app();
       // setLoading(true);
      //  setMessage('Loading Desktop Version');
        onOpenRequest(handleFileOpen);
        onLocationChange((sender,arg)=>{
            window.location.href=arg;
        });
        onSaveRequest(handleFileSave);
    }, []);



    const handleSave = _=>{
        save_to_file();
        /*
        if(!is_nil(current_file) && current_file!=""){
           // debugger;

            api.export_database().then(content => {
                return electron.save(content);
            })

        }
        console.log('should save to file');*/
    }

    return (
        <>
            <BIAManager dbname="default" handleSave={handleSave} />
        </>
    );

}




export default ConnectApp(Component);

