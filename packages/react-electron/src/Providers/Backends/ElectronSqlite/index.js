import React,{useEffect,useState} from 'react';
import { useElectron } from '@/Context/Electron';
import SQLiteUnlock from '@/Components/SQLiteUnlock';
import { Provider as BackendProvider } from '@/Context/Backend'

export default  ({ children }) => {

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
