import React, { Suspense } from 'react';

import { Provider as ElectronProvider } from '@/Context/Electron'



import Store from '@/Store';

import Translation from '@/Context/Translation'
import { Provider as FileProvider, useFileProvider } from '@/Context/File'
import UpdateManager from '@/Features/Electron/AutoUpdate';


import HostContext from '@/App/HostContext'



const Test = props => {
    const { actions: { modified }, selectors: { file, type,is_modified } } = useFileProvider()


    return (
        <>
            <pre>{file} - {type} - {is_modified===true ? 'modified': ''}</pre>
            <button onClick={modified}>modify file</button>
        </>
    )
}

export default props => {

    return (
        <Store>
            <Suspense fallback="loading">
                <ElectronProvider api={window.electron}>
                    <Translation>
                        <UpdateManager />
                        <HostContext>
                            {<FileProvider>
                                <Test />
                            </FileProvider>}
                        </HostContext>


                    </Translation>
                </ElectronProvider>

            </Suspense>
        </Store>
    );

}
