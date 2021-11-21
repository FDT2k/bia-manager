import React, { useEffect, useState } from 'react';

import FileTypeBackendRouter, { FileTypeRoute } from '@/Components/FileTypeBackendRouter';



import ElectronSqlite from '@/Providers/Backends/ElectronSqlite'
import Dexie from '@/Providers/Backends/Dexie'
import NullBackend from '@/Providers/Backends/Null'

export default ({ children }) => {


    return (
        <FileTypeBackendRouter>
            <FileTypeRoute type="sqlite">
                <ElectronSqlite>{children}</ElectronSqlite>
            </FileTypeRoute>
            <FileTypeRoute type="json">
                <Dexie>{children} </Dexie>
            </FileTypeRoute>
            <FileTypeRoute>
                <NullBackend>
                    {children}
                </NullBackend>
            </FileTypeRoute>
        </FileTypeBackendRouter>

    )
}