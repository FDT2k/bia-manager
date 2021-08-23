
import Fullscreen from 'bia-layout/containers/Fullscreen';
import DatabaseImport from 'components/DatabaseImport';
import Database from 'components/Views/Database';
import Editor from 'components/Views/Editor';
import CreatePatient from 'bia-layout/Pages/CreatePatient';
import Login from 'components/Views/Login';
import Search from 'components/Views/Search';
import Setup from 'components/Views/Setup';
import useBIAManager from 'hooks/useBIAManager';
import React, { useEffect, useState } from 'react';
import { Route, useLocation } from "wouter";
import DebugPrint from 'bia-layout/Pages/DebugPrint';


export default props => {

    const [location, setLocation] = useLocation();
    const [loaded,setLoaded] = useState();
    const {api,patient_count} = useBIAManager();


    useEffect(()=>{
        api.count().then(c=> {
            if(c==0 && location != "/setup"){
                setLocation("/setup");
            }

        })
    },[])
   
    return (<Fullscreen>
                <Route path="/"><Login /></Route>
                <Route path="/setup"><Setup /></Route>
                <Route path="/database"><Database /></Route>
                <Route path="/print/:id/:mesure_id">
                   <DebugPrint/>

                </Route>
                <Route path="/import"><DatabaseImport /></Route>
                <Route path="/search"><Search /></Route>
                <Route path="/create_subject"><CreatePatient /></Route>
                <Route path="/editor/:id"><Editor /></Route>
                <Route path="/editor/:id/:mesure_id"><Editor /></Route>
            </Fullscreen>);
}
