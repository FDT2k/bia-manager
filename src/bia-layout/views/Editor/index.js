import React,{useMemo} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

import MainView from 'bia-layout/components/Views/MainView'
import EditorLayout from 'bia-layout/layouts/Editor'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
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

const ListItem = applyModifiers({'alignCenter':true})(LayoutFlex);

const NavComponent = compose(
                            applyModifiers({'alignCenter':true}),
                            withGridArea
                            )(LayoutFlex);

const Editor =  props => {

    const {className, ...rest} = getClasseNames(__base_class,props);

    return (
        <MainView className={className}>
            <EditorLayout>
                <NavComponent className={element('nav')} area="nav"> <ArrowBack/> <h3>Retour à la liste</h3></NavComponent>
                <Area className={element('patient')} area="patient"><PatientHeader/></Area>
                <Area className={element('mesures')} area="mesures">
                        <ListItem><b>Mesures</b></ListItem>
                        <ListItem>19.10.1982 <Delete/></ListItem>
                        <ListItem>19.10.1982 <Delete/></ListItem>
                        <ListItem>19.10.1982 <Delete/></ListItem>
                        <ListItem>19.10.1982 <Delete/></ListItem>
                        <ListItem>19.10.1982 <Delete/></ListItem>
                        <ListItem>19.10.1982 <Delete/></ListItem>
                        <ListItem>19.10.1982 <Delete/></ListItem>
                </Area>
                <ContainerWithArea className={element('form')} area="content">
                    <LayoutFlexColumn>
                        <LayoutFlex wrap >
                            <FieldText label="Date d'examen"/>
                            <FieldSelect label="Activité physique"/>
                            <FieldSelect label="Type d'Activité physique"/>
                            <FieldToggle label="Fumeur" id="fumeur" labelNo="X"/>
                            <FieldToggle label="Coté mesuré" labelYes="Droit" labelNo="Gauche" id="cote"/>
                            <FieldText label="Poids Actuel"/>
                            <FieldText label="Taille cm"/>
                        </LayoutFlex>
                        <Container>
                            Hello world
                        </Container>

                        <Container>
                            table
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


export default (Editor);
