

import Router from '@/App/Features/Router';
import Search from '@/App/Features/Search';
import About from '@/App/Features/About';
import DatabaseListManager from '@/App/Features/DatabaseListManager';

import CreateSubject from '@/App/Features/CreateSubject';
import Editor from '@/App/Features/Editor'
import Welcome from '@/App/Features/Welcome';
import DatabaseImport from '@/App/Features/DatabaseImport'
import DatabaseSync from '@/App/Features/DatabaseSync'
import { BIARouter, ViewProvider } from '@karsegard/react-bia-manager';
import React from 'react';

import CustomListProviderFromBackend from'@/Providers/CustomList';

const views = {
    Welcome,
    About,
    Search,
    Router,
    Editor,
    Database:DatabaseImport,
    CreateSubject,
    DatabaseListManager,
    Sync:DatabaseSync
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