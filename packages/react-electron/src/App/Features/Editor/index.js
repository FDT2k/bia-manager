import React from 'react';
import { EditorFeature} from '@karsegard/react-bia-manager';
import { ReduxEditor } from '@karsegard/react-bia-manager';

import {editorModule} from '@/Store'



const Editor = ReduxEditor(editorModule,EditorFeature)


export default props => {
    const {params} = props;
    return (<>
    <Editor {...params} handlers={{handleGoBack:_=> window.location.href='#/search'}}/></>)
}