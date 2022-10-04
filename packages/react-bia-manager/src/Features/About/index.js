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
                    {/* <h2>{t(`A propos de BIM`)}</h2>
                    <p>{t('BIM est une application open source développée par ')}<a href="#" onClick={e=>openURL(e,"https://www.karsegard.ch")} target="_blank">{t('Karsegard Digital Agency SàRL')}</a></p>
                   
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

                    <h3>{t('Personnalisation')}</h3>
                    <p>{t('Le logiciel est adaptable à toute structure en fonction des besoins et des contraintes techniques')}</p>
                    <p>{t('Pour un devis ou des informations, nous contacter sur')} <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a> </p>*/}
                    <h2>{t(`About BIM`)}</h2>
                    <p>{t('BIM is an open-source app developed by ')}<a href="#" onClick={e=>openURL(e,"https://www.karsegard.ch")} target="_blank"> {t('Karsegard Digital Agency SàRL')}</a></p>
                   
                    <h3>{t('Sponsors & Partners')}</h3>
                    <ul>
                        <li>{t('Fondation Nutrition 2000 Plus')}</li>
                        <li><a target="_blank" href="#" onClick={e=>openURL(e,"https://www.hug.ch/endocrinologie-diabetologie-hypertension-et/unite-de-nutrition")}>{t('Hopitaux Universitaires de Genève')} - {t('Unité de nutrition')}</a></li>
                    </ul>
                    <h3>{t('Contacts & links')}</h3>
                    <ul>
                        <li>{t('Technical support and information')}: <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a></li>
                        <li>{t('Download the software')}: <a href="#" onClick={e=>openURL(e,"https://bim.karsegard.ch")}>https://bim.karsegard.ch</a></li>
                        <li>{t('Source code')}: <a href="#" onClick={e=>openURL(e," https://gitlab.com/karsegard/bia-manager")}>Gitlab</a></li>
                    </ul>

                    <h3>{t('Customization')}</h3>
                    <p>{t('The software is adaptable to any structure and is customizable at will')}</p>
                    <p>{t('For an estimate or informations, contact us on')} <a href="#" onClick={e=>openURL(e,"mailto:contact@karsegard.ch")}>contact@karsegard.ch</a> </p>

                    <h3>License MIT</h3>
                    <p>Copyright © 2020, Karsegard Digital Agency Sàrl</p>
                    <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                    <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                    <p>The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.</p>
                    <p>Except as contained in this notice, the name of the copyright holders shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the copyright holders.</p>
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