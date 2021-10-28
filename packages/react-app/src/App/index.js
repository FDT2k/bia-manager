import React, { Suspense } from 'react';
import App from '@/App/Browser';
import AppElectron from '@/App/Electron';


const isElectron = window.isElectron === true;


export default props => {
    return (<Suspense fallback={<h1>Loading</h1>}>
        {!isElectron && <App />}
        {isElectron && <AppElectron />}
    </Suspense>)
}