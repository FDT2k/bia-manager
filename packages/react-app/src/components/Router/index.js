import { Fullscreen } from '@karsegard/react-core-layout'

import DatabaseImport from '@/components/DatabaseImport';
import Database from '@/components/Views/Database';
import Editor from '@/components/Views/Editor';
import CreatePatient from '@/components/Views/CreatePatient';
import Login from '@/components/Views/Login';
import Idle from '@/bia-layout/Pages/Idle';
import Search from '@/components/Views/Search';
import Setup from '@/components/Views/Setup';
import useBIAManager from '@/hooks/useBIAManager';
import React, { useEffect, useState, useCallback } from 'react';
import { Route, useLocation, Router } from "wouter";
import DebugPrint from '@/bia-layout/Pages/DebugPrint';
import { is_nil } from '@karsegard/composite-js';




export default props => {

    const { appLocation } = props;
    const [location, setLocation] = useLocation(appLocation);
    const [loaded, setLoaded] = useState();

    const { api, patient_count } = useBIAManager();


   


    const currentLoc = () => window.location.hash.replace("#", "") || "/";

    const useHashLocation = () => {
        const [loc, setLoc] = useState(currentLoc());

        useEffect(() => {
            const handler = () => setLoc(currentLoc());
            // subscribe on hash changes
            window.addEventListener("hashchange", handler);
            return () => window.removeEventListener("hashchange", handler);
        }, []);

        const navigate = useCallback(to => (window.location.hash = to), []);
        return [loc, navigate];
    };


    useEffect(() => {
        if (!is_nil(appLocation) && appLocation !== "") {
            if (location !== appLocation) {
                setLocation(appLocation);
            }
        }
    }, [appLocation]);

    return (<Fullscreen>
        <Router hook={useHashLocation}>
        {/* do not remove, could be the print preview later
        <Route path="/print/:id/:mesure_id">
                <DebugPrint />
            </Route> */}
            <Route path="/setup"><Setup /></Route>
            <Route path="/database"><Database /></Route>
            <Route path="/import"><DatabaseImport /></Route>
            <Route path="/editor/:patient_id" component={Editor}/>
            <Route path="/editor/:patient_id/:mesure_id" component={Editor}/>
            <Route path="/search" component={Search}/>
            <Route path="/create_subject"  component={CreatePatient}/>



            <Route path="/"><Idle /></Route>
        </Router>
    </Fullscreen>);
}
