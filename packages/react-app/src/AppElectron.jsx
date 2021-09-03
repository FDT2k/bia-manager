import React, { useState } from 'react';
import BIAManager from '@/components/BIAManager';


import { makeAPI } from '@/hooks/Provider';
import useElectron from '@/hooks/useElectron'

import LoadingScreen from '@/bia-layout/components/Views/LoadingScreen'
import { useEffect } from 'react';


const api = makeAPI('electron')


function App() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Chargement');
  
  /*
  useEffect(() => {
    setLoading(true);
    setMessage('cleaning up database');
    api.wipe_database().then(res => {
      setLoading(false)

    });
  }, []);
*/
/*
  useElectron(window.electron, {

    onSaveRequest: (electron) => {
      setLoading(true);
      setMessage('saving database');
      api.export_database().then(content => {
        setLoading(false);
        electron.save(content);
      });
    },
    onOpenRequest: (electron) => {
      setLoading(true);

      electron.open().then(res => {
        setMessage('opening database');
        if (res) {
          api.import_database(res)
            .then(_ => {

              window.location.hash = '#/search'
              setLoading(false);
            })
            .catch(console.error)
        } else {
          setLoading(false);
        }
      })
    },
  });*/

  

  return (
    <>
      {loading && <LoadingScreen label={message} />}
      <BIAManager dbname="electron"  />
    </>
  );

}

export default App;


