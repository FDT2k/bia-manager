import React, { useEffect } from 'react';



import { useBackend } from '@'


export default Component => (props) => {
    const { get_subject, get_mesure } = useBackend();

    console.log('withBackend', props)
    const { handlers: _handlers, ...rest } = props;

    const handleFetch = async patient_id => {
        return get_subject(patient_id)
    }

    const handleMesureOpen = async (value, idx) => {

    }


    const handleMesureCreate = async (patient_id) => {

    }


    const handlers = {
        ..._handlers,
        handleFetch,
        handleMesureCreate,
        handleMesureOpen,
    }

    return (

        <Component
            {...rest}
            handlers={handlers}
        />
    )
}