import React,{useEffect} from 'react';
import { BackendProvider } from '@karsegard/react-bia-manager'

export default ({ children }) => {


    return (
        <BackendProvider type="unkown">
            {children}
        </BackendProvider>
    )
}