import { createStore, withRemoteDevTools } from '@karsegard/react-redux';
import React from 'react';



import EditorModule from '@/Redux/Editor'


export const editorModule = EditorModule(state=> state.editor,'editor',{})
/* main store reducer */


const reducer = {
  app: (state={},action) => state,
  editor:editorModule.reducer
}



export const {Provider,store} = createStore(reducer,withRemoteDevTools({manager:true}))





export default props => {
  return (
    <Provider>
        {props.children}
    </Provider>
  )
}