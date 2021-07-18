import React,{useMemo,useState,forwardRef} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

import MainView from 'bia-layout/components/Views/MainView'
import EditorLayout from 'bia-layout/layouts/Editor'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import PatientHeader from 'bia-layout/components/Views/PatientHeader'
import FieldText from 'bia-layout/components/Form/Fields/FieldText'
import Field from 'bia-layout/components/Form/Fields'
import FieldSelect from 'bia-layout/components/Form/Fields/FieldSelect'
import FieldToggle from 'bia-layout/components/Form/Fields/FieldToggle'
import {ComponentWithArea as Area,withGridArea} from 'bia-layout/hoc/grid/Area'
import {Delete,ArrowBack} from 'bia-layout/components/Icons';
import DatePicker from 'react-datepicker';
import './style.scss'
import "react-datepicker/dist/react-datepicker.css";

const ContainerWithArea = withGridArea(Container);


const [__base_class,element,modifier] = bem ('bia-editor')

const ListItem = applyModifiers({'alignCenter':true,'justBetween':true})(LayoutFlex);

const NavComponent = compose(
                            applyModifiers({'alignCenter':true}),
                            withGridArea
                            )(LayoutFlex);

const Editor =  props => {

    const {className, t,handleGoBack,data,...rest} = getClasseNames(__base_class,props);
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </div>
    ));

    return (
        <MainView className={className}>
            <EditorLayout>
                <NavComponent className={element('nav')} area="nav" onClick={handleGoBack}> <ArrowBack/> <h3>Retour à la liste</h3></NavComponent>
                <Area className={element('patient')} area="patient"><PatientHeader data={data}/></Area>
                <Area className={element('mesures')} area="mesures">
                        <ListItem><b>Mesures</b></ListItem>
                        {data.mesures.map(mesure=> {
                            return <ListItem>{mesure.date} <Delete/></ListItem>
                        })}

                </Area>
                <ContainerWithArea className={element('form')} area="content">
                    <LayoutFlexColumn>
                        <LayoutFlex wrap >
                            <Field label={t("Date d'Examen")}>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  customInput={<ExampleCustomInput tabindex="-1"/>}
                                />
                            </Field>
                        
                            <FieldSelect label={t("Activité physique")}/>
                            <FieldSelect label={t("Type d'Activité physique")}/>
                            <FieldToggle label={t("Fumeur")} id="fumeur" labelYes="Oui" labelNo="Non"/>
                            <FieldToggle label={t("Coté mesuré")} labelYes="Gauche" labelNo="Droit" id="cote"/>
                            <FieldText label={t("Poids Actuel")}/>
                            <FieldText label={t("Taille cm")}/>
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
    },
    t: x=>x
}


export default (Editor);
