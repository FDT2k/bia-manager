import React, { useState, useEffect, useCallback } from 'react';
import { Route, Router, useLocation, useRouter } from "wouter";
import Main from './Main'
import Help from './Help'

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


export default props => {

    return (
        <>
            <nav className="flex flex-row just-center">
                <section>
                    <h4>BIM - BIA Manager</h4>
                </section>
            </nav>

            <Router hook={useHashLocation}>
                <Route path="/help/:os" component={Help} />
                <Route path="/"><Main /></Route>
            </Router>

            <footer className="flex flex-row just-center">
                <section>
                    <p>Handcrafted with love & cocoa by <a target="_blank" href="https://www.karsegard.ch/">Karsegård Digital Agency</a></p>
                </section>
            </footer>
        </>
    )
}