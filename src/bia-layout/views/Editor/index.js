import React,{useMemo,useState,forwardRef} from 'react';
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

import MainView from 'bia-layout/components/Views/MainView'
import EditorLayout from 'bia-layout/layouts/Editor'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import PatientHeader from 'bia-layout/components/Views/PatientHeader'

import {ComponentWithArea as Area,withGridArea} from 'bia-layout/hoc/grid/Area'
import {Delete,ArrowBack} from 'bia-layout/components/Icons';
import DatePicker from 'react-datepicker';
import MesureEditor from 'bia-layout/views/MesureEditor';
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

    const {className, t,handleGoBack,data,mesure,...rest} = getClasseNames(__base_class,props);
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
                        <ListItem><b>{t('Mesures')}</b></ListItem>
                        {data.mesures.map(mesure=> {
                            return <ListItem>{mesure.date} <Delete/></ListItem>
                        })}
                </Area>
                <ContainerWithArea className={element('form')} area="content" scrollable>
                    <MesureEditor/>
                </ContainerWithArea>

            </EditorLayout>
        </MainView>
    )

}

Editor.defaultProps= {
    data: {
        mesures:[],
        lastname:'N/A',
        firstname: 'N/A',
        birthdate:'N/A',
        age: 'N/A',
    },
    t: x=>x
}


export default (Editor);
