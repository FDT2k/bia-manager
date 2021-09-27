import React from 'react';
//import { Provider } from '@/hooks/Provider'
import Router from '@/App/BIA/Features/BIAManager/Router'



if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(function (persistent) {
        if (persistent)
            console.log("Storage will not be cleared except by explicit user action");
        else
            console.log("Storage may be cleared by the UA under storage pressure.");
    });
}

export const BIAManager = props => {

    return (
        <>
          
            <Router/>
        </>
    )

}

export default BIAManager;
