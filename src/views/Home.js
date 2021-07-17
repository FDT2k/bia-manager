import React from 'react';
import {Provider} from 'hooks/Provider'
import Router from 'components/Router'


import Store from 'Store';
export default props => {

    return (
        <>
        {
            <Provider dbname="bia" dbtype="dexie">
                <Store>
                    <Router/>
                </Store>
            </Provider>
        }
        </>
    )

}
