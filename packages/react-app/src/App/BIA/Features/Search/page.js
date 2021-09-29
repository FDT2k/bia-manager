import MainView from '@/bia-layout/components/Views/MainView';
import React from 'react';
import './page-search.scss';

import Search from './index'

export const Component = props => {
    const {renderFooter, ...rest} = props;
  

    return (
        <MainView renderFooter={renderFooter}>
            <Search {...props}/>
        </MainView>
    )

}


export default Component;
