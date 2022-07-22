import Button from '@/Components/Form/Button';
import InputGroup from '@/Components/Form/InputGroup';
import MainView from "@/Components/MainView";
import { identity } from '@karsegard/composite-js';
import { Container, LayoutFlex } from '@karsegard/react-core-layout';
import React from 'react';

export const Page = props => {

    const { t,handleOpenDatabase,handleCreateDatabase,handleConnect, ...rest } = props;
    return (<MainView className="page-create-subject">
        <LayoutFlex cover centered>
            <Container className="login-container">
                <LayoutFlex column justCenter >
                    <h2>{t(`Welcome to BIM`)}</h2>
                    <InputGroup>
                        <Button onClick={handleOpenDatabase}>{t('Open a database')}</Button>
                    </InputGroup>
                    <InputGroup>
                        <Button onClick={handleCreateDatabase}>{t('Create a database')}</Button>
                    </InputGroup>
                </LayoutFlex>
            </Container>
        </LayoutFlex>
    </MainView>
    )
}


Page.defaultProps = {
    t: identity,
    patient: {},
    handleCreateDatabase:_=> alert('Pas encore implémenté'),
    handleOpenDatabase:_=> console.log('missing handler for open'),
}


export default Page