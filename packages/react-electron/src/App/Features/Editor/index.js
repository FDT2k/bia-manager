import React from 'react';
import { EditorFeature,PatientHeaderFeature,MesureEditorFeature,ListMesureFeature } from '@karsegard/react-bia-manager';
import { editorWithReduxModule, editorWithBackend } from '@karsegard/react-bia-manager';

import { Provider as StoreProvider, store } from '@/Store'

const Editor = editorWithBackend(editorWithReduxModule(store)(EditorFeature))


export default props => {
    const {params} = props;
    return (<>
    <Editor {...params}/></>)
}