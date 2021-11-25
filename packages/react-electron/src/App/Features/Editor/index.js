import React from 'react';
import { EditorFeature} from '@karsegard/react-bia-manager';
import { ReduxEditor } from '@karsegard/react-bia-manager';
//import { EditorWithBackend } from '@karsegard/react-bia-manager';
import {useBackend,useConfirm} from '@karsegard/react-bia-manager'
import {editorModule} from '@/Store'



const Editor = ReduxEditor(editorModule,EditorFeature)


const EditorWithBackend = (props) => {
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

    const handleDelete = async (patient_id,idx) => {
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
        handleDelete,
        handleMesureCreate,
        handleMesureOpen,
    }

    return (

        <Editor
            {...rest}
            handlers={handlers}
        />
    )
}

export default props => {
    const {params} = props;
    return (<>
    <EditorWithBackend {...params} handlers={{handleGoBack:_=> window.location.href='#/search'}}/></>)
}