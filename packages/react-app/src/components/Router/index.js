import { Fullscreen } from '@karsegard/react-core-layout'

import DatabaseImport from '@/components/DatabaseImport';
import Database from '@/components/Views/Database';
import Editor from '@/components/Views/Editor';
import CreatePatient from '@/components/Views/CreatePatient';
import Login from '@/components/Views/Login';
import Search from '@/components/Views/Search';
import Setup from '@/components/Views/Setup';
import useBIAManager from '@/hooks/useBIAManager';
import React, { useEffect, useState,useCallback } from 'react';
import { Route, useLocation,Router } from "wouter";
import DebugPrint from '@/bia-layout/Pages/DebugPrint';


export default props => {

    const [location, setLocation] = useLocation();
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
        api.count().then(c => {
            if (c == 0 && location != "#/setup") {
                setLocation("#/setup");
            }

        })
    }, [])

    return (<Fullscreen>
        <Router hook={useHashLocation}>
            <Route path="/"><Login /></Route>
            <Route path="/setup"><Setup /></Route>
            <Route path="/database"><Database /></Route>
            <Route path="/print/:id/:mesure_id">
                <DebugPrint />

            </Route>
            <Route path="/import"><DatabaseImport /></Route>
            <Route path="/search"><Search /></Route>
            <Route path="/create_subject"><CreatePatient /></Route>
            <Route path="/editor/:patient_id" component={Editor}></Route>
            <Route path="/editor/:patient_id/:mesure_id" component={Editor}></Route>
           
        </Router>
    </Fullscreen>);
}
