import Button from '@/Components/Form/Button';
import InputGroup from '@/Components/Form/InputGroup';
import MainView from "@/Components/MainView";
import { identity } from '@karsegard/composite-js';
import { Container, LayoutFlex } from '@karsegard/react-core-layout';
import React from 'react';
import Modal from '@/Components/Modal'
import { useTranslation } from '@';

export const Page = props => {

    const { handleOpenDatabase, handleCreateDatabase, handleConnect, openURL, ...rest } = props;
    const { t } = useTranslation();
    return (
        <Modal type="dialog" visible={true}>
            <Container className="login-container">
                <LayoutFlex column justCenter style={{ gap: '20px' }}>
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
                    <p>{t('BIM is an open-source app developed by ')}<a href="#" onClick={e => openURL(e, "https://www.karsegard.ch")} target="_blank"> {t('Karsegard Digital Agency SàRL')}</a></p>

                    <h3>{t('Sponsors & Partners')}</h3>
                    <ul>
                        <li>{t('Fondation Nutrition 2000 Plus')}</li>
                        <li><a target="_blank" href="#" onClick={e => openURL(e, "https://www.hug.ch/endocrinologie-diabetologie-hypertension-et/unite-de-nutrition")}>{t('Hopitaux Universitaires de Genève')} - {t('Unité de nutrition')}</a></li>
                    </ul>
                    <h3>{t('Contacts & links')}</h3>
                    <ul>
                        <li>{t('Technical support and information')}: <a href="#" onClick={e => openURL(e, "mailto:contact@karsegard.ch")}>contact@karsegard.ch</a></li>
                        <li>{t('Download the software')}: <a href="#" onClick={e => openURL(e, "https://bim.karsegard.ch")}>https://bim.karsegard.ch</a></li>
                        <li>{t('Source code')}: <a href="#" onClick={e => openURL(e, " https://gitlab.com/karsegard/bia-manager")}>Gitlab</a></li>
                    </ul>

                    <h3>{t('Customization')}</h3>
                    <p>{t('The software is adaptable to any structure and is customizable at will')}</p>
                    <p>{t('For an estimate or informations, contact us on')} <a href="#" onClick={e => openURL(e, "mailto:contact@karsegard.ch")}>contact@karsegard.ch</a> </p>

                    <h3>License MIT</h3>
                    <p>Copyright © 2020, Karsegard Digital Agency Sàrl</p>
                    <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
                    <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
                    <p>The Software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders X be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the Software.</p>
                    <p>Except as contained in this notice, the name of the copyright holders shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from the copyright holders.</p>
                    <h3>References</h3>
                    <h4>poids idéal</h4>
                    <p> Référence : Metropolitan Life Insurance, corpulence moyenne (rev. 1983)</p>

                    <h4>normes</h4>
                    <ul>

                        <li>angle de phase : Kyle UG et coll. Clinical Nutrition 2004, 23(4) : 758</li>
                        <li>% eau : données publiées par RJL Systems, 1983</li>
                        <li>% Masse maigre et % Masse grasse : Kyle UG, Nutrition 2001, 17 : 534</li>
                        <li>% Masse maigre sèche : données non publiées</li>
                        <li>Indices de masse grasse et de masse maigre : Schutz Y, International Journal of Obesity, 2002, 26 : 953</li>

                    </ul>
                    <h4>formules de calcul</h4>
                    <ul>
                        <li>Sujets de poids normal (BMI &lt; 26 (hommes), &lt; 30 (femmes) : Kushner RF, American Journal of Clinical Nutrition, 1986, 44 :417</li>
                        <li>Sujets obèses (BMI ≥ 26 (hommes), ≥ 30 (femmes) : Segal KR, American Journal of Nutrition, 1988, 47(1) :7</li>
                        <li>Geneva Formula : Kyle UG, Nutrition 2001, 17 :248</li>
                    </ul>
                    <h4>Formules</h4>
                    <h5>Formule de Genève  pour la recherche</h5>
                    <p>
                        <b>Masse non-grasse (kg)</b> = -4.104 + (0.518 x taille (cm)2 / Résistance) + (0.231 x poids(kg))
                        + (0.130 x Réactance) + (4.229 x sexe (homme = 1, femme = 0))<br />
                        <b>Masse grasse (kg)</b> = poids (kg) – Masse non-grasse (kg)<br />
                        <b>% Masse non-grasse</b> = (Masse non-grasse (kg) x 100) / poids (kg)<br />
                        <b>% Masse grasse</b> = (Masse grasse (kg) x 100) / poids (kg)<br />
                    </p>
                    <h5>Formules de BIA pour la clinique</h5>
                    <b>Formule de Segal pour les obèses : femme ≥ 30 BMI ; hommes &gt;26 BMI</b><br/>
                    Femmes :
                    <p>
                    <b>Eau totale (kg) </b> = 0.73 x masse maigre (kg) <br/>
                    <b>Masse grasse (kg) </b> = poids actuel (kg) – masse maigre (kg) <br/>
                    <b>Masse maigre sèche (kg) </b> = masse maigre(kg) – Eau totale (kg) <br/>
                    <b>Masse maigre (kg) </b> = 0.00091186 x taille(m)2 - 0.01486 x Résistance50 kHz (ohm) + 0.2999 x poids actuel (kg) - 0.07012 x âge(ans) + 9.37938 <br/>
                    </p>
                    Hommes :<br/>
                    <p>
                    <b>Eau totale (kg) </b> = 0.73 x masse maigre (kg)<br/>
                    <b>Masse grasse (kg) </b> = poids (kg) – masse maigre (kg)<br/>
                    <b>Masse maigre sèche (kg) </b> = masse maigre (kg) – Eau totale (kg)<br/>
                    <b>Masse maigre (kg) </b> = 0.0008858 x taille(m)2 - 0.02999 x Résistance 50 kHz (ohm) + 0.42688 x poids (kg) – 0.07002 x âge (ans) + 14.52435<br/>
                    </p>
                    <b>Formule Kushner pour les sujets de poids normal  = femmes &lt;30 – hommes ≤ 26</b><br/>
                    Femmes :<br/>
                    <p>
                    <b>Eau totale (kg)</b> = 8.3148 + 0.3821 x taille(m)2/ Résistance50 kHz (ohm) + 0.1052 x poids (kg)<br/>
                    <b>% masse grasse</b> = ABS (1-(0.3981 x taille(m)2/ Résistance50 kHz (ohm) + 0.3066 x poids (kg) + 0.0952999 x (taille (m)-100) + 0.7414) / poids (kg)) x 100<br/>
                    <i>* ABS : fonction valeur absolue</i><br/>
                    </p>
                    Hommes :<br/>
                    <p>
                    <b>Eau totale (kg)</b> = 0.3963 x taille(m)2/ Résistance50 kHz (ohm) + 0.143 x poids (kg) + 8.3999999<br/>
                    <b>% Masse grasse</b> = (4.95 / Densité corporelle - 4.5) x 100<br/>
                    <b>Densité corporelle BIA</b> = 1.1554 – ( 0.0841 ((poids (kg) x Résistance50 kHz) / taille (m)2)))<br/>
                    Segal 1985 J Applied Physiol
                    </p>
                    Transformation Impédance –angle de phase &lt;=&gt; Résistance – réactance<br/>
                    <p>
                    <b>Impédance </b> = Racine (Résistance2 + Réactance2)<br/>
                    <b>Angle de phase </b> = Arctangente (Réactance/Résistance) x 180/π<br/>
                    <b>Résistance </b> = Impédance x cos(angle de phase/(180/π))<br/>
                    <b>Réactance </b> = Impédance x sin (angle de phase/(180/π))Groupe<br/>
                    </p>
                    Formules indices :<br/>
                    <p>
                    <b>BMI </b> = poids (kg) / taille(m)2Indice de masse non grasse FFMI : masse non grasse (kg)/ taille(m)2<br/>
                    <b>Indice de masse grasse FMI </b> = masse grasse (kg)/ taille(m)2<br/>
                    =&gt; utiliser la masse non-grasse calculée pour la clinique pour le résultat clinique et la masse non grasse calculée par la formule recherche pour le résultat recherche, idem pour la masse grasse
                    </p>
                </LayoutFlex>
            </Container>
        </Modal>

    )
}


Page.defaultProps = {
    t: identity,
    patient: {},
    handleCreateDatabase: _ => alert('Pas encore implémenté'),
    handleOpenDatabase: _ => console.log('missing handler for open'),
    openURL: window.open
}


export default Page