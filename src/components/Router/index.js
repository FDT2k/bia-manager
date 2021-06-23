
import React from 'react';

import { Route } from "wouter";
import List from 'components/List';
import DatabaseSelection from 'components/DatabaseSelection';

import Store from 'Stores/Databases'
export default props => {
    
    return (
        <Store>
            <Route path="/"><DatabaseSelection /></Route>
            <Route path="/list"><List /></Route>
        </Store>
    );
}