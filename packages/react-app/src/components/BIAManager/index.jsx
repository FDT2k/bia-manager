import React from 'react';
import { Provider } from '@/hooks/Provider'
import Router from '@/components/Router'

import Store from '@/Store';


if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(function (persistent) {
        if (persistent)
            console.log("Storage will not be cleared except by explicit user action");
        else
            console.log("Storage may be cleared by the UA under storage pressure.");
    });
}

export const BIAManager = props => {

    const { dbname, dbtype } = props;

    return (
        <>
            {
                <Provider dbname={dbname} dbtype={dbtype}>
                    <Store>
                        <Router />
                    </Store>
                </Provider>
            }
        </>
    )

}

BIAManager.defaultProps = {
    dbname: 'bia',
    dbtype: 'dexie'
}

export default BIAManager;
