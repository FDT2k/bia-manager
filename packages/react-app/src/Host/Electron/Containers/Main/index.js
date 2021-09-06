import React from 'react';

import { Provider as ElectronProvider } from '@/Providers/ElectronProvider'

import AppHandler from '@/Host/Electron/Containers/AppHandler'
import Loading from '@/Host/Electron/Containers/Loading'


import Provider from '@/Providers/Stores/ElectronApp';






function App() {


    return (
        <Provider>
            <ElectronProvider api={window.electron}>
                <Loading/>
                <AppHandler />
            </ElectronProvider>
        </Provider>
    );

}

export default App;


