import Login from 'bia-layout/components/Views/Login';
import MainView from 'bia-layout/components/Views/MainView';
import Container from 'bia-layout/containers/Container';
import LayoutFlex from 'bia-layout/layouts/Flex';
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
