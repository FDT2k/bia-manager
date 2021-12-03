import React from 'react';
import { EditorFeature} from '@karsegard/react-bia-manager';
import { ReduxEditor } from '@karsegard/react-bia-manager';
//import { EditorWithBackend } from '@karsegard/react-bia-manager';
import {useBackend,useConfirm,useTranslation} from '@karsegard/react-bia-manager'
import {editorModule} from '@/Store'



const Editor = ReduxEditor(editorModule,EditorFeature)


const EditorWithBackend = (props) => {
    const { get_subject,save_subject_mesures,save_subject, get_mesure,delete_mesure } = useBackend();
    const { isConfirmed } = useConfirm();
    const {t} = useTranslation();
 
    const { handlers: {handleGoBack: _handleGoBack, ..._handlers}, ...rest } = props;

    const handleFetch = async patient_id => {
        return get_subject(patient_id)
    }


    const handleSave = async(subject,current_mesure_id) => {

        let result =  save_subject_mesures(subject);
    }

    const handleMesureOpen = async (value, idx, editor_status) => {
        if (editor_status === false) {
            return await isConfirmed(t("The changes you made will not be saved, continue ?"))
        }
        return undefined;
    }

    const handleMesureCreate = async (patient_id,editor_status) => {
        if (editor_status === false) {
            return await isConfirmed(t("The changes you made will not be saved, continue ?"))
        }
        return undefined;
    }

    const handleMesureDelete = async (patient_id,idx) => {
        const confirmed = await isConfirmed(t("Are you sure that you want to delete this ?"));
        if (confirmed) {
            return delete_mesure(patient_id,idx);
        }

        return false;        
    }

    const handleSaveSubject = async (subject)=> {

        return save_subject({...subject,mesures:[]});
    }
  

    const handleGoBack = async (editor_status)=>{
        if (editor_status === false) {
            let result =  await isConfirmed(t("The changes you made will not be saved, continue ?"))
            if(result !==false){
                _handleGoBack();

            }
        }else {
        _handleGoBack();

        }
    }

    const handlers = {
        ..._handlers,
        handleFetch,
        handleSave,
        handleMesureDelete,
        handleMesureCreate,
        handleSaveSubject,
        handleMesureOpen,
        handleGoBack
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