import React,{useMemo} from 'react';

import MainView from 'bia-layout/components/Views/MainView'

import Login from 'bia-layout/components/Views/Login';
import LayoutFlex from 'bia-layout/layouts/Flex';

import './page-login.scss'


export default props => {
    const{handleSubmit, ...rest} = props;
    return (
        <MainView>
            <LayoutFlex cover centered>
                <Login handleSubmit={handleSubmit}/>
            </LayoutFlex>

        </MainView>
    )

}
