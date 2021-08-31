import MainView from '@/bia-layout/components/Views/MainView';
import {Container,LayoutFlex} from '@karsegard/react-core-layout'
import React from 'react';
import './page-database.scss';







export default props => {
    const{ children,handleSubmit,renderFooter, ...rest} = props;
    return (
        <MainView renderFooter={renderFooter}>
            <LayoutFlex cover centered>
              <Container className="setup-container">
                 { children}
              </Container>
            </LayoutFlex>

        </MainView>
    )

}
