import React from 'react';
import BIAManager from '@/App/BIA/BIAManager';
import Provider from '@/Providers/Stores/ElectronApp';

import { Provider as ViewsProvider } from '@/Providers/ViewsProvider'

import Welcome from './welcome'
import Editor from '@/App/BIA/Features/Editor/component';



if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then(function (persistent) {
      if (persistent)
          console.log("Storage will not be cleared except by explicit user action");
      else
          console.log("Storage may be cleared by the UA under storage pressure.");
  });
}


export const TestEditor = props => {
  
  
  
  return (<Editor patient={{}}  handlers={{
    handleChange:_=>alert('hey')
  }} mesure={{date:'2012-01-21',data:{}}} handlers={{}}></Editor>)
 
}



function App() {
  return (
    <Provider>
        <TestEditor/>
    </Provider>
  );

}

export default App;
