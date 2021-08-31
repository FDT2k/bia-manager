import Login from '@/bia-layout/components/Views/Login';
import MainView from '@/bia-layout/components/Views/MainView';


import {Container,LayoutFlex} from '@karsegard/react-core-layout'

import React from 'react';
import './page-login.scss';







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
