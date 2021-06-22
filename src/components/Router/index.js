
import React from 'react';

import { Route } from "wouter";
import List from 'components/List';
import DatabaseSelection from 'components/DatabaseSelection';




export default props => {

    return (
        <>
            <Route path="/"><DatabaseSelection /></Route>
            <Route path="/list"><List /></Route>
        </>
    );
}