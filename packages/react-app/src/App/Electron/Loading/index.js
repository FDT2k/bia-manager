import React from 'react'

import {ConnectLoading} from '@/Providers/Stores/ElectronApp';
import LoadingScreen from '@/bia-layout/components/Views/LoadingScreen'


export const Component=  props => {
  const {is_loading,loading_message} = props;
    return (<>
      {is_loading && <LoadingScreen label={loading_message} />} 
      </>)

}


export const Loading = ConnectLoading(Component);

export default Loading
