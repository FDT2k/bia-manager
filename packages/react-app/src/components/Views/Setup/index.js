import Button from '@/bia-layout/components/Form/Button';
import SetupView from '@/bia-layout/Pages/Setup';
import DatabaseImport from '@/components/DatabaseImport';
import { LayoutFlexColumn } from '@karsegard/react-core-layout';
import React, { useState } from 'react';
import { useLocation } from "wouter";



export default props => {
    const [location, setLocation] = useLocation();

    const [doimport, setImport] = useState(false);

    const handleSubmit = values => {
        setLocation("/search");
    }

    return (
        <SetupView >
            <LayoutFlexColumn justCenter alignCenter>
            {!doimport && <>
                <h2>Attention</h2>

                <p style={{textAlign:"center"}}>       L'importation ne fonctionne qu'avec des exports CSV de la version précédente de BIA Manager(java)</p>

                <Button onClick={_ => setImport(true)}>Importer un fichier</Button>
            </>}

           
            </LayoutFlexColumn>
            {doimport && <DatabaseImport />}
        </SetupView>

    )
}
