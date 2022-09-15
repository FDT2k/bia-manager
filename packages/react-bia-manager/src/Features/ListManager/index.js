import MainView from '@/Components/MainView';
import {Container,LayoutFlex, LayoutFlexColumn} from '@karsegard/react-core-layout'


import List from './List';
import ListCrud from './ListCrud';
import React, { useState } from 'react';

import {useListManager} from '@/Context/ListManager'
import {useTranslation} from '@';

export const Component = props => {

    const {ListsManagerComponent,ListCrudComponent} = props


    const {editedList} = useListManager();

    const {handleSave:_handleSave} = props;

    const {t} =useTranslation();

    return (<>
        {editedList == null && <ListsManagerComponent />}
        {editedList !== null && <ListCrudComponent />}
    </>)
}

Component.defaultProps={
    ListsManagerComponent: List,
    ListCrudComponent: ListCrud,
}





export const Page =  (props) => {
    const{ children,renderFooter, ...rest} = props;
    const {t} =useTranslation();

    return (
        <MainView renderFooter={renderFooter} className="list-editor">
            <LayoutFlexColumn cover centered justBetween>
                <h1>{t('List manager')}</h1>
                <Container style={{minWidth:'600px',minHeight:'500px'}}>
                    {children}
                </Container>
            </LayoutFlexColumn>

        </MainView>
    )

}


export default props=>{

    return (<Page><Component/></Page>)
}