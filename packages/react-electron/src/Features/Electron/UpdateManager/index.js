import React, { useState, useEffect, useRef, useMemo } from 'react';


import { useElectron } from '@/Context/Electron';


export const Component = ({children}) => {


    const {subscribers:{handleUpdateAvailable,handleDownloadProgress}} = useElectron();
    

    const [update, setUpdate] = useState(false); // update system
    const [download, setDownload] = useState(null); // download system
    const [updateMessage, setUpdateMessage] = useState({});
   

    useEffect(() => {

        handleUpdateAvailable((sender, message) => {
            console.log('update is available',message)
            setUpdate(true);
            console.log(message)
            setUpdateMessage(message)
        })

        handleDownloadProgress((sender,message)=>{
            console.log('update is downloading',message)
            setUpdate(false);
            setDownload(message);
        })


    }, []);



    return (
        <>
           {children}
        </>
    );

}




export default Component;

