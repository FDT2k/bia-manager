import Button from '@/Components/Form/Button';
import InputGroup from '@/Components/Form/InputGroup';
import MainView from "@/Components/MainView";
import { identity } from '@karsegard/composite-js';
import { Container, LayoutFlex } from '@karsegard/react-core-layout';
import React from 'react';
import Modal from '@/Components/Modal'
import { useTranslation } from '@';

export const Page = props => {

    const { handleOpenDatabase,handleCreateDatabase,handleConnect,openURL, ...rest } = props;
    const {t} = useTranslation();
    return (
        <Modal  type="dialog"visible={true}>
            <Container className="login-container">
                <LayoutFlex column justCenter  style={{gap:'20px'}}>
                    <h2>{t(`About BIM`)}</h2>
                    <p>{t('BIM is an open source software developed by')} <a href="#" onClick={e=>openURL(e,"https://www.karsegard.ch")} target="_blank">{t('Karsegard Digital Agency SàRL')}</a></p>
                   
                    <h3>{t('Sponsors and Partners')}</h3>
                    <ul>
                        <li>{t('Fondation Nutrition 2000 Plus')}</li>
                        <li><a target="_blank" href="#" onClick={e=>openURL(e,"https://www.hug.ch/endocrinologie-diabetologie-hypertension-et/unite-de-nutrition")}>{t('Hopitaux Universitaires de Genève')} - {t('Unité de nutrition')}</a></li>
                    </ul>
                    <h3>{t('Contacts and links')}</h3>
                    <ul>
                        <li>{t('Technical support and informations')}: <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a></li>
                        <li>{t('Download the software')}: <a href="#" onClick={e=>openURL(e,"https://bim.karsegard.ch")}>https://bim.karsegard.ch</a></li>
                        <li>{t('Source Code')}: <a href="#" onClick={e=>openURL(e," https://gitlab.com/karsegard/bia-manager")}>Gitlab</a></li>
                    </ul>

                    <h3>{t('Customization')}</h3>
                    <p>{t('The software is adaptable to any structure depending on the needs and technical constraints')}</p>
                    <p>{t('For an estimate or more informations, contact us at')} <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a> </p>
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