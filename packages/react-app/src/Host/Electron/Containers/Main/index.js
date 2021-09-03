import React from 'react';

import { Provider as ElectronProvider } from '@/Providers/ElectronProvider'

import AppHandler from '@/Host/Electron/Containers/AppHandler'


import Store from '@/Providers/Stores/ElectronApp';

function App() {


    return (
        <Store>
            <ElectronProvider api={window.electron}>
                <AppHandler />
            </ElectronProvider>
        </Store>
    );

}

export default App;


