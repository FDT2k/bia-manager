import React, { Suspense } from 'react';

import { Provider as ElectronProvider } from '@/Context/Electron'



import Store from '@/Store';

import Translation from '@/Context/Translation'

import UpdateManager from '@/App/Electron/AutoUpdate';
import ErrorHandler from '@/Features/ErrorMessageHandler'
import LoadingHandler from '@/Features/Loading'



export default props => {

    return (
        <Store>
            <Suspense fallback="loading">
                <ElectronProvider api={window.electron}>
                    <Translation>
                        <UpdateManager />

                        
                    </Translation>
                    {/* <ErrorHandler/>
                     <LoadingHandler/>*/}
                </ElectronProvider>

            </Suspense>
        </Store>
    );

}
