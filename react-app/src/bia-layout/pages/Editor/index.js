// lib externes
import React,{useMemo,useState,forwardRef} from 'react';
import DatePicker from 'react-datepicker';


//nos libs externes
import { bem,compose, withModifiers,applyModifiers, withVariables, divElement, withBaseClass, getClasseNames } from 'bia-layout/utils'

//nos libs internes
import MainView from 'bia-layout/components/Views/MainView'
import EditorLayout from 'bia-layout/layouts/Editor'
import LayoutFlex,{LayoutFlexColumn} from 'bia-layout/layouts/Flex'
import Grid from 'bia-layout/layouts/Grid'
import Container from 'bia-layout/containers/Container'
import PatientHeader from 'bia-layout/components/Views/PatientHeader'
import {ComponentWithArea as Area,withGridArea} from 'bia-layout/hoc/grid/Area'
import {Delete,ArrowBack} from 'bia-layout/components/Icons';
import MesureEditor from 'bia-layout/components/Views/MesureEditor';
import ListMesure  from 'bia-layout/components/ListMesure';

//styles externes
import "react-datepicker/dist/react-datepicker.css";

//styles
import './page-editor.scss'




const ContainerWithArea = withGridArea(Container);




const [__base_class,element,modifier] = bem ('bia-editor')


const NavComponent = compose(
                            applyModifiers({'alignCenter':true}),
                            withGridArea
                            )(LayoutFlex);

const Editor =  props => {

    const {className, renderFooter, t,handleGoBack,handleMesureOpen,handleChange,lines,data,mesure,selectedMesureIndex,...rest} = getClasseNames(__base_class,props);
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </div>
    ));

    const onMesureClick = (d,idx)=> {
        handleMesureOpen && handleMesureOpen(d,idx)
    }

    return (
        <MainView renderFooter={renderFooter} className="bia-main--editor" renderLeftNav={
            _=>{
                return ( <NavComponent className={element('nav')} area="nav" onClick={handleGoBack}>
                <ArrowBack/> <h3>Retour à la liste</h3>
            </NavComponent>)
            }
        }>
            <EditorLayout  className={className}>

                <Area className={element('patient')} area="patient"><PatientHeader data={data}/></Area>
                <Area className={element('mesures')} area="mesures">

                    <ListMesure selectedIndex={selectedMesureIndex} title={t('Mesures')} itemLabelKey="date" handleClick={onMesureClick} data={[...data.mesures,{date:"<Nouvelle>"}]}
                        renderActions={
                            (data,item,idx)=> {
                                if(idx < data.length-1){
                                    return (<Delete/>)
                                }else{
                                    return (<></>)
                                }
                            }
                        }
                    />
                </Area>
                <ContainerWithArea  className={element('form')} area="content" scrollable>
                   {/*mesure &&  <MesureEditor handleChange={handleChange} mesure={mesure} />*/}
                   {!mesure && <h1> ERREUR  !!!! Mesure introuvable</h1>}
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
    selectedMesureIndex:0,
    t: x=>x
}


export default (Editor);
