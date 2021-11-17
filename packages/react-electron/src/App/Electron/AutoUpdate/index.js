import React, { useState, useEffect, useRef, useMemo } from 'react';


import { useElectron } from '@/Context/Electron';
import {Modal} from '@karsegard/react-bia-manager'

import UpdateAvailable  from './UpdateAvailable';
import DownloadUpdate from './DownloadUpdate';

export const Component = ({ children }) => {


    const { subscribers: { handleUpdateAvailable, handleDownloadProgress }, actions:{download_update} } = useElectron();


    const [update, setUpdate] = useState(false); // update system
    const [download, setDownload] = useState(null); // download system
    const [updateMessage, setUpdateMessage] = useState({});


    useEffect(() => {

        handleUpdateAvailable((sender, message) => {
            console.log('update is available', message)
            setUpdate(true);
            console.log(message)
            setUpdateMessage(message)
        })

        handleDownloadProgress((sender, message) => {
            console.log('update is downloading', message)
            setUpdate(false);
            setDownload(message);
        })


    }, []);



    return (
        <>
            {children}

            <Modal visible={update}>
                <UpdateAvailable download={download_update} close={_ => setUpdate(false)} />
            </Modal>

            <Modal visible={download !== null}>
                <DownloadUpdate download={download} updateMessage={updateMessage} />
            </Modal>
        </>
    );

}




export default Component;

