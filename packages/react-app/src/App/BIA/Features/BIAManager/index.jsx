import React from 'react';
import Router from '@/App/BIA/Features/BIAManager/Router'
import ErrorBoundary from '@/App/Components/ErrorBoundary';


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
            <ErrorBoundary>
                <Router/>
            </ErrorBoundary>
        </>
    )

}

export default BIAManager;
