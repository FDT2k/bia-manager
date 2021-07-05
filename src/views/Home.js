import React from 'react';
import {Provider} from 'hooks/Provider'
import List from 'components/List'

import ImportData from 'components/DatabaseImport'


import Store from 'Store';
export default props => {

    return (
        <>
        {
            <Provider dbname="bia" dbtype="dexie">
                <Store>
                    

                </Store>
            </Provider>
        }
        </>
    )

}
