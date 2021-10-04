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
            <nav>
                <h4>BIM</h4>
            </nav>
            <Router hook={useHashLocation}>
                <Route path="/help/:os" component={Help} />
                <Route path="/"><Main /></Route>

            </Router>


            <footer>
                handcrafted with love & cocoa by <a target="_blank" href="https://www.karsegard.ch/">Karsegard Digital Agency</a>
            </footer>
        </>
    )
}