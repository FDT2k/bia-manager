import Button from '@/bia-layout/components/Form/Button';
import InputGroup from '@/bia-layout/components/Form/InputGroup';
import MainView from "@/bia-layout/components/Views/MainView";
import { identity } from '@karsegard/composite-js';
import { Container, LayoutFlex } from '@karsegard/react-core-layout';
import React from 'react';

export const Page = props => {

    const { t,handleOpenDatabase,handleCreateDatabase, ...rest } = props;
    return (<MainView className="page-create-subject">
        <LayoutFlex cover centered>
            <Container className="login-container">
                <LayoutFlex column justCenter {...rest}>
                    <h2>{t(`Bienvenue sur BIA`)}</h2>
                    <InputGroup>
                        <Button onClick={handleOpenDatabase}>Ouvrir une base de données</Button>
                    </InputGroup>
                    <InputGroup>
                        <Button onClick={handleCreateDatabase}>Créer une base de données</Button>
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
    handleCreateDatabase:_=> console.log('missing handler for create'),
    handleOpenDatabase:_=> console.log('missing handler for open'),
}


export default Page