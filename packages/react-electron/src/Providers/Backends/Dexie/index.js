import React,{useEffect} from 'react';
import { Provider as BackendProvider } from '@/Context/Backend'

export default ({ children }) => {


    return (
        <BackendProvider type="dexie">

            DEXIE LOL
            {children}
        </BackendProvider>
    )
}