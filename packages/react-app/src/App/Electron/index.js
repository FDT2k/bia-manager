import React from 'react';

import { Provider as ElectronProvider } from '@/Context/Electron'

import AppHandler from '@/App/Electron/AppHandler'
import ErrorHandler from '@/App/Features/ErrorMessageHandler'
import LoadingHandler from '@/App/Features/Loading'

import Provider from '@/Providers/Stores/ElectronApp';



import I18Next from '@/Features/Electron/i18Next';
import UpdateManager from '@/App/Electron/AutoUpdate';




export default props => {


    return (
        <Provider>
            <ElectronProvider api={window.electron}>
                <I18Next>
                    <AppHandler />
                    <UpdateManager />
                </I18Next>
            </ElectronProvider>
            <ErrorHandler/>
            <LoadingHandler/>
        </Provider>
    );

}
