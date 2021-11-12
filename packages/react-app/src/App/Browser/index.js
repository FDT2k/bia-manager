import React from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';
import Provider from '@/Providers/Stores/ElectronApp';

import { Provider as ViewsProvider } from '@/Providers/ViewsProvider'
import { Provider as EditorProvider } from '@/Providers/EditorProvider'

import Welcome from './welcome'
import Editor from '@/App/BIA/Features/Editor/component';





export const TestEditor = props => {
  
  
  
  return (<Editor patient={{}}  handlers={{
    handleChange:_=>alert('hey')
  }} mesure={{date:'2012-01-21',data:{}}} handlers={{}}></Editor>)
 
}



function App() {
  return (
    <Provider>
      <ViewsProvider>
        <TestEditor/>
      </ViewsProvider>
    </Provider>
  );

}

export default App;
