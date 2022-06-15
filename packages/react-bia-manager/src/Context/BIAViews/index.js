import React, { createContext, useContext } from 'react';


import CreateSubject from '@/Features/CreateSubject';
import Database from '@/Features/Database';
import Sync from '@/Features/DatabaseSync';
import Export from '@/Features/DatabaseExport';
import DatabaseListManager from '@/Features/ListManager';
import Editor from '@/Features/Editor';
import Search from '@/Features/Search';
import Welcome from '@/Features/WelcomeScreen';
import About from '@/Features/About';
import { is_nil } from '@karsegard/composite-js';



export const Context = createContext(null)


export const makeProvider = (Context) => (props) => {
    const { children, views } = props;

    const defaultViews = {
        Welcome,
        CreateSubject,
        EditSubject:CreateSubject,
        Database,
        Sync,
        DatabaseListManager,
        Editor,
        Search,
        About,
        Export,

    };

    let _views = Object.assign({},defaultViews,views)
    return (
        <Context.Provider value={_views}>
            {children}
        </Context.Provider>
    )
}


export const makeUse = Context => _ => {
    const context = useContext(Context);
    if (is_nil(context)) {
        throw new Error('useViewProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useViewProvider = makeUse(Context);





