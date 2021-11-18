import React, { Suspense } from 'react';

import { Provider as ElectronProvider } from '@/Context/Electron'



import Store from '@/Store';

import Translation from '@/Context/Translation'

import UpdateManager from '@/Features/Electron/AutoUpdate';

import ErrorHandler from '@/Features/ErrorHandler';
import LoadingHandler from '@/Features/LoadingHandler';

export default props => {

    return (
        <Store>
            <Suspense fallback="loading">
                <ElectronProvider api={window.electron}>
                    <Translation>
                        <UpdateManager />
                        <ErrorHandler/>
                        <LoadingHandler/>
                    </Translation>
                    {/* <ErrorHandler/>
                     <LoadingHandler/>*/}
                </ElectronProvider>

            </Suspense>
        </Store>
    );

}
