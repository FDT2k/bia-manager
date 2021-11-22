import React from 'react';
import { CustomListProvider } from '@';

import { useBackend } from '@';


export default ({children}) => {

    return (


        <CustomListProvider>
            {children}

        </CustomListProvider>
    )
}