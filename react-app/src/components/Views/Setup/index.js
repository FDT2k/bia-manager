import React,{useState} from 'react';

import SetupView from 'bia-layout/pages/Setup'

import {useDispatch} from 'react-redux';
import { useLocation } from "wouter";

import Button from 'bia-layout/components/Form/Button';
import DatabaseImport from 'components/DatabaseImport';
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
