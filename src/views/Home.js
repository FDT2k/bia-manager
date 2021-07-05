import React from 'react';
import {Provider} from 'hooks/Provider'
import List from 'components/List'

import ImportData from 'components/DatabaseImport'
export default props => {

    return (
        <>
        {<Provider dbname="bia" dbtype="dexie">
            <>
                <List/>
                <ImportData/>
            </>
    </Provider>}
        
        </>
    )



}
