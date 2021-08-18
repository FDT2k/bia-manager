import DatabaseView from 'bia-layout/pages/Database';
import DatabaseExport from 'components/DatabaseExport';
import DatabaseImport from 'components/DatabaseImport';
import React, { useState } from 'react';
import { useLocation } from "wouter";



export default props => {
    const [location, setLocation] = useLocation();

    const [doimport,setImport]=useState(false);

    const handleSubmit = values=>{
        setLocation("/search");
    }

    return (
        <DatabaseView >
         
            <DatabaseExport/>
            <DatabaseImport/>
        </DatabaseView>

    )
}
