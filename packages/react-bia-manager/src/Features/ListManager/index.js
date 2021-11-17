import MainView from '@/Components/MainView';
import {Container,LayoutFlex, LayoutFlexColumn} from '@karsegard/react-core-layout'
import Component from './component';

import React from 'react';






export default props => {
    const{ children,handleSubmit,renderFooter, ...rest} = props;
    return (
        <MainView renderFooter={renderFooter} className="list-editor">
            <LayoutFlexColumn cover centered justBetween>
                <h1>Gestion des listes</h1>
                <Container style={{minWidth:'600px',minHeight:'500px'}}>
                   
                    <Component/>
                </Container>
            </LayoutFlexColumn>

        </MainView>
    )

}
