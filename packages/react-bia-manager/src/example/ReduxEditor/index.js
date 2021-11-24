import React from 'react';
import Editor from '@/Features/Editor';
import ReduxEditor from '@/Containers/Editor';


import { editorModule as module } from '@/example/Store';




export default ReduxEditor(module,Editor)

