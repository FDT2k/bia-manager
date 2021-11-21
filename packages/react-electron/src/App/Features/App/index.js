

import Router from '@/App/Features/Router';
import Search from '@/App/Features/Search';
import CreateSubject from '@/App/Features/CreateSubject';
import Welcome from '@/App/Features/Welcome';
import { BIARouter, ViewProvider } from '@karsegard/react-bia-manager';
import React from 'react';



const views = {
    Welcome,
    Search,
    Router,
    CreateSubject
}
export default props => {



    return (
        <ViewProvider views={views}>
            <BIARouter/>
        </ViewProvider>
    )
}