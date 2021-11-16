import React from 'react';
import Router from '@/App/BIA/BIAManager/Router'
import ErrorBoundary from '@/App/Components/ErrorBoundary';




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
