import React from 'react';
import {Provider} from '@/hooks/Provider'
import Router from '@/components/Router'

import Store from '@/Store';


export const BIAManager =  props => {

    const {dbname,dbtype} = props;

    return (
        <>
        {
            <Provider dbname={dbname} dbtype={dbtype}>
                <Store>
                    <Router appLocation="/setup"/>
                </Store>
            </Provider>
        }
        </>
    )

}

BIAManager.defaultProps = {
    dbname:'bia',
    dbtype:'dexie'
}

export default BIAManager;
