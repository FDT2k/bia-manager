import React from 'react';
import { useBackend,useConfirm } from '@'
export default  Component => (props) => {
    const { get_subject,save_subject, get_mesure,delete_mesure } = useBackend();
    const { isConfirmed } = useConfirm();
 
    const { handlers: _handlers, ...rest } = props;

    const handleFetch = async patient_id => {
        return get_subject(patient_id)
    }


    const handleSave = async(subject) => {

        return save_subject(subject);
    }

    const handleMesureOpen = async (value, idx) => {

    }


    const handleMesureCreate = async (patient_id) => {

    }

    const handleMesureDelete = async (patient_id,idx) => {
        const confirmed = await isConfirmed("Are you sure?");
        if (confirmed) {
            return delete_mesure(patient_id,idx);
        }

        return false;        
    }
  
    const handlers = {
        ..._handlers,
        handleFetch,
        handleSave,
        handleMesureDelete,
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