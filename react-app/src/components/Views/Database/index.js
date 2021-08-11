import React,{useState} from 'react';

import DatabaseView from 'bia-layout/pages/Database'

import {useDispatch} from 'react-redux';
import { useLocation } from "wouter";

import Button from 'bia-layout/components/Form/Button';
import DatabaseExport from 'components/DatabaseExport';
import DatabaseImport from 'components/DatabaseImport';
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
