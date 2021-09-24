import React from 'react';
import BIAManager from '@/App/BIA/Features/BIAManager';
import Provider from '@/Providers/Stores/ElectronApp';

function App() {
  return (
    <Provider>
      <BIAManager />
    </Provider>
  );

}

export default App;
