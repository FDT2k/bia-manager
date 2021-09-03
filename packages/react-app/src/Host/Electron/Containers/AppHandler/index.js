import React, { useState, useEffect } from 'react';
import BIAManager from '@/components/BIAManager';

import { makeAPI } from '@/hooks/Provider';

import LoadingScreen from '@/bia-layout/components/Views/LoadingScreen'

import { useElectron } from '@/Providers/ElectronProvider';

const api = makeAPI('electron')


function App() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('Chargement');
    const { open, onOpenRequest,onSaveRequest } = useElectron();

    const handleFileOpen = _ => {
        setLoading(true);
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
            .catch(console.error);
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
            {loading && <LoadingScreen label={message} />} {/**move this elsewhere */}
            <BIAManager dbname="electron" />
        </>
    );

}

export default App;


