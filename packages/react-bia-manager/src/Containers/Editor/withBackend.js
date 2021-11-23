import React,{useEffect} from 'react';



import {useBackend} from '@'


export default Component => (props) => {
    const { get_subject,get_mesure } =  useBackend();
    
    
    const { handlers:_handlers, ...rest} = props;

    const handleFetch = async patient_id => {
        return get_subject(patient_id)
    }



    const handlers=  {
        ..._handlers,
        handleFetch
    }

    return (

        <Component
            {...rest}
            handlers={handlers}
              />
    )
}