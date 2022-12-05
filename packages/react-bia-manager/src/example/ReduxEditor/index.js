import React from 'react';
import Editor from '@/Features/Editor';
import ReduxEditor from '@/Containers/Editor';
import PatientHeaderFeature from '@/Features/Editor/PatientHeader';


import { editorModule as module } from '@/example/Store';



const PatientHeader = props => {
    const { data, ...rest } = props
    const handleAction = action => {

       alert('example only: '+action)
    }
    return <PatientHeaderFeature data={data} {...rest} actions={['edit','delete']} handleAction={handleAction} />
}

const SampleEditor = props=>{

    return <Editor {...props} PatientHeader={PatientHeader}/>
}

export default ReduxEditor(module,SampleEditor)

