import React,{useMemo} from 'react';

import MainView from 'bia-layout/components/Views/MainView'

import Login from 'bia-layout/components/Views/Login';
import LayoutFlex from 'bia-layout/layouts/Flex';

import Container from 'bia-layout/containers/Container';


import './page-login.scss'


export default props => {
    const{handleSubmit,renderFooter, ...rest} = props;
    return (
        <MainView renderFooter={renderFooter}>
            <LayoutFlex cover centered>
              <Container className="login-container">
                  <Login handleSubmit={handleSubmit}/>
              </Container>
            </LayoutFlex>

        </MainView>
    )

}
