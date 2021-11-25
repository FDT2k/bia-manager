import React, { Suspense } from 'react';




import ErrorHandler, { actions as error_handler } from '@/Features/ErrorHandler';
import LoadingHandler, { actions as loading_handler } from '@/Features/LoadingHandler';

import { Provider as HostProvider } from '@/Context/Host'
import { useDispatch } from '@karsegard/react-redux'

export default props => {
    const dispatch = useDispatch();
    return (

        <>
            <ErrorHandler />
            <LoadingHandler />
            <HostProvider actions={{
                add_error: m => dispatch(error_handler.add(m)),
                start_loading: m => dispatch(loading_handler.start_loading(m)),
                stop_loading: _ => dispatch(loading_handler.stop_loading()),
                
            }}>
                {props.children}
            </HostProvider>
        </>
    )

}
