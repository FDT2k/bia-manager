import React from 'react';
import DatabaseProvider from 'hooks/DatabaseProvider'
import List from 'components/List'
export default props => {
    
    return (
        <DatabaseProvider name="bia">

            <List/>

        </DatabaseProvider>
    )



}