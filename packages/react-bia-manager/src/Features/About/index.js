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
                    <h2>{t(`A propos de BIM`)}</h2>
                    <p>{t('BIM est une application open source développée par ')}<a href="#" onClick={e=>openURL(e,"https://www.karsegard.ch")} target="_blank">{t('Karsegard Digital Agency SàRL')}</a></p>
                   
                    <h3>{t('Sponsors et partenaires')}</h3>
                    <ul>
                        <li>{t('Fondation Nutrition 2000 Plus')}</li>
                        <li><a target="_blank" href="#" onClick={e=>openURL(e,"https://www.hug.ch/endocrinologie-diabetologie-hypertension-et/unite-de-nutrition")}>{t('Hopitaux Universitaires de Genève')} - {t('Unité de nutrition')}</a></li>
                    </ul>
                    <h3>{t('Contacts et liens')}</h3>
                    <ul>
                        <li>{t('Support technique et informations')}: <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a></li>
                        <li>{t('Télécharger le logiciel')}: <a href="#" onClick={e=>openURL(e,"https://bim.karsegard.ch")}>https://bim.karsegard.ch</a></li>
                        <li>{t('Code source')}: <a href="#" onClick={e=>openURL(e," https://gitlab.com/karsegard/bia-manager")}>Gitlab</a></li>
                    </ul>

                    <h3>{t('Personnalisation')}</h3>
                    <p>{t('Le logiciel est adaptable à toute structure en fonction des besoins et des contraintes techniques')}</p>
                    <p>{t('Pour un devis ou des informations, nous contacter sur')} <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a> </p>
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