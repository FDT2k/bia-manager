
import React            from 'react';
import { Route,useLocation }        from "wouter";

import Login            from 'components/Views/Login'
import Search           from 'components/Views/Search'
import Editor           from 'components/Views/Editor'
import DatabaseImport   from 'components/DatabaseImport'
import Fullscreen from 'bia-layout/containers/Fullscreen'

import useBIAManager from 'hooks/useBIAManager';

export default props => {

    const [location, setLocation] = useLocation();

    const {api,patient_count,} = useBIAManager();


   
    

    return (<Fullscreen>
                <Route path="/"><Login /></Route>
                <Route path="/setup"><Login /></Route>
                <Route path="/import"><DatabaseImport /></Route>
                <Route path="/search"><Search /></Route>
                <Route path="/editor/:id"><Editor /></Route>
                <Route path="/editor/:id/:mesure_id"><Editor /></Route>
            </Fullscreen>);
}
