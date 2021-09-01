import { Fullscreen } from '@karsegard/react-core-layout'

import DatabaseImport from '@/components/DatabaseImport';
import Database from '@/components/Views/Database';
import Editor from '@/components/Views/Editor';
import CreatePatient from '@/components/Views/CreatePatient';
import Login from '@/components/Views/Login';
import Search from '@/components/Views/Search';
import Setup from '@/components/Views/Setup';
import useBIAManager from '@/hooks/useBIAManager';
import React, { useEffect, useState, useCallback } from 'react';
import { Route, useLocation, Router } from "wouter";
import DebugPrint from '@/bia-layout/Pages/DebugPrint';
import { is_nil } from '@karsegard/composite-js';

import useElectron from '@/hooks/useElectron'




export default props => {
   
    const { appLocation } = props;
    const [location, setLocation] = useLocation();
    const [loaded, setLoaded] = useState();

    const { api, patient_count } = useBIAManager();
    const {save,open,} = useElectron(window.electron,{
        onSaveRequest: (electron)=> {
            api.export_database().then(content=> {
                electron.save(content);
            });
        },
        onOpenRequest:  (electron)=> {
            electron.open().then(res=> {
                console.log(res.length)
            })
        },
    });
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

    /*useEffect(() => {
    
        api.count().then(c => {
            if (c == 0 && location != "#/setup") {
                setLocation("#/setup");
            }

        })
    }, [])
*/
    useEffect(() => {
        if (!is_nil(appLocation) && appLocation !== "") {
            if (location !== appLocation) {
                setLocation(appLocation);
            }
        }
    }, [appLocation]);

    return (<Fullscreen>
        <Router hook={useHashLocation}>
            
            <Route path="/print/:id/:mesure_id">
                <DebugPrint />
            </Route>

            <Route path="/editor/:patient_id" component={Editor}></Route>
            <Route path="/editor/:patient_id/:mesure_id" component={Editor}></Route>
            <Route path="/setup"><Setup /></Route>
            <Route path="/database"><Database /></Route>
            <Route path="/import"><DatabaseImport /></Route>
            <Route path="/search"><Search /></Route>
            <Route path="/create_subject"><CreatePatient /></Route>
            <Route path="/"><Login /></Route>

        </Router>
    </Fullscreen>);
}
