import React,{useEffect} from 'react';
import { BackendProvider } from '@karsegard/react-bia-manager'

export default ({ children }) => {


    return (
        <BackendProvider type="dexie">

            DEXIE LOL
            {children}
        </BackendProvider>
    )
}