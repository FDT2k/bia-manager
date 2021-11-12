import CreatePatient from '@/App/BIA/Features/CreatePatient';
import Database from '@/App/BIA/Features/Database';
import DatabaseListManager from '@/App/BIA/Features/Database/ListManager/page';
import Editor from '@/App/BIA/Features/Editor';
import Search from '@/App/BIA/Features/Search/page';
import WelcomeScreen from '@/App/BIA/Features/WelcomeScreen';
import { is_nil } from '@karsegard/composite-js';
import { Fullscreen } from '@karsegard/react-core-layout';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Router, Switch, useLocation, useRouter } from "wouter";


import { useViewProvider } from '@/Providers/ViewsProvider';





export default props => {

    const { appLocation } = props;
    const [location, setLocation] = useLocation(appLocation);

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

    const views = useViewProvider();
    return (<Fullscreen>

        <Router hook={useHashLocation}>

            <Switch>

                <Route path="/database"><views.Database /></Route>
                <Route path="/database/listes"><views.DatabaseListManager /></Route>
                <Route path="/database/listes/:list_id"><views.DatabaseListManager /></Route>
                <Route path="/editor/:patient_id">{params => {
                    return (<views.Editor params={params} />)
                }
                }</Route>
                <Route path="/editor/:patient_id/:mesure_id">{params => {
                    return (<views.Editor params={params} />)
                }
                }</Route>
                <Route path="/search" component={views.Search} />
                <Route path="/create_subject" component={views.CreatePatient} />

                <Route path="/"><views.Welcome /></Route>
                <Route>Unknown state, <a href="#">return home</a></Route>
            </Switch>
        </Router>
    </Fullscreen>);
}
