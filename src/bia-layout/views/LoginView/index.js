import React,{useMemo} from 'react';

import MainView from 'bia-layout/components/Views/MainView'

import Login from 'bia-layout/components/Views/Login';
import LayoutFlex from 'bia-layout/layouts/Flex';

import './style.scss'


export default props => {

    return (
        <MainView>
            <LayoutFlex cover centered>
                        <Login/>
                        </LayoutFlex>

                    </MainView>
    )

}
