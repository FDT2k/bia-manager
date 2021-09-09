// lib externes
//nos libs externes
import { applyModifiers, bem, compose, getClasseNames } from '@karsegard/react-compose';
import { ArrowBack, Delete } from '@/bia-layout/components/Icons';
//nos libs internes
import MainView from '@/bia-layout/components/Views/MainView';



import { ComponentWithArea as Area, withGridArea } from '@/bia-layout/hoc/grid/Area';
import EditorLayout from '@/bia-layout/layouts/Editor';

import ReactLoading from 'react-loading'
import React, { forwardRef, useState,useMemo } from 'react';

import "react-datepicker/dist/react-datepicker.css";
//styles
import './page-editor.scss';

import {Container,LayoutFlex} from '@karsegard/react-core-layout'
import MesureEditor from './Mesure';
import PatientHeader from './PatientHeader';

import ListMesure from './ListMesure';

const ContainerWithArea = withGridArea(Container);

const [__base_class, element, modifier] = bem('bia-editor')

const NavComponent = compose(
    applyModifiers({ 'alignCenter': true }),
    withGridArea
)(LayoutFlex);

const Editor = props => {
    //const { className, renderFooter, handleClickSave, t,  lines, data, mesure, handlePrint, selectedMesureIndex, ...rest } = getClasseNames(__base_class, props);

    const {className, ...handlers} = getClasseNames(__base_class, props);

    const {handleGoBack,handlePrint,handleMesureCreate, handleMesureOpen,handleMesureDelete, handleSubjectChange,handleChange,handleClickSave, ...renderers} = handlers;


    const {renderFooter, ...remaining} = renderers;
    const {t,  lines, data, mesure,selectedMesureIndex, ...rest} = remaining


    const [startDate, setStartDate] = useState(new Date());
   
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </div>
    ));




    return (
        <MainView renderFooter={renderFooter} className="bia-main--editor" renderLeftNav={
            _ => {
                return (<NavComponent className={element('nav')} area="nav" onClick={handleGoBack}>
                    <ArrowBack /> <h4>Retour à la liste</h4>
                </NavComponent>)
            }
        }>
            <EditorLayout className={className}>

                <Area className={element('patient')} area="patient"><PatientHeader handleChange={handleSubjectChange} data={data} /></Area>
                <Area className={element('mesures')} area="mesures">

                    <ListMesure selectedIndex={selectedMesureIndex} title={t('Mesures')} itemLabelKey="date" handleItemListClick={handleMesureOpen} handleCreateClick={
                        handleMesureCreate
                    } data={data.mesures}
                        renderActions={
                            (data, item, idx) => {
                                return (<Delete className="action-icon" onClick={_=> handleMesureDelete(idx)}/>)
                            }
                        }
                    />
                </Area>
                <ContainerWithArea className={element('form')} area="content" scrollable>
                    {mesure && <MesureEditor  handleClickSave={handleClickSave} handlePrint={handlePrint} handleChange={handleChange} mesure={mesure} />}
                    {!mesure && <ReactLoading type="spin" color="#000000"/>}
                </ContainerWithArea>

            </EditorLayout>
        </MainView>
    )

}

Editor.defaultProps = {
    data: {
        mesures: [],
        lastname: 'N/A',
        firstname: 'N/A',
        birthdate: '1970-01-01',
        age: 'N/A',
    },
    selectedMesureIndex: 0,
    handleMesureOpen:x=> console.warn('no handler set for handleMesureOpen'),
    handleMesureDelete:x=>console.warn('no handler set for handleMesureDelete'),
    t: x => x
}


export default (Editor);
