
import React from 'react';

import { Route } from "wouter";


import Test from 'components/test';
/*import List from 'components/List';
import DatabaseSelection from 'components/DatabaseSelection';
import DatabaseImport from 'components/DatabaseImport';
import DatabaseCreationForm from 'components/DatabaseCreationForm';
*/
import Store from 'Stores/Manager'
export default props => {
    
    return (
        <Store>
            
        <Test/>

          
 {/*<Route path="/"><DatabaseSelection /></Route>
            <Route path="/import"><DatabaseImport /></Route>
            <Route path="/create"><DatabaseCreationForm /></Route>
    <Route path="/list"><List /></Route>*/}
        </Store>
    );
}