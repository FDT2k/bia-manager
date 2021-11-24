import React from 'react';


import {Provider} from '@/Context/Editor';
import ReduxModule from '@/Redux/Editor';


const Module = ReduxModule(state => state.editor_context, 'editor_context', {});
store.manager.addModule(Module);


export default ({children}) => {

    return (
        <Provider selectors={{}} actions={{actions}} >
            {children}
        </Provider>
    )
}
