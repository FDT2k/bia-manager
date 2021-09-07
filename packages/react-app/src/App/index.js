import React from 'react';
import App from '@/App/Browser';
import AppElectron from '@/App/Electron';


const isElectron = window.isElectron === true;


export default props => {
    return (<>
        {!isElectron && <App />}
        {isElectron && <AppElectron />}
    </>)
}