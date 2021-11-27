import { is_nil } from '@karsegard/composite-js';
import { Fullscreen } from '@karsegard/react-core-layout';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Router, Switch, useLocation } from "wouter";
import { useViewProvider } from '@/Context/BIAViews';



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
    const BIARouting = views.Router;
    return (<Fullscreen>
        <Router hook={useHashLocation}>
            {BIARouting && <BIARouting />}

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
                <Route path="/create_subject" component={views.CreateSubject} />
                <Route path="/about" component={views.About} />

                <Route path="/"><views.Welcome /></Route>
                <Route>Unknown state, <a href="#">return home</a></Route>
            </Switch>
        </Router>
    </Fullscreen>);
}
