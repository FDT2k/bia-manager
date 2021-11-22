

import Router from '@/App/Features/Router';
import Search from '@/App/Features/Search';
import CreateSubject from '@/App/Features/CreateSubject';
import Welcome from '@/App/Features/Welcome';
import DatabaseImport from '@/App/Features/DatabaseImport'
import { BIARouter, ViewProvider } from '@karsegard/react-bia-manager';
import React from 'react';

import CustomListProviderFromBackend from'@/Providers/CustomList';

const views = {
    Welcome,
    Search,
    Router,
    Database:DatabaseImport,
    CreateSubject
}
export default props => {



    return (
        <CustomListProviderFromBackend>
            <ViewProvider views={views}>
                <BIARouter/>
            </ViewProvider>
        </CustomListProviderFromBackend>
    )
}