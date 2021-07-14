
import React from 'react';

import { Route } from "wouter";

import Login  from 'components/Views/Login'
import Search  from 'components/Views/Search'
import Editor  from 'components/Views/Editor'
import DatabaseImport from 'components/DatabaseImport'

export default props => {

    return (

        <>


        <Route path="/"><Login /></Route>

        <Route path="/import"><DatabaseImport /></Route>

        <Route path="/search"><Search /></Route>
        <Route path="/editor/:id"><Editor /></Route>
        </>
    );
}
