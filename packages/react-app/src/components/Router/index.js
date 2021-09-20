import { Fullscreen } from '@karsegard/react-core-layout'

import Login from '@/components/Views/Login';
import useBIAManager from '@/hooks/useBIAManager';
import React, { useEffect, useState, useCallback } from 'react';
import { Route, useLocation, Router } from "wouter";
import DebugPrint from '@/bia-layout/Pages/DebugPrint';
import { is_nil } from '@karsegard/composite-js';




import Editor from '@/App/BIA/Features/Editor';
import Search from '@/App/BIA/Features/Search';
import WelcomeScreen from '@/App/BIA/Features/WelcomeScreen';
import CreatePatient from '@/App/BIA/Features/CreatePatient';
import Database from '@/App/BIA/Features/Database';



export default props => {

    const { appLocation } = props;
    const [location, setLocation] = useLocation(appLocation);
    //const [loaded, setLoaded] = useState();

    //const { api, patient_count } = useBIAManager();


   


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
            <Route path="/database"><Database /></Route>
            <Route path="/editor/:patient_id">{params => { 
                return (<Editor params={params}/>)
            }
            }</Route>
            <Route path="/editor/:patient_id/:mesure_id">{params => { 
                return (<Editor params={params}/>)
            }
            }</Route>
            <Route path="/search" component={Search}/>
            <Route path="/create_subject"  component={CreatePatient}/>



            <Route path="/"><WelcomeScreen /></Route>
        </Router>
    </Fullscreen>);
}
