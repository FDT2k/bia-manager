import React from 'react'

import {useAppState} from '@/Providers/Stores/ElectronApp';
import LoadingScreen from '@/bia-layout/components/Views/LoadingScreen'


export default props => {

    const {is_loading,loading_message} = useAppState();
    return (<>
      {is_loading && <LoadingScreen label={loading_message} />} 
      </>)
}