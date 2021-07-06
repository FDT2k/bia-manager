
import React from 'react';

import { Route } from "wouter";

import Login  from 'components/Views/Login'
import Search  from 'components/Views/Search'

export default props => {

    return (

        <>


        <Route path="/"><Login /></Route>
        <Route path="/search"><Search /></Route>
        </>
    );
}
