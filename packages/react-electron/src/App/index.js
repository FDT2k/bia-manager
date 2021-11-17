import React from 'react';

import { Provider as ElectronProvider } from '@/Context/Electron'



import Store from '@/Store';

import I18Next from '@/Features/Electron/i18Next';
import UpdateManager from '@/App/Electron/AutoUpdate';
import ErrorHandler from '@/Features/ErrorMessageHandler'
import LoadingHandler from '@/Features/Loading'



export default props => {

debugger;
    return (
        <Store>
            <ElectronProvider api={window.electron}>
                <I18Next>
                    <UpdateManager />
                </I18Next>
            </ElectronProvider>
           {/* <ErrorHandler/>
            <LoadingHandler/>*/}
        </Store>
    );

}
