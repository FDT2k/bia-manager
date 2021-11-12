import React, { createContext, useContext } from 'react';


import CreatePatient from '@/App/BIA/Features/CreatePatient';
import Database from '@/App/BIA/Features/Database';
import DatabaseListManager from '@/App/BIA/Features/Database/ListManager/page';
import Editor from '@/App/BIA/Features/Editor';
import Search from '@/App/BIA/Features/Search/page';
import Welcome from '@/App/BIA/Features/WelcomeScreen';



export const Context = createContext(null)


export const makeProvider = (Context) => (props) => {
    const { children, views } = props;

    const defaultViews = {
        Welcome,
        CreatePatient,
        Database,
        DatabaseListManager,
        Editor,
        Search,

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

    if (context === undefined) {
        throw new Error('useViewProvider must be used within a provider');
    }
    return context;
}


export const Provider = makeProvider(Context);

export const useViewProvider = makeUse(Context);





