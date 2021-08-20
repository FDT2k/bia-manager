import Button from 'bia-layout/components/Form/Button';
import SetupView from 'bia-layout/Pages/Setup';
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
        <SetupView >
            {!doimport && <>
                <h3>Attention</h3>
                <p>Aucune base n'a été trouvée</p>

                <Button onClick={_=>setImport(true)}>Importer une base</Button>
            </>}

            {doimport && <DatabaseImport/>}
        </SetupView>

    )
}
