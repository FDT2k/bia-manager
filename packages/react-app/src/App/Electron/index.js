import React from 'react';

import { Provider as ElectronProvider } from '@/Providers/ElectronProvider'

import AppHandler from '@/App/Electron/AppHandler'
import Loading from '@/App/Electron//Loading'


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


