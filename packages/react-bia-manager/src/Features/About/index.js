import Button from '@/Components/Form/Button';
import InputGroup from '@/Components/Form/InputGroup';
import MainView from "@/Components/MainView";
import { identity } from '@karsegard/composite-js';
import { Container, LayoutFlex } from '@karsegard/react-core-layout';
import React from 'react';
import Modal from '@/Components/Modal'

export const Page = props => {

    const { t,handleOpenDatabase,handleCreateDatabase,handleConnect,openURL, ...rest } = props;
    return (
        <Modal  type="dialog"visible={true}>
            <Container className="login-container">
                <LayoutFlex column justCenter  style={{gap:'20px'}}>
                    <h2>{t(`A propos de BIM`)}</h2>
                    <p>BIM est une application open source développée par <a href="#" onClick={e=>openURL(e,"https://www.karsegard.ch")} target="_blank">Karsegard Digital Agency SàRL</a></p>
                   
                    <h3>Sponsors et partenaires</h3>
                    <ul>
                        <li>Fondation Nutrition 2000 Plus</li>
                        <li><a target="_blank" href="#" onClick={e=>openURL(e,"https://www.hug.ch/endocrinologie-diabetologie-hypertension-et/unite-de-nutrition")}>Hopitaux Universitaires de Genève - Unité de nutrition</a></li>
                    </ul>
                    <h3>Contacts et liens</h3>
                    <ul>
                        <li>Support technique et informations: <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a></li>
                        <li>Télécharger le logiciel: <a href="#" onClick={e=>openURL(e,"https://bim.karsegard.ch")}>https://bim.karsegard.ch</a></li>
                        <li>Code source: <a href="#" onClick={e=>openURL(e," https://gitlab.com/karsegard/bia-manager")}>Gitlab</a></li>
                    </ul>

                    <h3>Pesonnalisation</h3>
                    <p>Le logiciel est adaptable à toute structure en fonction des besoins et des contraintes techniques</p>
                    <p>Pour un devis ou des informations, nous contacter sur <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a> </p>
                </LayoutFlex>
            </Container>
        </Modal>
   
    )
}


Page.defaultProps = {
    t: identity,
    patient: {},
    handleCreateDatabase:_=> alert('Pas encore implémenté'),
    handleOpenDatabase:_=> console.log('missing handler for open'),
    openURL:window.open
}


export default Page