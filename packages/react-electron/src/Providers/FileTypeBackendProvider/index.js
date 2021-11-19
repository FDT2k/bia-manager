import React, { useEffect,useState } from 'react';

import FileTypeBackendRouter, { FileTypeRoute } from '@/Components/FileTypeBackendRouter';

import { Provider as BackendProvider } from '@/Context/Backend'

import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';

export const SQLiteBackend = ({ children }) => {

    const {actions:{sqlite_query}} = useElectron();

    const [subject,setState]= useState({})

    useEffect(()=>{
        sqlite_query({query:"select count(id)  from subjects",values:{}}).then(res=> {
            setState(res)
        })
    },[])
    return (
        <BackendProvider type="sqlite">
            {JSON.stringify(subject,null,3)}
            {children}
            <SQLiteUnlock />
        </BackendProvider>
    )
}


export const DexieBackend = ({ children }) => {


    return (
        <BackendProvider type="dexie">

            DEXIE LOL
            {children}
        </BackendProvider>
    )
}

export default ({ children }) => {


    return (
        <FileTypeBackendRouter>
            <FileTypeRoute type="sqlite">
                <SQLiteBackend>{children}</SQLiteBackend>
            </FileTypeRoute>
            <FileTypeRoute type="json"> 
                <DexieBackend>{children} </DexieBackend>
             </FileTypeRoute>
            <FileTypeRoute > unkown </FileTypeRoute>
        </FileTypeBackendRouter>

    )
}