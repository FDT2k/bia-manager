import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

import MainView from 'bia-layout/components/Views/MainView'
import EditorLayout from 'bia-layout/layouts/Editor'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import PatientHeader from 'bia-layout/components/Views/PatientHeader'
import FieldText from 'bia-layout/components/Form/Fields/FieldText'
import FieldSelect from 'bia-layout/components/Form/Fields/FieldSelect'
import FieldToggle from 'bia-layout/components/Form/Fields/FieldToggle'
import {ComponentWithArea as Area,withGridArea} from 'bia-layout/hoc/grid/Area'
import {Delete,ArrowBack} from 'bia-layout/components/Icons';
import './style.scss'


const ContainerWithArea = withGridArea(Container);


const [__base_class,element,modifier] = bem ('bia-editor')

const ListItem = applyModifiers({'alignCenter':true,'justBetween':true})(LayoutFlex);

const NavComponent = compose(
                            applyModifiers({'alignCenter':true}),
                            withGridArea
                            )(LayoutFlex);

const Editor =  props => {

    const {className, handleGoBack,data,...rest} = getClasseNames(__base_class,props);

    return (
        <MainView className={className}>
            <EditorLayout>
                <NavComponent className={element('nav')} area="nav" onClick={handleGoBack}> <ArrowBack/> <h3>Retour à la liste</h3></NavComponent>
                <Area className={element('patient')} area="patient"><PatientHeader data={data}/></Area>
                <Area className={element('mesures')} area="mesures">
                        <ListItem><b>Mesures</b></ListItem>
                        {data.mesures.map(mesure=> {

                            return <ListItem>{mesure.dateMesure} <Delete/></ListItem>
                            })}

                </Area>
                <ContainerWithArea className={element('form')} area="content">
                    <LayoutFlexColumn>
                        <LayoutFlex wrap >
                            <FieldText label="Date d'examen"/>
                            <FieldSelect label="Activité physique"/>
                            <FieldSelect label="Type d'Activité physique"/>
                            <FieldToggle label="Fumeur" id="fumeur" labelYes="Oui" labelNo="Non"/>
                            <FieldToggle label="Coté mesuré" labelYes="Gauche" labelNo="Droit" id="cote"/>
                            <FieldText label="Poids Actuel"/>
                            <FieldText label="Taille cm"/>
                        </LayoutFlex>
                        <Container>


                        </Container>

                        <Container>
                            <Grid style={{
                                gridTemplateColumns:"2fr 1fr 1fr 1fr",
                                    gridAutoRows:"1fr"
                                }}>
                                <div></div>
                                <div className="row header">50khz</div>
                                <div className="row header">Geneva</div>
                                <div className="row header">Norme</div>

                                <div className="row header">%Eau corporelle</div>
                                <div>10</div>
                                <div>20</div>
                                <div>39</div>

                                <div className="row header">Masse Maigre</div>
                                    <div>10</div>
                                    <div>20</div>
                                    <div>39</div>


                                <div className="row header">%Masse Maigre</div>
                                    <div>10</div>
                                    <div>20</div>
                                    <div>39</div>
                                        <div className="row header">%Masse Maigre</div>

                                        <div>10</div>
                                        <div>20</div>
                                        <div>39</div>

                            </Grid>
                        </Container>

                    </LayoutFlexColumn>
                </ContainerWithArea>
                <Area area="rest">
                    <ul>
                        <li><b>header</b></li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                    </ul>
                </Area>
            </EditorLayout>
        </MainView>
    )

}

Editor.defaultProps= {
    data: {
        mesures:[],
        lastname:'Bellefeuille',
        firstname: 'Céline',
        birthdate:'1970-01-01',
        age: 1000,
    }
}


export default (Editor);
