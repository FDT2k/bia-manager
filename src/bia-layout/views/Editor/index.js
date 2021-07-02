import React,{useMemo} from 'react';

import MainView from 'bia-layout/components/Views/MainView'
import EditorLayout from 'bia-layout/layouts/Editor'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import Container from 'bia-layout/containers/Container'
import PatientHeader from 'bia-layout/components/Views/PatientHeader'
import ToggleSwitch from 'bia-layout/components/Form/ToggleSwitch'
import {ComponentWithArea as Area,withGridArea} from 'bia-layout/hoc/grid/Area'
import './style.scss'


const FieldText= props=> {
    const {label} = props;

    return (
        <LayoutFlexColumn>
            <label>{label}</label>
            <input type="text"/>
        </LayoutFlexColumn>
    )

}


const FieldSelect= props=> {
    const {label} = props;
    return (
        <LayoutFlexColumn>
            <label>{label}</label>
            <select>
                <option value="test">Test</option>
            </select>
        </LayoutFlexColumn>
    )

}

const FieldToggle= props=> {
    const {label,labelYes,labelNo, id} = props;
    return (
        <LayoutFlexColumn>
            <label>{label}</label>
            <ToggleSwitch labelYes={labelYes} labelNo={labelNo} id={id}/>
        </LayoutFlexColumn>
    )

}


const ContainerWithArea = withGridArea(Container);

export default props => {
    return (
        <MainView>
            <EditorLayout>
                <Area area="nav"> &lt;- Retour à la liste</Area>
                <Area area="patient"> <PatientHeader/></Area>
                <Area area="mesures">
                    <ul>
                        <li><b>mesures</b></li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                        <li>19.10.1982 </li>
                    </ul>
                </Area>
                <ContainerWithArea area="content">
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
