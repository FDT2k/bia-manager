import React, { Suspense } from 'react';

import { Provider as ElectronProvider } from '@/Context/Electron'



import Store from '@/Store';

import Translation from '@/Providers/Translation'
import { Provider as FileProvider, useFileProvider } from '@/Context/File'
import UpdateManager from '@/Features/Electron/AutoUpdate';


import HostProviderRedux from '@/Providers/HostProviderRedux'

import FileTypeBackendProvider from '../Providers/FileTypeBackendProvider';


import App from '@/App/Features/App'
export default props => {

    return (
        <Store>
            <Suspense fallback="loading">
                <ElectronProvider api={window.electron}>
                    <Translation>
                        <UpdateManager />
                        <HostProviderRedux>
                            <FileProvider>
                                <FileTypeBackendProvider>
                                    <App />
                                </FileTypeBackendProvider>
                            </FileProvider>
                        </HostProviderRedux>
                    </Translation>
                </ElectronProvider>
            </Suspense>
        </Store>
    );

}
