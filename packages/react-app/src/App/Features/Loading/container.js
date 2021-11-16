import React from 'react'



export const Component= OtherComponent =>   props => {
  const {is_loading,loading_message} = props;
    return (<>
      {is_loading && <OtherComponent label={loading_message} />} 
      </>)

}

export default Component
