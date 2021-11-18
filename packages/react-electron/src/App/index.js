import React, { Suspense } from 'react';

import { Provider as ElectronProvider } from '@/Context/Electron'



import Store from '@/Store';

import Translation from '@/Context/Translation'

import UpdateManager from '@/Features/Electron/AutoUpdate';

import ErrorHandler from '@/Features/ErrorHandler';
import LoadingHandler from '@/Features/LoadingHandler';

import AppHandler from '@/App/Electron/AppHandler'

export default props => {

    return (
        <Store>
            <Suspense fallback="loading">
                <ElectronProvider api={window.electron}>
                    <Translation>
                        <UpdateManager />
                        <ErrorHandler/>
                        <LoadingHandler/>
                        <AppHandler/>

                    </Translation>
                </ElectronProvider>

            </Suspense>
        </Store>
    );

}
