import MainView from '@/bia-layout/components/Views/MainView';
import {Container,LayoutFlex, LayoutFlexColumn} from '@karsegard/react-core-layout'
import Component from './index';

import React from 'react';
import './list-editor.scss';






export default props => {
    const{ children,handleSubmit,renderFooter, ...rest} = props;
    return (
        <MainView renderFooter={renderFooter}>
            <LayoutFlexColumn cover centered justBetween>
                <h1>Gestion des listes</h1>
                <Container style={{minWidth:'600px',minHeight:'500px'}}>
                   
                    <Component/>
                </Container>
            </LayoutFlexColumn>

        </MainView>
    )

}
